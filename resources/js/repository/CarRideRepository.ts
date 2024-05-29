import Client from "./Clients/AxiosClient";
import { ICarRide } from '@/app/interfaces'
const resource = "car-ride";


export async function getOnlyActive() {
   const { data } = await Client.get<ICarRide[]>(`${resource}/only-active`);
   return data;
}

export async function getOnlyInActive() {
   const { data } = await Client.get<ICarRide[]>(`${resource}/only-passive`);
   return data;
}

export async function getRidesByRegion(region_id) {
   const { data } = await Client.get(`${resource}/start-region/${region_id}`);
   return { rides: data.car_rides, districts: data.districts };
}

export async function setInActive(ride_id) {
   await Client.delete(`${resource}/set-inactive/${ride_id}`);
}

export async function index() {
   const { data } = await Client.get<ICarRide[]>(`${resource}`);
   return data
}

export async function show(ride_id) {
   const { data } = await Client.get<ICarRide>(`${resource}/${ride_id}`);
   return data
}

export async function store(formData) {
   const { data } = await Client.post<ICarRide>(`${resource}`, formData);
   return data
}

export async function update(ride_id, formData) {
   const { data } = await Client.put<ICarRide>(`${resource}/${ride_id}`, formData);
   return data
}

export async function destroy(ride_id) {
   await Client.delete(`${resource}/${ride_id}`);
}


