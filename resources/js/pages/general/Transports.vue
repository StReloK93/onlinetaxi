<template>
	<main class="d-flex tw-flex-col">
		<div>
			<main class="d-flex align-center justify-space-between mb-2">
				<nav></nav>
				<Add @create="onCreate"></Add>
				<Edit @update="onEdit" ref="editComponent"></Edit>
			</main>
		</div>
		<v-spacer>
			<AgGridVue class="ag-theme-ruzzifer ag-theme-alpine h-100" :rowHeight="58" :rowClass="pageData.rowClass"
				:columnDefs="columnDefs" :rowData="pageData.cars" :rowSelection="'multiple'"
				@grid-ready="(params) => pageData.gridApi = params.api" :getRowId="({ data }) => data.id" />
		</v-spacer>
	</main>
</template>

<script setup lang="ts">
import TrunkRenderer from '@/components/AgGrid/TrunkRenderer.vue'
import IconRenderer from '@/components/AgGrid/IconRenderer.vue'

import Add from '@/pages/general/Transports/Add.vue'
import Edit from '@/pages/general/Transports/Edit.vue'
import { ColDef } from 'ag-grid-community'
import { reactive, ref } from 'vue'
const editComponent = ref()
const pageData = reactive({
	cars: null,
	gridApi: null,
	rowClass: ['tw-max-h-14', 'bg-white', 'tw-shadow']
})

const columnDefs: ColDef[] = [
	{ field: 'type', headerName: 'Turi', width: 150 },
	{ field: 'number', headerName: 'Raqami', width: 150 },
	{ field: 'color', headerName: 'Rangi', width: 150 },
	{ field: 'fuel.name', headerName: "Yoqilg'i turi", width: 150 },
	{ field: 'trunk', headerName: "Bagaj", minWidth: 150, flex: 1, cellRenderer: TrunkRenderer, cellRendererParams: { icon: 'mdi-bag-suitcase' } },
	{
		cellClass: ['d-flex', 'justify-center', 'align-center', 'px-2', 'hover:tw-bg-gray-100'],
		headerName: '',
		width: 60,
		cellRenderer: IconRenderer,
		cellRendererParams: { icon: 'mdi-pencil-outline' },
		headerClass: ['px-2'],
		onCellClicked: ({ data }) => {
			editComponent.value.toggle(data)
		}
	},
]


function onCreate(Transport) {
	pageData.gridApi.applyTransaction({ add: [Transport], addIndex: 0 })
}


function onEdit(Transport) {
	const rowNode = pageData.gridApi.getRowNode(Transport.id)
	rowNode.setData(Transport)
}

axios.get('cars/get_only_my').then(({ data }) => pageData.cars = data)
</script>