import { defineStore } from "pinia";
import { ref, Ref, computed, reactive } from "vue";
import { ICarRide } from "@/interfaces";
import { useAuthStore } from "@/store/useAuthStore";
import moment from "moment"
import { CarRideRepository } from "@/features/CarRides/index";
export const useCarRide = defineStore("useCarRide", () => {
   const rides: Ref<ICarRide[]> = ref([]);

   let filterDefault = { day: null, start_city: null, end_city: null, price: null, passengers_count: null, onlyMy: false }

   const filters = reactive({ ...filterDefault })
   const AuthStore = useAuthStore()
   function onClearFilter() {
      for (const key in filters) {
         filters[key] = filterDefault[key]
      }
   }

   async function getOnlyActive() {
      rides.value = await CarRideRepository.getOnlyActive();
   }


   // ------------------------


   async function create(formData) {
      const ride = await CarRideRepository.create(formData)
      rides.value.push(ride);
   }

   async function update(ride_id, formData) {
      const ride = await CarRideRepository.update(ride_id, formData)

      const index = rides.value.findIndex((car_ride) => car_ride.id == ride.id);
      rides.value[index] = ride;
   }

   async function destroy(ride_id) {
      await CarRideRepository.destroy(ride_id)

      rides.value = rides.value.filter((car_ride) => car_ride.id != ride_id);
   }

   //  -------------


   const activeRides = computed(() => {
      return rides.value?.filter((ride) => {
         let day = true
         let start_city = true
         let end_city = true
         let onlyMy = true

         if (filters.day) day = filters.day == moment(ride.day).format('YYYY-MM-DD')
         if (filters.start_city) start_city = filters.start_city == ride.start_city
         if (filters.end_city) end_city = filters.end_city == ride.end_city
         if (filters.onlyMy) onlyMy = AuthStore.user.id == ride.user_id

         return day && start_city && end_city && onlyMy
      })
   })

   function createPassenger(passenger) {
      const car_ride = rides.value.find(
         (ride) => ride.id == passenger.car_ride_id
      );
      car_ride.passengers.push(passenger);
   }

   function updatePassenger(curr_passenger) {
      const car_ride = rides.value.find(
         (ride) => ride.id == curr_passenger.car_ride_id
      );
      const index = car_ride.passengers.findIndex(
         (passenger) => passenger.id == curr_passenger.id
      );
      car_ride.passengers[index] = curr_passenger;
   }

   function deletedPassenger(passenger) {
      const car_ride = rides.value.find(
         (ride) => ride.id == passenger.car_ride_id
      );
      car_ride.passengers = car_ride.passengers.filter(
         (pass) => pass.id != passenger.id
      );
   }



   return {
      activeRides,
      rides,
      filters,
      create,
      update,
      destroy,
      getOnlyActive,
      createPassenger,
      updatePassenger,
      deletedPassenger,
      onClearFilter
   };
});
