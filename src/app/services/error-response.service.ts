import { Injectable } from '@angular/core';
import { UiService } from './ui.service';
import { ErrorResponse } from '../interfaces/ErrorResponse';
import { ErrorResponseOptions } from '../interfaces/ErrorResponseOptions';

@Injectable({
  providedIn: 'root'
})
export class ErrorResponseService {

  constructor(private ui : UiService) { }

  /**
   * This method is for handle error response 
   * @param err parameter related to HTTP error response implemented the ErrorResponse interface
   * @param options parameter for customize the response like a message or execute a method for reload. 
   * This parameter implement the ErrorResponseOptions interface
   */
  async response(err: ErrorResponse, options? : ErrorResponseOptions){
    if(err.error){
      if(err.error.messages){
        await this.ui.presentAlert({
          mode: 'ios',
          header: err.error.messages[0],
          buttons: [
            {
              text: 'Aceptar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                if(options && options.method && typeof options.method == "function"){
                  options.method();
                }
              }
            },
          ]
        })
        // this.ui.showToast(err.error.messages[0]);
        return;
      }
      if(err.error.message){
        await this.ui.presentAlert({
          mode: 'ios',
          header: err.error.message,
          buttons: [
            {
              text: 'Aceptar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                if(options && options.method && typeof options.method == "function"){
                  options.method();
                }
              }
            },
          ]
        })
        // this.ui.showToast(err.error.message);
        return;
      }
    }
    if(err.status == 0){
      if(!options){
        options = {
          message : "No se ha podido mostrar la información"
        }
      }else{
        if(!options.message){
          options.message = "No se ha podido mostrar la información"
        }
      }
      await this.ui.presentAlert({
        mode: 'ios',
        header: options.message,
        message: "Esto se presenta cuando su conexión es lenta o inexistente",
        buttons: [
          {
            text: 'Aceptar',
            cssClass: 'secondary',
            handler: (blah) => {
              if(options && options.methodReload && typeof options.methodReload == "function"){
                options.methodReload();
              }
              if(options && options.method && typeof options.method == "function"){
                options.method();
              }
            }
          },
        ]
      })
      // this.ui.showToast("Error de conexión");
    }else{
      if(err.status == 500 ){
        await this.ui.presentAlert({
          mode: 'ios',
          header: 'Ha ocurrido un eror en el servidor',
          message : '',
          buttons: [
            {
              text: 'Aceptar',
              cssClass: 'secondary',
              handler: (blah) => {
               
              }
            },
          ]
        })
        // this.ui.showToast("Error en el servidor");
      }
    }
    if(err.message && err.message == "Timeout has occurred"){
      await this.ui.presentAlert({
        mode: 'ios',
        header: "Esta operación ha demorado demasiado tiempo",
        message : "Por favor, revise su conexión ", 
        buttons: [
          {
            text: 'Aceptar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              if(options && options.method && typeof options.method == "function"){
                options.method();
              }
              if(options && options.methodReload && typeof options.methodReload == "function"){
                options.methodReload();
              }
            }
          },
        ]
      })
    }
  }
}
