import { Injectable } from '@angular/core';
import { AddressLocation } from '../interfaces/AddressLocation';
import { UiService } from './ui.service';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class MapLocationService {

  constructor(private ui : UiService) { }

  async findPlace(latLng: AddressLocation) {
    //Tranforma to the Google interface LatLng
    let location = new google.maps.LatLng(latLng.latitude, latLng.longitude);
    //Get the address for the ${latLng}
    const address = await this.getAddressBylocation(location);
    latLng.address = address ? address : latLng.address;
    return address;
  }

  private async getAddressBylocation(latLng): Promise<string>{
    let geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ 'latLng': latLng }, async (results, status) => {
        
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(results[0]);
          console.log("Dirección", results[0]['formatted_address'])
          resolve(results[0]['formatted_address']);
        } else {
          
          await this.ui.presentAlert({
            mode: 'ios',
            header: 'No se ha podido mostrar la información',
            buttons: [
              {
                text: 'Aceptar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
  
                }
              },
            ]
          })
          resolve("")
        }
      });
    });
  }

  private async getAddressLocation(address): Promise<AddressLocation>{
    let geocoder = new google.maps.Geocoder();
    
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: address ,componentRestrictions: {
        country: "CO",
        postalCode: "080001",
      },}, async (results, status) => {
        
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(results[0]);
          console.log("Dirección", results[0]['formatted_address'])
          resolve({
            latitude : results[0].geometry.lat,
            longitude : results[0].geometry.lng
          });
        } else {
          
          await this.ui.presentAlert({
            mode: 'ios',
            header: 'No se ha podido mostrar la información',
            message : status,
            buttons: [
              {
                text: 'Aceptar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
  
                }
              },
            ]
          })
          resolve({})
        }
      });
    });
  }

  async findAddress(location: AddressLocation){
    return await this.getAddressLocation(location.address);
  }
}
