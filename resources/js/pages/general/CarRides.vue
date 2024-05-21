<template>
	<main class="d-flex flex-column">
		<main class="d-flex align-center justify-space-between w-100">
			<Add v-if="Auth.isAnyAdmins || Auth.isDriver" :date="true"></Add>
			<Filters ref="filterComponent" />
			<Sorting />
		</main>
		<v-spacer>
			<AgGridVue class="ag-theme-ruzzifer ag-theme-alpine h-100" :animateRows="true"
				:defaultColDef="{ sortable: true }" :rowHeight="170" :rowClass="CarRide.rowClass"
				:headerHeight="0" :columnDefs="columnDefs" :rowData="CarRide.rides" @grid-ready="gridReady"
				:getRowId="({ data }) => data.id" :doesExternalFilterPass="(node) => filterComponent.filters(node)"
				:isExternalFilterPresent="() => true" />
		</v-spacer>
	</main>
</template>
<script setup lang="ts">
import { Add, Filters, Sorting, columnDefs, useCarRide } from './CarRides'
import { ref, onUnmounted } from 'vue'
import { useAuthStore } from '@/store/useAuthStore'
const Auth = useAuthStore()
const filterComponent = ref()

const CarRide = useCarRide()
CarRide.index()


function gridReady(params) {
	CarRide.agGrid = params.api
	CarRide.agColumnApi = params.columnApi
}

onUnmounted(() => {
	CarRide.agGrid = null
	CarRide.agColumnApi = null
})
</script>















<!-- CarRide.agGrid.refreshClientSideRowModel()
CarRide.agGrid.redrawRows() -->
<!-- // echo.channel('home').listen('CarRideCreateEvent', (event) => {
    //     onCreate(event.msg)
    // }) -->

	<!-- function setrowHeight(height) {
		CarRide.agRowHeight = height;
		setTimeout(() => CarRide.agGrid.resetRowHeights())
	}
	
	const { name } = useDisplay()
	watch(() => name.value, (current) => {
		setrowHeight(CardWidth[current])
	}) -->