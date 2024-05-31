import Add from "@/features/Passengers/components/AddPassenger.vue";
import Edit from "@/features/Passengers/components/EditPassenger.vue";
import PassengerRenderer  from "@/features/Passengers/components/PassengerRenderer.vue";
import PassengerRepository from '@/features/Passengers/PassengerRepository'
import { usePassengerStore } from '@/features/Passengers/PassengerStore';
import Inputs from '@/features/Passengers/components/InputsPassenger.vue'
import type { IPassenger } from '@/app/interfaces'
export {
   IPassenger,
   usePassengerStore,
   PassengerRepository,
   PassengerRenderer,
   Add,
   Inputs,
   Edit,
};
