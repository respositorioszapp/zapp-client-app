"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5682,8337,3039,4094,8647,8179],{8337:(h,c,s)=>{s.d(c,{Y:()=>n});var r=s(655),d=s(5e3),l=s(1892);let n=(()=>{class t{constructor(a){this.ui=a}response(a,e){return(0,r.mG)(this,void 0,void 0,function*(){if(a.error){if(a.error.messages)return void(yield this.ui.presentAlert({mode:"ios",header:a.error.messages[0],buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:o=>{e&&e.method&&"function"==typeof e.method&&e.method()}}]}));if(a.error.message)return void(yield this.ui.presentAlert({mode:"ios",header:a.error.message,buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:o=>{e&&e.method&&"function"==typeof e.method&&e.method()}}]}))}0==a.status?(e?e.message||(e.message="No se ha podido mostrar la informaci\xf3n"):e={message:"No se ha podido mostrar la informaci\xf3n"},yield this.ui.presentAlert({mode:"ios",header:e.message,message:"Esto se presenta cuando su conexi\xf3n es lenta o inexistente",buttons:[{text:"Aceptar",cssClass:"secondary",handler:o=>{e&&e.methodReload&&"function"==typeof e.methodReload&&e.methodReload(),e&&e.method&&"function"==typeof e.method&&e.method()}}]})):500==a.status&&(yield this.ui.presentAlert({mode:"ios",header:"Ha ocurrido un eror en el servidor",message:"",buttons:[{text:"Aceptar",cssClass:"secondary",handler:o=>{}}]})),a.message&&"Timeout has occurred"==a.message&&(yield this.ui.presentAlert({mode:"ios",header:"Esta operaci\xf3n ha demorado demasiado tiempo",message:"Por favor, revise su conexi\xf3n ",buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:o=>{e&&e.method&&"function"==typeof e.method&&e.method(),e&&e.methodReload&&"function"==typeof e.methodReload&&e.methodReload()}}]}))})}}return t.\u0275fac=function(a){return new(a||t)(d.LFG(l.F))},t.\u0275prov=d.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},9099:(h,c,s)=>{s.d(c,{i:()=>n});var r=s(5e3),d=s(2891),l=s(7556);let n=(()=>{class t{constructor(a,e){this.db=a,this.auth=e}setObject(a,e){this.db.object(a)}getFirebaseCollectionObject(a){return this.db.object(a).valueChanges()}getFirebaseCollectionList(a){return this.db.list(a).valueChanges()}}return t.\u0275fac=function(a){return new(a||t)(r.LFG(d.KQ),r.LFG(l.e))},t.\u0275prov=r.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);