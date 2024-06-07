import { defineStore } from "pinia"
import { ref, Ref, computed } from "vue"
import { ITransport } from "@/interfaces"
import { TransportRepository } from "."
export const useTransport = defineStore('useTransport', () => {

	const transports: Ref<ITransport[]> = ref([])


	async function create(formData: ITransport) {
		const transport = await TransportRepository.create(formData)

		transports.value.push(transport)
	}

	async function update(transport_id, formData) {
		const transport = await TransportRepository.update(transport_id, formData)

		const index = transports.value.findIndex((car) => car.id == transport.id)
		transports.value[index] = transport
	}

	async function destroy(transport_id) {
		await TransportRepository.destroy(transport_id)
		
		transports.value = transports.value.filter((car) => car.id != transport_id)
	}



	return {  transports, create, update,  destroy }
})