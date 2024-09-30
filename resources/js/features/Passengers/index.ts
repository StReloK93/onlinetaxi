import AddForm from "@/features/Passengers/components/AddForm-Passenger.vue";
import EditForm from "@/features/Passengers/components/EditForm-Passenger.vue";
import Card  from "@/features/Passengers/components/Card-Passenger.vue";
import FormInputs from '@/features/Passengers/components/FormInputs-Passenger.vue'
import FilterPassenger from "./components/Filter-Passenger.vue";
import PassengerRepository from '@/features/Passengers/PassengerRepository'
import { usePassengerStore } from '@/features/Passengers/PassengerStore';
import type { IPassenger } from '@/interfaces'
export {
   IPassenger,
   usePassengerStore,
   PassengerRepository,
   Card,
   AddForm,
   FormInputs,
   EditForm,
   FilterPassenger,
};
