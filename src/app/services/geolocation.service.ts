import { Injectable } from '@angular/core';

import { Subscription } from 'rxjs';
import {  Plugins, Capacitor } from '@capacitor/core';
import { take } from 'rxjs/operators';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { UiService } from './ui.service';
import { ActivateLocationPage } from '../dialogs/activate-location/activate-location.page';
import ModalOptions from '../interfaces/ModalOptions';
import { CloseShopPage } from '../dialogs/close-shop/close-shop.page';
import { Geolocation,PositionOptions,Position } from '@capacitor/geolocation';
@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private diagnostic: Diagnostic,
    private ui: UiService) { }

  /**
 * Funcion parao obtener la position actual del usuario
 *
 * Este metodo se encarga de obtener las coordenadas del usuario en sesion,
 *  una vez obtenido, se almacena en el localStorage para su posterior uso.  
 * En caso de que falle se obtiene la ultima posicion almacenada en localStorage 
 * en caso de que la haya
 * 
 * @access public
 * @param  GeolocationOptions options?  , los cuales son los criterios para obtener la posicion
 * @return Retorna una promesa de tipo GeolocationPosition
 */
  async getCurrentPosition(options?: PositionOptions): Promise<Position> {
    let enabledHighAccuracy;
    let availableHighAccuracy;
    let enabledNetwork;
    let availableNetwork;
    if (Capacitor.platform !== 'web') {
      enabledNetwork= await this.diagnostic.isNetworkLocationAvailable();
      availableHighAccuracy= await this.diagnostic.isNetworkLocationEnabled();
      enabledHighAccuracy = await this.diagnostic.isGpsLocationEnabled();
      availableHighAccuracy = await this.diagnostic.isGpsLocationAvailable();
    }else{
      enabledNetwork= true
      availableHighAccuracy= true
      enabledHighAccuracy = true
      availableHighAccuracy = true;
      
    }
    console.log(` Geolocation Enabled Network ${enabledNetwork} available Network ${availableNetwork}`)
    console.log(` Geolocation Enabled ${enabledHighAccuracy} available ${availableHighAccuracy}`)
    let geolocation;
    if (enabledNetwork || enabledHighAccuracy) {
      try{
        console.log(` Geolocation is Enabled `)
        let position;
        if(options){
          position = await Geolocation.getCurrentPosition(options);
        }else{
          position = await Geolocation.getCurrentPosition();
        }
        console.log(` Geolocation is Enabled Latitude`, position.coords.latitude, `Geolocation is Enabled Longitude`,position.coords.longitude)
        localStorage.setItem("latitude", position.coords.latitude.toString());
        localStorage.setItem("longitude", position.coords.longitude.toString());
        return position;  
      }catch(e)
      {
        console.log(` Geolocation Catch Error`)
        if(localStorage.getItem("latitude") && localStorage.getItem("longitude")){
          console.log(` Geolocation Catch Error Have Position`)
          return {
            coords : {
              latitude : parseFloat(localStorage.getItem("latitude")),
              longitude : parseFloat(localStorage.getItem("longitude")),
              accuracy:0,
              altitude:0,
              altitudeAccuracy:0,
              heading:0,
              speed:0,
            },
            timestamp:Date.now()
          }
        }else{
          console.log(` Geolocation Catch Error Don´t Have Position`)
          this.showNotInStock()
        }
      }
      
    } else {
      
      this.showNotInStock()
    }
  }

  async showModal(obj) {
    const modal = await this.ui.presentModal(CloseShopPage, obj, ["modal-xs"])
  }

  async showNotInStock() {
    const obj: ModalOptions = {
      image: 'assets/imgs/location-animation.gif',
      title: "Por favor, active su ubicación",
      color_message: "#eb445a",
      color_title: "#5952fd"
      //  color_title : "#eb445a"
    }
    this.showModal(obj);

  }

  async isLocationEnabled(){
    let enabled;
    let available;
    if (Capacitor.platform !== 'web') {
      enabled = await this.diagnostic.isGpsLocationEnabled();
      available = await this.diagnostic.isGpsLocationAvailable();
    }else{
      enabled=false;
      available=false;
    }
    console.log(`Enabled ${enabled} available ${available}`)
    if (!enabled) {
      this.showNotInStock()
    } else {
      

    }
  }



}
