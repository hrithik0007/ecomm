import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBxx2hHN5HWqARYJf_Y24IbgJrfnG5PiAk",
  authDomain: "jagatakart-a5ace.firebaseapp.com",
  projectId: "jagatakart-a5ace",
  storageBucket: "jagatakart-a5ace.firebasestorage.app",
  messagingSenderId: "404739767161",
  appId: "1:404739767161:web:020fb26cb4cb7e9a690da8",
  measurementId: "G-PWP9P6SRJQ"
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
      "BAn3jaUHeTTmQgOQkMda_ie6ok2F3bVCEGtyR8wJY0Itmsn9zqmxju6f74YVhjvql_nFTxZTsHDpWSgAmh908HA",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
export const auth = getAuth(firebaseApp);
