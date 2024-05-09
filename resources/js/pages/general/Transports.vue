<template>
	<main class="d-flex tw-flex-col">
		<Add @create="(Transport) => pageData.gridApi.applyTransaction({ add: [Transport], addIndex: 0 })"></Add>

		<v-spacer>
			<AgGridVue class="ag-theme-ruzzifer ag-theme-alpine h-100"
				:rowHeight="170" :rowClass="pageData.rowClass"
				:columnDefs="columnDefs" :rowData="pageData.cars"
				@grid-ready="(params) => pageData.gridApi = params.api" :getRowId="({ data }) => data.id"
			/>
		</v-spacer>
	</main>
</template>

<script setup lang="ts">
import { Add, columnDefs } from './Transports'
import { reactive, ref } from 'vue'

const pageData = reactive({
	cars: null,
	gridApi: null,
	rowClass: ['car-ride-height', 'tw-shadow', 'tw-border-l-2', 'tw-border-pink-500' ,'bg-white', 'tw-rounded-r', 'overflow-hidden']
})

// function onEdit(Transport) {
// 	const rowNode = pageData.gridApi.getRowNode(Transport.id)
// 	rowNode.setData(Transport)
// }

axios.get('cars/get_only_my').then(({ data }) => pageData.cars = data)
</script>