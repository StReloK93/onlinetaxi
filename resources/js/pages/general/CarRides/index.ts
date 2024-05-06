import Add from './Add.vue'
import Edit from './Edit.vue'
import { getColDefs } from './GridColumns'
import type { ICarRide } from '@/app/interfaces'
import { useDisplay } from 'vuetify'
import Filters from './Filter.vue'
import Sorting from './Sorting.vue'
interface iCurrent {
   car_rides: ICarRide[] | null,
   rowClass: any[],
   rowHeight: number,
}

const CardWidth = {
   xl: 196,
   lg: 196,
   md: 196,
   sm: 196,
   xs: 292,
}

export { Add, Edit, Filters ,Sorting,getColDefs, ICarRide, useDisplay, iCurrent, CardWidth }