import { defineStore } from "pinia"
import { ref, computed, Ref } from "vue"
import router from "@/routes"
import AxiosClient from "@/modules/AxiosClient"
import UserRepository from "@/features/User/UserRepository"
export const useAuthStore = defineStore("Auth", () => {
   const user: Ref = ref(null);
   const token: Ref = ref(null);

   // getters
   const isAnyAdmins = computed(() => {
      if (user.value == null) return false
      
      return [1, 2].includes(user.value.role_id);
   });

   const isSuperAdmin = computed(() => {
      if (user.value == null) return false

      return [1].includes(user.value.role_id);
   });

   const isAdmin = computed(() => {
      if (user.value == null) return false

      return [2].includes(user.value.role_id);
   });

   const isPassenger = computed(() => {
      if (user.value == null) return false

      return [3].includes(user.value.role_id);
   });

   const isPassengerAdmins = computed(() => {
      if (user.value == null) return false

      return [1,2,3].includes(user.value.role_id);
   });
   const isDriver = computed(() => {
      if (user.value == null) return false

      return [4].includes(user.value.role_id);
   });

   const isDriverAdmins = computed(() => {
      if (user.value == null) return false

      return [1,2,4].includes(user.value.role_id);
   });

   // Actions

   async function signIn(data) {
      try {
         const result = await AxiosClient.post("sign-in", data);
         localStorage.setItem("token",`${result.data.type} ${result.data.token}`)
         await getUser();
         router.push({ name: "main" });
      } catch (error) { return error }
   }

   async function setUserNameRole(formData) {
      user.value = await UserRepository.setUserNameRole(formData);
      router.push({ name: "main" })
   }


   async function changeRole(role_id) {
      user.value = await UserRepository.changeRole(role_id);
   }


   async function getUser() {
      AxiosClient.defaults.headers.common["Authorization"] = localStorage.getItem("token");
      user.value = await UserRepository.getUser()
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
         AxiosClient.defaults.headers.common["Authorization"] = null
         localStorage.removeItem("token")
         user.value = null
         router.push({ name: "login" })
      }
   }



   return {
      user,
      token,
      changeRole,
      getUser,
      signIn,
      sendSecretCode,
      logout,
		setUserNameRole,
      isAnyAdmins,
      isAdmin,
      isSuperAdmin,
      isPassengerAdmins,
      isDriverAdmins,
      isDriver,
      isPassenger,
   };
});
