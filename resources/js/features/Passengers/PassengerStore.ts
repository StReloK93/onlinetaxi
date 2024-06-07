import { defineStore } from "pinia";
import { ref, Ref, computed } from "vue";
import { IPassenger } from "@/interfaces";
import { PassengerRepository } from ".";
export const usePassengerStore = defineStore("usePassenger", () => {
   const passengers: Ref<IPassenger[]> = ref([]);

	async function create(formData: IPassenger) {
		const passenger = await PassengerRepository.create(formData)
      passengers.value.push(passenger);
   }

	async function update(passenger_id, formData) {
		const passenger = await PassengerRepository.update(passenger_id, formData)

      const index = passengers.value.findIndex((passen) => passen.id == passenger.id)
      passengers.value[index] = passenger
   }

	async function destroy(passenger_id) {
		await PassengerRepository.destroy(passenger_id)
      passengers.value = passengers.value.filter((passenger) => passenger.id != passenger_id);
   }

   return { passengers, create, destroy, update };
});
