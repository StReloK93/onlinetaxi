import Client from "@/modules/AxiosClient";
const resource = "auth-user";

async function getUser() {
   const { data } = await Client.get(`${resource}/user`);
   return data;
}

async function changeRole(role_id) {
   const { data } = await Client.post(`${resource}/change-role`, { role_id });
   return data;
}

async function setUserData(formData) {
   const { data } = await Client.post("auth-user/set-user-data", formData);
   return data;
}

export default { getUser, changeRole, setUserData };
