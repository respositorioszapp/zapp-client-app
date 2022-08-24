import { Taxes } from './Taxes';
import { ConfigurationData } from './ConfigurationData';

export interface User {
    confirmation_code: string
    confirmed: number
    email: string
    email_verified_at: string
    id: number
    last_visit: string
    name: string
    platform: string
    status: number
    verified: number
    available : number,
    customer_addresses : any[]
    last_login_date:number
    taxes : Taxes
    configuration_data : ConfigurationData[]
}

