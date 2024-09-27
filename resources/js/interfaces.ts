export interface Dialog {
    model: boolean,
    title: string | null,
    subTitle: string | null,
    open: Function,
    submitInner: Function,
    submit: Function | null,
    cancel: Function,
    reset: Function,
    icon: string,
}


export interface ITransport{
    id: number,
    user_id?: number,
    car_id: string,
    car: any,
    number: string,
    fuel_type: number,
    number_variant: number, 
    fuel: Fuel,
    trunk: boolean,
    updated_at: Date | null,
    created_at: Date | null,
}

export interface Fuel{
    id: number,
    name: string,
    updated_at: Date | null,
    created_at: Date | null,
}

export interface IOffersPassenger{
    id?: number,
    user_id?: number,
    user_car_id?: number,
    user_car: ITransport,
    passenger_id: number,
    ride_time: Date,
    price: number,
    updated_at?: Date | null,
    created_at?: Date | null,
}

export interface Region{
    id: number,
    name: string,
    updated_at: Date | null,
    created_at: Date | null,
}

export interface Districts{
    id: number,
    region_id: number,
    name: string,
    region: Region,
    updated_at: Date | null,
    created_at: Date | null,
}

export interface ICarRide{
    id: number,
    user_car: ITransport,
    user_car_id: number,
    user_id: number,
    car: ITransport,
    phone: string,
    start_city: number,
    end_city: number,
    day: Date,
    time: string,
    passengers: IPassenger[],
    strictly_on_time: boolean,
    price: number,
    address_to_address: boolean,
    free_seat: number,
    state: boolean,
    updated_at: Date | null,
    created_at: Date | null,
}

export interface CarRideCity{
    id: number,
    car_ride_id: number,
    district_id: number,
    district: Districts,
    updated_at: Date | null,
    created_at: Date | null,
}

export interface IPassenger{
    id?: number,
    car_ride_id: number | null,
    user_id?: number,
    loading: boolean,
    phone: string,
    address: string,
    offers?: IOffersPassenger[],
    start_city: number,
    start?: Districts,
    start_region?: number,
    end_city: number,
    end?: Districts,
    end_region?: number,
    with_trunk: boolean,
    ride_time: Date | null | string,
    state?: boolean,
    count: number,
    price: string | number,
    updated_at?: Date | null,
    created_at?: Date | null,
}