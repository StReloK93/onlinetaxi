import Client from "@/modules/AxiosClient";
import { ITransport } from "@/app/interfaces";
const resource = "user-car";

async function index() {
   const { data } = await Client.get<ITransport[]>(resource);
   return data;
}

async function onlyAuthUser() {
   const { data: transports } = await Client.get<ITransport[]>(
      `${resource}/only/auth-user`
   );
   return transports;
}

async function show(tranport_id) {
   const { data: transport } = await Client.get<ITransport>(
      `${resource}/${tranport_id}`
   );
   return transport;
}

async function create(formData) {
   const { data: transport } = await Client.post<ITransport>(
      resource,
      formData
   );
   return transport;
}

async function update(transport_id, formData: ITransport) {
   const { data: transport } = await Client.put<ITransport>(
      `${resource}/${transport_id}`,
      formData
   );
   return transport;
}

async function destroy(transport_id) {
   await Client.delete<ITransport>(`${resource}/${transport_id}`);
}

export default { index, onlyAuthUser, show, create, update, destroy };
