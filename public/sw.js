
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

self.addEventListener('fetch', function (event) {
    event.respondWith(fetch(event.request));
});


// messaging.onBackgroundMessage(function (payload) {
//     console.log(payload)
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//         body: 'Background Message body',
//         icon: '/firebase-logo.png',
//         click_action: 'http://127.0.0.1:8000/car-rides', // assuming your url is in the data under the key 'url'
//     };

//     self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });


// Обработка событий push-уведомлений
// self.addEventListener("push", function (event) {
//     const data = event.data.json();
//     console.log(data)

//     event.waitUntil(
//         self.registration.showNotification(data.notification.title, {
//             body: data.notification.body,
//             icon: "/icons/map.svg",
//             url: data.notification.url
//         })
//     )
// });

// importScripts("https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js");


// importScripts("https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js")
// importScripts("https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js")