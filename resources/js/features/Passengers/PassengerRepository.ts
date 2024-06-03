import Client from "@/modules/AxiosClient";
import { IPassenger } from "@/app/interfaces";
import { usePassengerStore } from "@/features/Passengers/PassengerStore";
const resource = "passenger"


class Passenger {
   async index() {
      const { data } = await Client.get<IPassenger[]>(resource);
      return data;
   }

   async show(passenger_id) {
      const { data } = await Client.get<IPassenger>(`${resource}/${passenger_id}`);
      return data;
   }

   async create(formData) {
		const { data:passenger } = await Client.post<IPassenger>(resource, formData);

		const store = usePassengerStore()
		store.create(passenger)
   }

   async update(passenger_id, formData: IPassenger) {
		const { data:passenger } = await Client.put<IPassenger>(`${resource}/${passenger_id}`, formData);
		
		const store = usePassengerStore()
		store.update(passenger)
	}
	
	async destroy(passenger_id) {
		await Client.delete<IPassenger>(`${resource}/${passenger_id}`);

		const store = usePassengerStore()
		store.destroy(passenger_id)
   }
}

export default new Passenger();
