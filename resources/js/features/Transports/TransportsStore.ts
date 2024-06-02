import { defineStore } from "pinia"
import { ref, Ref, computed } from "vue"
import axios from "@/repository/Clients/AxiosClient";
import { ITransport } from "@/app/interfaces"
export const useTransport = defineStore('useTransport', () => {

	const transports: Ref<ITransport[]> = ref([])


	function update(transport) {

	}

	function getTransports() {
		axios.get('user-cars/get-only-my').then(({ data }) => transports.value = data)
	}

	function destroy(transport) {
		axios.delete(`user-car/${transport.id}`).then(() => {
			transports.value = transports.value.filter((car) => car.id != transport.id)
		})
	}



	return {  transports, update, getTransports, destroy }
})