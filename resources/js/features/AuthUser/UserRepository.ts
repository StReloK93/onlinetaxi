import Client from "@/modules/AxiosClient";
const resource = "auth-user";

async function getUser() {
   try {
      const { data } = await Client.get(`${resource}/get-auth-user`);
      return data;
   }
   catch (error) {
      console.log(error);
   }
}

async function changeRole(role_id) {
   const { data } = await Client.post(`${resource}/change-role`, { role_id });
   return data;
}

async function cars() {
   const { data } = await Client.get(`${resource}/cars`);
   return data;
}

async function rides() {
   const { data } = await Client.get(`${resource}/rides`);
   return data;
}

async function passengers() {
   const { data } = await Client.get(`${resource}/passengers`);
   return data;
}

async function notifications() {
   const { data } = await Client.get(`${resource}/notifications`);
   return data;
}

async function activeNotifications() {
   const { data } = await Client.get(`${resource}/active-notifications`);
   return data;
}

async function updateNotifications() {
   const { data } = await Client.get(`${resource}/update-notifications`);
   return data;
}

async function setUserNameRole(formData) {
   const { data } = await Client.post(`${resource}/update-user-name`, formData);
   return data;
}

export default { getUser, changeRole, setUserNameRole, cars, rides, passengers, notifications, activeNotifications, updateNotifications };
