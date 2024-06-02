import { defineStore } from "pinia"
import { ref, Ref, computed } from "vue"
import { ITransport } from "@/app/interfaces"
export const useTransport = defineStore('useTransport', () => {

	const transports: Ref<ITransport[]> = ref([])


	async function create(transport: ITransport) {
		transports.value.push(transport)
	}

	async function update(transport) {
		const index = transports.value.findIndex((car) => car.id == transport.id)
		transports.value[index] = transport
	}

	async function destroy(transport_id) {
		transports.value = transports.value.filter((car) => car.id != transport_id)
	}



	return {  transports, create, update,  destroy }
})