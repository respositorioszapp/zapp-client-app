import { AddressLocation } from './AddressLocation';
import { City } from './City';
import { Product } from './Product';

export interface Person {
    address: string
    birdthay: string
    city: string
    city_id: number
    country: string
    dni: string
    dni_name: string
    dni_type_id: string
    email: string
    first_name: string
    gender: string
    id: number
    last_name: string
    phone: string
    photo: string
    position: string
    prefix: string
    state_id: number
    status: number
    city_selected? : City, 
    cart_items?: Product[],
    hide_cart? :boolean,
    total : number
    quantity? : number
    location: AddressLocation
}
