import { defineStore } from "pinia";
import { ref, Ref, computed } from "vue";
import { ICarRide } from "@/app/interfaces";
import type { GridApi, ColumnApi } from "ag-grid-community";
import { hasDuplicates } from "@/modules/constants";
import { CarRideRepository } from "@/repository";

export const useCarRide = defineStore("useCarRide", () => {
   const agGrid: Ref<GridApi<ICarRide>> = ref(null);
   const agColumnApi: Ref<ColumnApi> = ref(null);
   const rides = ref([]);
   const districts = ref([]);
   

   async function getOnlyActive() {
      rides.value = await CarRideRepository.getOnlyActive();
	}
	
	async function getOnlyInactive() {
      rides.value = await CarRideRepository.getOnlyInactive();
   }

   async function getRidesByRegion(region_id) {
      const result = await CarRideRepository.getRidesByRegion(region_id);
      rides.value = result.rides;
      districts.value = result.districts;
   }

   async function store(formData) {
      const ride = await CarRideRepository.store(formData);

      rides.value.push(ride);
		if (agGrid.value) {			
			agGrid.value.applyTransaction({ add: [ride], addIndex: 0 });
			agGrid.value.onFilterChanged();
		}
   }

   async function update(ride_id, formData) {
      const ride = await CarRideRepository.update(ride_id, formData);

      const index = rides.value.findIndex((car_ride) => car_ride.id == ride.id);
      rides.value[index] = ride;
      if (agGrid.value) {
         const rowNode = agGrid.value.getRowNode(ride.id.toString());
         rowNode.updateData(ride);
         agGrid.value.onFilterChanged();
      }
   }

   async function destroy(ride) {
      await CarRideRepository.destroy(ride.id);

      rides.value = rides.value.filter((car_ride) => car_ride.id != ride.id);
      if (agGrid.value) agGrid.value.applyTransaction({ remove: [ride] });
   }

   async function setInactive(ride) {
      await CarRideRepository.setInActive(ride.id);

      rides.value = rides.value.filter((car_ride) => car_ride.id != ride.id);
   }

   const groupRides: any = computed(() => {
      const dists = {};
      districts.value?.forEach((district) => {
         rides.value.forEach((ride) => {
            if (district.id == ride.cities[0].district_id) {
               let group = `${ride.cities.at(-1).district.region.name} ${
                  ride.cities.at(-1).district.name
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
      agGrid.value = null;
      agColumnApi.value = null;
      rides.value = [];
      districts.value = [];
   }

   return {
      agGrid,
      agColumnApi,
      rides,
      districts,
      groupRides,
      setInactive,
      store,
      update,
      destroy,
		getOnlyActive,
		getOnlyInactive,
      getRidesByRegion,
      createPassenger,
      updatePassenger,
      deletedPassenger,
      clear,
   };
});
