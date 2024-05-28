
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

self.addEventListener('notificationclick', function (event) {
    const clickedNotification = event.notification.data.FCM_MSG
    event.waitUntil(clients.openWindow(clickedNotification.data.url))
    event.notification.close()
});


firebase.initializeApp({
    apiKey: "AIzaSyACb7ABfs-jY6GdnwxKaGv2wObCdh0h-K8",
    authDomain: "online-taxi-a4ac3.firebaseapp.com",
    projectId: "online-taxi-a4ac3",
    storageBucket: "online-taxi-a4ac3.appspot.com",
    messagingSenderId: "190163892674",
    appId: "1:190163892674:web:e5e1ddd4499c7e6a9e7e5b",
    measurementId: "G-XJ1F3GVPR9",
})
const messaging = firebase.messaging()


self.addEventListener("error", function (event) {
    console.error("Ошибка сервисного работника:", event.error);
});