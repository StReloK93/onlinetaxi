import { RouteRecordRaw } from "vue-router";
import CarRidePage from "@/pages/general/CarRidesPage.vue";
import UserTransportsPage from "@/pages/general/UserTransportsPage.vue";
import TransportsPage from "@/pages/general/TransportsPage.vue";
import PassengersPage from "@/pages/general/PassengersPage.vue";
import OffersPassengerPage from "@/pages/general/OffersPassengerPage.vue";
import AuthUserPage from "@/pages/general/AuthUserPage.vue";
const routes: Array<RouteRecordRaw> = [
   {
      path: "/",
      component: () => import("@/layouts/General.vue"),
      name: "main",
      redirect: {
         name: "car-rides",
      },
      meta: {
         guard: "auth",
      },
      children: [
         {
            path: "/passengers",
            component: PassengersPage,
            name: "passengers",
         },
         {
            path: "/car-ride",
            component: CarRidePage,
            name: "car-rides",
            meta: {
               method: "actives",
            },
         },
         {
            path: "auth-user",
            component: AuthUserPage,
            name: "auth-user",
            meta: {
               method: "auth-user",
            },
         },
         {
            path: "/user-transports",
            component: UserTransportsPage,
            name: "user-transports",
         },
         {
            path: "/transports",
            component: TransportsPage,
            name: "transports",
         },
         {
            path: "/passengers/:id/offers",
            component: OffersPassengerPage,
            name: "passenger-offers",
            props: true,
            meta: { clear: true },
         },
      ],
   },


   {
      path: "/login",
      name: "login",
      redirect: {
         name: "login_page",
      },
      props: true,
      component: () => import("@/layouts/Login.vue"),
      meta: {
         guard: "guest",
      },
      children: [
         {
            name: "login_page",
            path: "",
            component: () => import("@/pages/login/LoginPhonePage.vue"),
         },
         {
            name: "secret_code",
            path: "/secret-code",
            component: () => import("@/pages/login/LoginSendSmsPage.vue"),
            props: true,
         },
      ],
   },
   {
      path: "/welcome",
      name: "welcome",
      component: () => import("@/pages/login/WelcomePage.vue"),
      meta: {
         guard: "auth",
      },
   },
   {
      path: "/install-app",
      name: "install-app",
      component: () => import("@/pages/login/InstallAppPage.vue"),
   },
];

export default routes;
