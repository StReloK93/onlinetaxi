import Client from "@/modules/AxiosClient";
import { IPassenger } from "@/app/interfaces";
const resource = "passenger";

async function index() {
   const { data } = await Client.get<IPassenger[]>(resource);
   return data;
}

async function show(passenger_id) {
   const { data } = await Client.get<IPassenger>(`${resource}/${passenger_id}`);
   return data;
}

async function create(formData) {
   const { data: passenger } = await Client.post<IPassenger>(
      resource,
      formData
   );
   return passenger;
}

async function update(passenger_id, formData: IPassenger) {
   const { data: passenger } = await Client.put<IPassenger>(
      `${resource}/${passenger_id}`,
      formData
   );

   return passenger;
}

async function destroy(passenger_id) {
   await Client.delete<IPassenger>(`${resource}/${passenger_id}`);
}

export default { index, show, create, update, destroy };
