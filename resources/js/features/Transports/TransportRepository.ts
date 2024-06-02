import Client from "@/repository/Clients/AxiosClient";
import { ITransport } from '@/app/interfaces'
const resource = "user-car"


class Transport{
   async index() {
      const { data } = await Client.get<ITransport[]>(resource);
      return data;
   }

   async create(formData) {
		const { data:transport } = await Client.post<ITransport>(resource, formData);

		// const store = usetransportStore()
		// store.create(transport)
   }

   async update(transport_id, formData: ITransport) {
		const { data:transport } = await Client.put<ITransport>(`${resource}/${transport_id}`, formData);
		
		// const store = usetransportStore()
		// store.update(transport_id, transport)
	}
	
	async destroy(transport_id) {
		await Client.delete<ITransport>(`${resource}/${transport_id}`);

		// const store = usetransportStore()
		// store.destroy(transport_id)
   }
}

export default new Transport()