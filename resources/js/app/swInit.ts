// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const firebaseConfig = {
   apiKey: "AIzaSyACb7ABfs-jY6GdnwxKaGv2wObCdh0h-K8",
   authDomain: "online-taxi-a4ac3.firebaseapp.com",
   projectId: "online-taxi-a4ac3",
   storageBucket: "online-taxi-a4ac3.appspot.com",
   messagingSenderId: "190163892674",
   appId: "1:190163892674:web:e5e1ddd4499c7e6a9e7e5b",
   measurementId: "G-XJ1F3GVPR9",
};
export default async function () {
   if ("serviceWorker" in navigator) {
      const store = useAuthStore();
      await navigator.serviceWorker.register("/sw.js").then(async (sw) => {
         const app = initializeApp(firebaseConfig);
         // const analytics = getAnalytics(app);

         const messaging = getMessaging(app);
         store.user.token = await getToken(messaging, {
            serviceWorkerRegistration: sw,
         });
         //@ts-ignore
         messaging.onMessageHandler = function (event) {
            var options = {
               body: "In brauzer",
               // icon: icon,
            };
            new Notification('Hello web developer', options);
         };


         axios.post("firebase-token", {
            user_id: store.user?.id,
            token: store.user.token,
            device: null,
         });
      });
   }
}

// Получаем список подписок на push-уведомления
// navigator.serviceWorker.ready.then(function (registration) {
//     registration.pushManager.getSubscription().then(function (subscrip) {
//         if (subscrip) console.log("Push notification subscrip:", subscrip);
//         else console.log("don't have a subscrip to push notifications.");
//     });
// });
