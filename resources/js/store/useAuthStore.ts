import { defineStore } from "pinia"
import { ref, computed, Ref } from "vue"
import router from "@/routes"
export const useAuthStore = defineStore("Auth", () => {
   const user: Ref = ref(null);

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

   async function login(data) {
      try {
         const result = await axios.post("login", data);
         localStorage.setItem("token",`${result.data.type} ${result.data.token}`)
         await getUser();
         router.push({ name: "main" });
      } catch (error) { return error }
   }

   async function sendUserData(formData) {
      const { data } = await axios.post("set-user-data", formData);
      user.value = data;
      router.push({ name: "main" })
   }

   async function getUser() {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
      await axios.get("user")
         .then(({ data }) => (user.value = data))
         .catch(() => console.clear());
   }

   async function sendSecretCode(props) {
      try {
         const result = await axios.post("sendSecretCode", props);
         if (result.status == 200)
            router.push({ name: "secret_code", state: { props } });
         else return result.data;
      } catch (err) {
         return err.response.data;
      }
   }

	async function logout() {
		
      const data = await axios.get("logout");

      if (data.status == 200) {
         axios.defaults.headers.common["Authorization"] = null
         localStorage.removeItem("token")
         user.value = null
         router.push({ name: "login" })
      }
   }



   return {
      user,
      getUser,
      login,
      sendSecretCode,
      logout,
		sendUserData,
      isAnyAdmins,
      isAdmin,
      isSuperAdmin,
      isPassengerAdmins,
      isDriverAdmins,
      isDriver,
      isPassenger,
   };
});
