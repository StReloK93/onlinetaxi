import { defineStore } from "pinia"
import { ref, Ref , computed } from "vue"
import { ITransport } from "@/app/interfaces"
import type { GridApi, ColumnApi } from 'ag-grid-community'
export const useTransport = defineStore('useTransport', () => {

	const agGrid: Ref<GridApi<ITransport>> = ref(null)
	const agColumnApi: Ref<ColumnApi> = ref(null)
	const transports = ref([])

	function update(transport) {
		const rowNode = agGrid.value.getRowNode(transport.id)
		rowNode.setData(transport)
	}

	function getTransports() {
		axios.get('user-cars/get-only-my').then(({ data }) => transports.value = data)
	}

	function destroy(transport) {
		axios.delete(`car/${transport.id}`).then(() => {
			transports.value = transports.value.filter((car) => car.id != transport.id)
			if (agGrid.value == null) return
			agGrid.value.applyTransaction({ remove: [transport] })
		})
	}


	return { agGrid, agColumnApi, transports, update, getTransports, destroy }
})