import { defineStore } from "pinia";
import { ref, Ref, reactive, computed } from "vue";
import { IPassenger } from "@/interfaces";
import { useAuthStore } from "@/store/useAuthStore";
import { PassengerRepository } from ".";
import moment from "moment";
export const usePassengerStore = defineStore("usePassenger", () => {
   const passengers: Ref<IPassenger[]> = ref([]);
   const AuthStore = useAuthStore()
   
   let filterDefault = { day: null, start_city: null, end_city: null, price: null, passengers_count: null, onlyMy: false }

   const filters = reactive({ ...filterDefault })
   function onClearFilter() {
      for (const key in filters) {
         filters[key] = filterDefault[key]
      }
   }


   const filteredPassengers = computed(() => {
      return passengers.value?.filter((ride) => {
         let day = true
         let start_city = true
         let end_city = true
         let onlyMy = true

         if (filters.day) day = filters.day == moment(ride.ride_time).format('YYYY-MM-DD')
         if (filters.start_city) start_city = filters.start_city == ride.start_city
         if (filters.end_city) end_city = filters.end_city == ride.end_city
         if (filters.onlyMy) onlyMy = AuthStore.user.id == ride.user_id

         return day && start_city && end_city && onlyMy
      })
   })

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

   return { passengers, create, destroy, update, filters, onClearFilter, filteredPassengers };
});
