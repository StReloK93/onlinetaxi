// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import axios from "@/modules/AxiosClient";
import { useAuthStore } from '@/store/useAuthStore'
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
         store.token = await getToken(messaging, {
            serviceWorkerRegistration: sw,
         });
         //@ts-ignore



         messaging.onMessageHandler = function (event) {
            const message = event.notification
            
            var options = {
               body: message.body,
               icon: "/pwa/maskable_icon_x128.png",
               badge: "/pwa/maskable_icon_x96.png",
            };
            const notification = new Notification(message.title, options)
            notification.onclick = function(){
               window.location.href = event.data.url
            }
         };


         axios.post("firebase-token", {
            user_id: store.user?.id,
            token: store.token,
            device: null,
         });
      });
   }
}