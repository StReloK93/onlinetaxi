import { defineStore } from "pinia";
import { ref, Ref, computed } from "vue";
import { ICarRide } from "@/app/interfaces";
import { hasDuplicates } from "@/modules/constants";
import { CarRideRepository } from "@/features/CarRides/index";
import { useAuthStore } from "@/store/useAuthStore"
export const useCarRide = defineStore("useCarRide", () => {

   const rides = ref([]);
   const districts = ref([]);
   const filters = ref(null)
   const AuthStore = useAuthStore()
   async function getOnlyActive() {
      rides.value = await CarRideRepository.getOnlyActive();
   }

   // async function getOnlyInactive() {
   //    rides.value = await CarRideRepository.getOnlyInactive();
   // }

   async function getRidesByRegion(region_id) {
      const result = await CarRideRepository.getRidesByRegion(region_id);
      rides.value = result.rides;
      districts.value = result.districts;
   }


   // ------------------------


   async function create(ride) {
      rides.value.push(ride);
   }

   async function update(ride) {
      const index = rides.value.findIndex((car_ride) => car_ride.id == ride.id);
      rides.value[index] = ride;
   }

   async function destroy(ride_id) {
      rides.value = rides.value.filter((car_ride) => car_ride.id != ride_id);
   }

   async function inactivate(ride_id) {
      console.log(ride_id);
      
      const index = rides.value.findIndex((car_ride) => car_ride.id == ride_id);
      rides.value[index].state = 2
   }

   async function activate(ride_id) {
      const index = rides.value.findIndex((car_ride) => car_ride.id == ride_id);
      rides.value[index].state = 1;
   }

   const activeRides = computed(() => {
      return rides.value.filter((ride) => {
         if (filters.value == 'actives') return ride.state == 1
         else if (filters.value == 'auth-user') return [1, 2].includes(ride.state) && ride.user_id == AuthStore.user.id
         return true
      })
   }
   )

   const groupRides: any = computed(() => {
      const dists = {};
      districts.value?.forEach((district) => {
         rides.value.forEach((ride) => {
            if (district.id == ride.cities[0].district_id) {
               let group = `${ride.cities.at(-1).district.region.name} ${ride.cities.at(-1).district.name
                  }`;
               const array = group.split(" ");
               if (hasDuplicates(array))
                  group = ride.cities.at(-1).district.name;

               if (dists[district.name]) {
                  if (dists[district.name][group])
                     dists[district.name][group].push(ride);
                  else dists[district.name][group] = [ride];
               } else {
                  dists[district.name] = {};
                  dists[district.name][group] = [ride];
               }
            }
         });
      });
      return dists;
   });

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

   function clear() {
      rides.value = [];
      districts.value = [];
   }

   return {
      activeRides,
      rides,
      filters,
      districts,
      groupRides,
      activate,
      inactivate,
      create,
      update,
      destroy,
      getOnlyActive,
      // getOnlyInactive,
      getRidesByRegion,
      createPassenger,
      updatePassenger,
      deletedPassenger,
      clear,
   };
});
