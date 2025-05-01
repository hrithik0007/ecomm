importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBxx2hHN5HWqARYJf_Y24IbgJrfnG5PiAk",
  authDomain: "jagatakart-a5ace.firebaseapp.com",
  projectId: "jagatakart-a5ace",
  storageBucket: "jagatakart-a5ace.firebasestorage.app",
  messagingSenderId: "404739767161",
  appId: "1:404739767161:web:020fb26cb4cb7e9a690da8",
  measurementId: "G-PWP9P6SRJQ"
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
