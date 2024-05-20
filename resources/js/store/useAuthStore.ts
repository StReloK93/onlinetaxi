import { defineStore } from "pinia"
import { ref, computed } from "vue"
import router from "@/routes"
import { useMainStore } from "./useMainStore"
export const useAuthStore = defineStore("Auth", () => {
   const user: any = ref(null);

   // getters
   const isAnyAdmins = computed(() => {
      return [1, 2].includes(user.value?.role_id);
   });

   const isSuperAdmin = computed(() => {
      return user.value?.role_id == 1;
   });

   const isAdmin = computed(() => {
      return user.value?.role_id == 2;
   });

   const isPassenger = computed(() => {
      return user.value?.role_id == 3;
   });

   const isDriver = computed(() => {
      return user.value?.role_id == 4;
   });

   // Actions

   async function login(data) {
      try {
         const result = await axios.post("login", data);
         localStorage.setItem(
            "token",
            `${result.data.type} ${result.data.token}`
         ); // local
         await getUser();
         router.push({ name: "main" });
      } catch (error) {
         return error;
      }
   }

   async function sendUserData(formData) {
      const { data } = await axios.post("set-user-data", formData);
      user.value = data;
      router.push({ name: "main" });
   }

   async function getUser() {
      axios.defaults.headers.common["Authorization"] =
         localStorage.getItem("token");
      await axios
         .get("user")
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
         axios.defaults.headers.common["Authorization"] = null;
         localStorage.removeItem("token");
         user.value = null;
         router.push({ name: "login" });
      }
   }

	function alertLogout() {
   	const main = useMainStore()
		
      main.dialog.open(() => {
         main.dialog.title = "Dasturdan chiqmoqchimisiz ?"
         main.dialog.submit = () => logout()
      })
   }

   return {
      user,
      getUser,
      login,
      sendSecretCode,
      logout,
		sendUserData,
		alertLogout,
      isAnyAdmins,
      isAdmin,
      isSuperAdmin,
      isDriver,
      isPassenger,
   };
});
