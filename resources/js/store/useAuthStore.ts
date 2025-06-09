import { defineStore } from "pinia";
import { retrieveRawInitData } from '@telegram-apps/sdk';
import { ref, Ref } from "vue";
import router from "@/routes";
import AxiosClient from "@/modules/AxiosClient";
import UserRepository from "@/features/AuthUser/UserRepository";
export const useAuthStore = defineStore("Auth", () => {
   const user: Ref = ref(null);
   const token: Ref = ref(null);

   async function signIn(data) {
      try {
         const result = await AxiosClient.post("sign-in", data);
         localStorage.setItem("token", `${result.data.type} ${result.data.token}`);
         await getUser();
         router.push({ name: "main" });
      } catch (error) {
         return error;
      }
   }

   async function signInTelegram() {
      const initDataRaw = retrieveRawInitData()
      await AxiosClient.post('telegram/sign-in', {}, {
         headers: { Authorization: `tma ${initDataRaw}` }
      }).then(async (result) => {
         localStorage.setItem("token", `${result.data.type} ${result.data.token}`);
         await getUser();
         router.push({ name: "main" });
      })
   }

   async function setUserNameRole(formData) {
      user.value = await UserRepository.setUserNameRole(formData);
      router.push({ name: "main" });
   }

   async function getUser() {
      AxiosClient.defaults.headers.common["Authorization"] = localStorage.getItem("token");
      user.value = await UserRepository.getUser();
   }

   async function sendSecretCode(props) {
      try {
         const result = await AxiosClient.post("sendSecretCode", props);
         if (result.status == 200)
            router.push({ name: "secret_code", state: { props } });
         else return result.data;
      } catch (err) {
         return err.response.data;
      }
   }

   async function logout() {
      const data = await AxiosClient.get("logout");

      if (data.status == 200) {
         AxiosClient.defaults.headers.common["Authorization"] = null;
         localStorage.removeItem("token");
         user.value = null;
         router.push({ name: "login" });
      }
   }

   return {
      user,
      token,
      getUser,
      signIn,
      sendSecretCode,
      logout,
      setUserNameRole,
      signInTelegram
   };
});
