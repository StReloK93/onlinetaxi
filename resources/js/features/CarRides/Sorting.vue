<template>
    <v-btn @click="sortByCountryThenSport" variant="plain" icon="mdi-sort" />
</template>

<script setup lang="ts">
import { useCarRide } from '@/store/CarRide'
const CarRide = useCarRide()

let index = 0
const array: any = ['asc', 'desc', null]
const sortByCountryThenSport = () => {
	CarRide.agColumnApi.applyColumnState({
		state: [
			{ colId: 'ride_time', sort: array[index], sortIndex: 1 },
		],
	});
	if (index < 2) index++
	else index = 0
}
</script>