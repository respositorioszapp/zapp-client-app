import { Address } from './Address';

export interface Driver {
    id?:number
    driver: string;
    km?: number;
    time?: number;
    time_text? : string
    address_array: Address[];
    round_trip?: boolean;
    hover?: boolean;
    total?: number
}