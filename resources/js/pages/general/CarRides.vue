<template>
	<main class="d-flex flex-column tw-mx-auto">
		<Add :date="true"></Add>
		<main class="d-flex align-center justify-space-between w-100">
			<Filters ref="filterComponent" />
			<Sorting />
		</main>
		<v-spacer>
			<AgGridVue class="ag-theme-ruzzifer ag-theme-alpine h-100" :animateRows="true"
				:defaultColDef="{ sortable: true }" :rowHeight="CarRide.agRowHeight" :rowClass="CarRide.rowClass"
				:headerHeight="0" :columnDefs="colDefs" :rowData="CarRide.rides" @grid-ready="gridReady"
				:getRowId="({ data }) => data.id" :doesExternalFilterPass="(node) => filterComponent.filters(node)"
				:isExternalFilterPresent="() => true" />
		</v-spacer>
	</main>
</template>

<script setup lang="ts">
import { Add, Filters, Sorting, getColDefs, useDisplay, CardWidth } from './CarRides'
import { ref, watch, onUnmounted } from 'vue'
import { useCarRide } from '@/repository/CarRide'
const CarRide = useCarRide()
CarRide.index()

const filterComponent = ref()
const colDefs = getColDefs()


function setrowHeight(height) {
	CarRide.agRowHeight = height;
	setTimeout(() => CarRide.agGrid.resetRowHeights())
}

const { name } = useDisplay()
watch(() => name.value, (current) => {
	setrowHeight(CardWidth[current])
})

function gridReady(params) {
	CarRide.agGrid = params.api
	CarRide.agColumnApi = params.columnApi
	setrowHeight(CardWidth[name.value])
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