"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8337,3039,4094,8647,8179],{8337:(n,o,r)=>{r.d(o,{Y:()=>h});var c=r(655),d=r(5e3),l=r(1892);let h=(()=>{class a{constructor(s){this.ui=s}response(s,e){return(0,c.mG)(this,void 0,void 0,function*(){if(s.error){if(s.error.messages)return void(yield this.ui.presentAlert({mode:"ios",header:s.error.messages[0],buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:t=>{e&&e.method&&"function"==typeof e.method&&e.method()}}]}));if(s.error.message)return void(yield this.ui.presentAlert({mode:"ios",header:s.error.message,buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:t=>{e&&e.method&&"function"==typeof e.method&&e.method()}}]}))}0==s.status?(e?e.message||(e.message="No se ha podido mostrar la informaci\xf3n"):e={message:"No se ha podido mostrar la informaci\xf3n"},yield this.ui.presentAlert({mode:"ios",header:e.message,message:"Esto se presenta cuando su conexi\xf3n es lenta o inexistente",buttons:[{text:"Aceptar",cssClass:"secondary",handler:t=>{e&&e.methodReload&&"function"==typeof e.methodReload&&e.methodReload(),e&&e.method&&"function"==typeof e.method&&e.method()}}]})):500==s.status&&(yield this.ui.presentAlert({mode:"ios",header:"Ha ocurrido un eror en el servidor",message:"",buttons:[{text:"Aceptar",cssClass:"secondary",handler:t=>{}}]})),s.message&&"Timeout has occurred"==s.message&&(yield this.ui.presentAlert({mode:"ios",header:"Esta operaci\xf3n ha demorado demasiado tiempo",message:"Por favor, revise su conexi\xf3n ",buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:t=>{e&&e.method&&"function"==typeof e.method&&e.method(),e&&e.methodReload&&"function"==typeof e.methodReload&&e.methodReload()}}]}))})}}return a.\u0275fac=function(s){return new(s||a)(d.LFG(l.F))},a.\u0275prov=d.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})()}}]);