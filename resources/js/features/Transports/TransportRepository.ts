import Client from "@/modules/AxiosClient";
import { ITransport } from '@/app/interfaces'
const resource = "user-car"
import { useTransport } from '@/features/Transports'

class Transport {
	async index() {
		const { data } = await Client.get<ITransport[]>(resource);
		const store = useTransport()
		store.transports = data
	}

	async show(tranport_id) {
		const { data } = await Client.get<ITransport>(`${resource}/${tranport_id}`);
		return data
	}

	async create(formData) {
		const { data: transport } = await Client.post<ITransport>(resource, formData);

		const store = useTransport()
		store.create(transport)
	}

	async update(transport_id, formData: ITransport) {
		const { data: transport } = await Client.put<ITransport>(`${resource}/${transport_id}`, formData);

		const store = useTransport()
		store.update(transport)
	}

	async destroy(transport_id) {
		await Client.delete<ITransport>(`${resource}/${transport_id}`);

		const store = useTransport()
		store.destroy(transport_id)
	}
}

export default new Transport()