import Add from './Add.vue'
import Edit from './Edit.vue'
import type { ITransport } from '@/app/interfaces'
import { ColDef } from 'ag-grid-community'
import TransportRenderer from '@/components/AgGrid/TransportRenderer.vue'

const columnDefs: ColDef<ITransport>[] = [
	{
		cellRenderer: TransportRenderer,
		flex: 1,
		valueFormatter: null,
		cellClass: ['px-0', 'align-stretch']
	},
]

const CardWidth = {
	xl: 170,
	lg: 170,
	md: 170,
	sm: 170,
	xs: 170,
}

export { Add, Edit, columnDefs, ITransport, CardWidth }