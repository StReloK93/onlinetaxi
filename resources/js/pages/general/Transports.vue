<template>
	<main class="d-flex tw-flex-col">
		<Add @create="(Transport) => transport.agGrid.applyTransaction({ add: [Transport], addIndex: 0 })"></Add>
		<v-spacer>
			<AgGridVue class="ag-theme-ruzzifer ag-theme-alpine h-100"
				:rowHeight="125" :rowClass="pageData.rowClass"
				:columnDefs="columnDefs" :rowData="transport.transports"
				@grid-ready="(params) => transport.agGrid = params.api" :getRowId="({ data }) => data.id"
			/>
		</v-spacer>
	</main>
</template>

<script setup lang="ts">
import { Add, columnDefs, useTransport } from './Transports'
import { reactive, ref } from 'vue'
const transport = useTransport()
transport.getTransports()
const pageData = reactive({
	rowClass: ['!tw-h-28', 'tw-shadow', 'tw-border-l-2', 'tw-border-pink-500' ,'bg-white', 'tw-rounded-r', 'overflow-hidden']
})


</script>