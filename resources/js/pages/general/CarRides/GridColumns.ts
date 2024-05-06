import CarRideRenderer from '@/components/AgGrid/CarRideRenderer.vue'
import { ColDef } from 'ag-grid-community'
import { ICarRide } from '@/app/interfaces'
export function getColDefs() {
    
    const columnDefs: ColDef<ICarRide>[] = [
        {
            cellRenderer: CarRideRenderer,
            flex: 1,
            valueFormatter:  null,
            cellClass: ['px-0', 'align-stretch']
        },
        { field: 'ride_time', hide: true },
        { field: 'price', hide: true },
        { field: 'free_seat', hide: true },
    ]

    return columnDefs
}