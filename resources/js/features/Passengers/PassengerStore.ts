import { defineStore } from "pinia"
import { ref, Ref , computed } from "vue"
import { IPassenger } from "@/app/interfaces"
export const usePassengerStore = defineStore('usePassenger', () => {
	
	
	const passengers:Ref<IPassenger[]> = ref([])


	function create(passenger: IPassenger) {
		passengers.value.push(passenger)
	}

	function update(passenger: IPassenger) {
		const index = passengers.value.findIndex((passen) => passen.id == passenger.id)
		passengers.value[index] = passenger
	}

	function destroy(passenger_id) {
		passengers.value = passengers.value.filter((passenger) => passenger.id != passenger_id)
	}

	return { passengers, create, destroy, update }
})