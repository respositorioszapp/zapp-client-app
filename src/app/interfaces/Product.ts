import { Store } from './Store';

export interface Product{
    id? : number
    name? : string
    category? : string,
    price? : number
    store? : Store
    image? : string,
    quantity : number
    product? : string,
    comments? : string
    radio_id? :string
    additionals_ids? : string[]
    additional_radio?:string[]
    additional_price? : number
    fields?: any[]
}