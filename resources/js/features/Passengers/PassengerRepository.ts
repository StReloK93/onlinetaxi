import Client from "@/repository/Clients/AxiosClient";
import { IPassenger } from "@/app/interfaces";
import { usePassengerStore } from "@/features/Passengers/PassengerStore";

class Passenger {
   async index() {
      const { data } = await Client.get<IPassenger[]>("passenger");
      return data;
   }

   async create(formData) {
		const { data:passenger } = await Client.post<IPassenger>("passenger", formData);

		const store = usePassengerStore()
		store.create(passenger)
   }

   async update(passenger_id, formData: IPassenger) {
		const { data:passenger } = await Client.put<IPassenger>(`passenger/${passenger_id}`, formData);
		
		const store = usePassengerStore()
		store.update(passenger_id, passenger)
	}
	
	async destroy(passenger_id) {
		await Client.delete<IPassenger>(`passenger/${passenger_id}`);

		const store = usePassengerStore()
		store.destroy(passenger_id)
   }
}

export default new Passenger();
