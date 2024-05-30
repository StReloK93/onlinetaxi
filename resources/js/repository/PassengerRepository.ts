import Client from "./Clients/AxiosClient";
import { IPassenger } from "@/app/interfaces";


export async function index() {
    const { data } = await Client.get<IPassenger[]>('passenger')
    return data
}

export async function store(formData) {
    const { data } = await Client.post<IPassenger>('passenger', formData)
    return data
}

export async function update(passenger_id, formData:IPassenger) {
    await Client.put<IPassenger>(`passenger/${passenger_id}`, formData)
}