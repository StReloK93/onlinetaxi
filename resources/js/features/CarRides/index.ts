import Add from "./Add.vue";
import Edit from "./Edit.vue";
import Filters from "./Filter.vue";
import Sorting from "./Sorting.vue";
import { ColDef } from "ag-grid-community";
import type { ICarRide } from "@/app/interfaces";
import CarRideRenderer from "@/components/AgGrid/CarRideRenderer.vue";
import { useCarRide } from "@/store/CarRide";
const columnDefs: ColDef<ICarRide>[] = [
   {
      cellRenderer: CarRideRenderer,
      flex: 1,
      valueFormatter: null,
      cellClass: ["px-0", "align-stretch"],
   },
   { field: "day", hide: true },
   { field: "price", hide: true },
   { field: "free_seat", hide: true },
];


const rowClass = [
   'overflow-hidden',
   "car-ride-height",
   "elevation-1",
   "tw-border-l-2",
   "tw-border-pink-500",
   "bg-white",
];

export {
   Add,
   Edit,
   Filters,
   Sorting,
   ICarRide,
   columnDefs,
   rowClass,
   useCarRide,
};
