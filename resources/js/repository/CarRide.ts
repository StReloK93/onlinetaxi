import { defineStore } from "pinia"
import { ref, Ref, computed } from "vue"
import { ICarRide } from "@/app/interfaces"
import type { GridApi, ColumnApi } from 'ag-grid-community'
import { hasDuplicates } from "@/modules/constants"
export const useCarRide = defineStore('useCarRide', () => {

	const agGrid: Ref<GridApi<ICarRide>> = ref(null)
	const agColumnApi: Ref<ColumnApi> = ref(null)
	const agRowHeight = ref(null)
	const rides = ref([])
	const districts = ref([])
	const rowClass = ref(['car-ride-height', 'tw-shadow-md', 'bg-white', 'rounded', 'overflow-hidden'])

	function index() {
		axios.get<ICarRide[]>('car-ride').then(({ data }) => rides.value = data)
	}

	async function indexCity(region_id) {
		axios.get(`car-rides/start-region/${region_id}`)
			.then(({ data }) => {
				rides.value = data.car_rides as ICarRide[]
				districts.value = data.districts
			})
	}


	function create(ride) {
		rides.value.push(ride)
		if (agGrid.value == null) return
		agGrid.value.applyTransaction({ add: [ride], addIndex: 0 })
		agGrid.value.onFilterChanged()
	}

	function update(ride) {
		const index = rides.value.findIndex((car_ride) => car_ride.id == ride.id)
		rides.value[index] = ride
		if (agGrid.value == null) return

		const rowNode = agGrid.value.getRowNode(ride.id)
		rowNode.updateData(ride)
		agGrid.value.onFilterChanged()

	}

	function destroy(ride) {
		axios.delete(`car-ride/${ride.id}`).then(() => {
			rides.value = rides.value.filter((car_ride) => car_ride.id != ride.id)

			if (agGrid.value == null) return
			agGrid.value.applyTransaction({ remove: [ride] })
		})
	}

	async function sendRoad(ride) {
		await axios.delete(`car-rides/send-road/${ride.id}`).then(() => {
			rides.value = rides.value.filter((car_ride) => car_ride.id != ride.id)
		})
	}

	

	const groupRides: any = computed(() => {
		const dists = {}
		districts.value?.forEach(district => {
			rides.value.forEach((ride) => {
				if (district.id == ride.cities[0].district_id) {
					let group = `${ride.cities.at(-1).district.region.name} ${ride.cities.at(-1).district.name}`
					const array = group.split(' ');
					if (hasDuplicates(array)) group = ride.cities.at(-1).district.name

					if (dists[district.name]) {
						if (dists[district.name][group]) dists[district.name][group].push(ride)
						else dists[district.name][group] = [ride]
					}
					else {
						dists[district.name] = {}
						dists[district.name][group] = [ride]
					}
				}
			})
		})
		return dists
	})


	function createPassenger(passenger) {
		const car_ride = rides.value.find((ride) => ride.id == passenger.car_ride_id)
		car_ride.passengers.push(passenger)
	}

	function updatePassenger(curr_passenger) {
		
		const car_ride = rides.value.find((ride) => ride.id == curr_passenger.car_ride_id)
		const index = car_ride.passengers.findIndex((passenger => passenger.id == curr_passenger.id))
		car_ride.passengers[index] = curr_passenger
	}

	function deletedPassenger(passenger) {
		const car_ride = rides.value.find((ride) => ride.id == passenger.car_ride_id)
		car_ride.passengers = car_ride.passengers.filter((pass) => pass.id != passenger.id)
	}


	function clear() {
		agGrid.value = null
		agColumnApi.value = null
		agRowHeight.value = null
		rides.value = []
		districts.value = []
		rowClass.value = []
	}


	return { agGrid, agColumnApi, rides, agRowHeight, rowClass, districts, groupRides,sendRoad ,  create, update, destroy, index, indexCity, createPassenger, updatePassenger, deletedPassenger, clear }
})