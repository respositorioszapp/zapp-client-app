export interface Address {
    index?: number
    address: string;
    description?: string;
    contact_name?: string;
    contact_phone?: string;
    latitude: string;
    longitude: string;
    hover?: boolean;
    favorite? : boolean
    start_time_military_format? : string
    departure_time_military_format? :string
    start_time? :string
    departure_time? :string
    number_hours? : number
    number_of_hours? : number
}