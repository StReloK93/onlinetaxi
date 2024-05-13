<template>
	<v-menu :close-on-content-click="false" location="bottom">
		<template v-slot:activator="{ props }">
			<main>
				<v-btn color="primary" variant="text" v-bind="props" prepend-icon="mdi-filter">
					Filterlar
				</v-btn>
				<v-btn v-if="filtered == false" color="primary" size="x-small" variant="text" @click="resetFilter"
					icon="mdi-close" />
			</main>
		</template>
		<v-card elevation="2" rounded="sm" :width="270">
			<v-row class="ma-0">
				<v-col cols="12" class="py-2">
					<v-autocomplete label="Shahar | A" v-model="filter.start_city" clearable :items="start_cities"
						item-title="name" :item-value="(item: any) => item.id" variant="plain" />
				</v-col>
				<v-col cols="12" class="py-2">
					<v-autocomplete label="Shahar | B" v-model="filter.end_city" clearable :items="end_cities"
						item-title="name" :item-value="(item: any) => item.id" variant="plain" />
				</v-col>
				<v-col cols="12" class="d-flex align-center flex-column py-0">
					<VDatePicker :trim-weeks="true" :min-date="new Date()" v-model="filter.day" mode="date" transparent borderless
						expanded />
				</v-col>
			</v-row>
		</v-card>
	</v-menu>
</template>

<script setup lang="ts">
import moment from '@/modules/moment'
import { reactive, computed, watch } from 'vue'
import { useCarRide } from '@/repository/CarRide'
const CarRide = useCarRide()
const filter = reactive({ start_city: null, end_city: null, day: null })

const start_cities = computed(() => {
	if (CarRide.rides == null) return []
	const array = CarRide.rides.map((ride) => ride.cities[0]?.district)
	return array.filter((value, index, self) =>
		index === self.findIndex((t) => (
			t.id === value.id
		))
	)
})

const end_cities = computed(() => {
	if (CarRide.rides == null) return []
	const array = []
	CarRide.rides.forEach(element => {
		element.cities.forEach((item, index) => {
			if (index != 0) array.push(item.district)
		});
	});
	return array.filter((value, index, self) =>
		index === self.findIndex((t) => (
			t.id === value.id
		))
	)
})

function filters(node) {
	const selectedDate = filter.day == null ? null : moment(filter.day).format("YYYY-MM-DD")
	// Start City
	const start = [null, node.data.cities[0]?.district_id].includes(filter.start_city)

	// End Cities
	const array = node.data.cities.filter((item, index) => index != 0).map((item) => item?.district_id)
	const end = [null, ...array].includes(filter.end_city)


	// Selected Date
	const date = [moment(node.data.day).format("YYYY-MM-DD"), null].includes(selectedDate)

	return start && end && date
}

const filtered = computed(() => {
	const array = Object.values(filter)
	return array.every((item) => [null, ""].includes(item))
})
function resetFilter() {
	filter.start_city = null
	filter.end_city = null
	filter.day = null
}
defineExpose({ filters, resetFilter, filtered })
watch(() => filter, () => CarRide.agGrid.onFilterChanged(), { deep: true })
</script>
