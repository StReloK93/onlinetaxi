<template>
	<main class="d-flex tw-flex-col">
		<Edit @update="onEdit" ref="editComponent"></Edit>
		<main class="d-flex align-center justify-space-between mb-2 px-1">
			<Add @create="onCreate"></Add>
		</main>
		<v-spacer>
			<AgGridVue
				class="ag-theme-ruzzifer ag-theme-alpine h-100"
				:rowHeight="58"
				:rowClass="pageData.rowClass"
				:columnDefs="columnDefs"
				:rowData="pageData.car_rides"
				:rowSelection="'multiple'"
				@grid-ready="(params) => pageData.gridApi = params.api"
				:getRowId="({ data }) => data.id"
			/>
		</v-spacer>
	</main>
</template>
<script setup lang="ts">
import { PassengerRenderer } from '@/components/AgGrid'
import Add from '@/pages/general/Passengers/Add.vue'
import Edit from '@/pages/general/Passengers/Edit.vue'
import { ColDef, GridApi } from 'ag-grid-community'
import { ICarRide } from '@/app/interfaces'
import { reactive, ref } from 'vue'
const editComponent = ref()

interface PageData {
	car_rides: ICarRide[],
	gridApi: GridApi<ICarRide>,
	rowClass: any[],
}
const pageData: PageData = reactive({
	car_rides: null,
	gridApi: null,
	rowClass: ['tw-max-h-14', 'bg-white', 'tw-shadow']
})

const columnDefs: ColDef[] = [
	{ field: 'car.type', headerName: "Transport nomi", width: 150 },
	{ field: 'car.number', headerName: "Transport raqami", width: 150 },
	{ field: 'phone', headerName: "Telefon", width: 150 },
   { field: 'price', headerName: "Narxi", width: 150 },
   { field: 'free_seat', headerName: "Yo'lovchilar soni", cellRenderer: PassengerRenderer, valueFormatter: null },
]

function onCreate(Transport) {
	pageData.gridApi.applyTransaction({ add: [Transport], addIndex: 0 })
}


function onEdit(Transport) {
	const rowNode = pageData.gridApi.getRowNode(Transport.id)
	rowNode.setData(Transport)
}

axios.get<ICarRide[]>('car-rides/only-success')
	.then(({ data }) => pageData.car_rides = data)
</script>