import { City } from './City';
import { ProfileSettings } from './ProfileSettings';

export interface Store{
    id? : number
    name? : string
    latitude? : string,
    longitude? :string,
    ID : string
    city? : City
    display_name : string
    profile_settings : ProfileSettings

}