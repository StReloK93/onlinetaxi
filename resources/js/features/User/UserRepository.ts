import Client from "@/modules/AxiosClient";
const resource = "auth-user";

async function getUser() {
   try {
      const { data } = await Client.get(`${resource}/user`);
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


async function setUserData(formData) {
   const { data } = await Client.post(`${resource}/set-user-data`, formData);
   return data;
}

export default { getUser, changeRole, setUserData, cars };
