import Add from './Add.vue'
import Edit from './Edit.vue'
import Filters from './Filter.vue'
import Sorting from './Sorting.vue'
import { ColDef } from 'ag-grid-community'
import type { ICarRide } from '@/app/interfaces'
import { CarRideRenderer } from '@/components/AgGrid'
import { useCarRide } from '@/repository/CarRide'
const columnDefs: ColDef<ICarRide>[] = [
   {
      cellRenderer: CarRideRenderer,
      flex: 1,
      valueFormatter: null,
      cellClass: ['px-0', 'align-stretch']
   },
   { field: 'ride_time', hide: true },
   { field: 'price', hide: true },
   { field: 'free_seat', hide: true },
]


const CardWidth = {
   xl: 170,
   lg: 170,
   md: 170,
   sm: 170,
   xs: 170,
}

export { Add, Edit, Filters, Sorting, columnDefs, ICarRide, CardWidth, useCarRide }