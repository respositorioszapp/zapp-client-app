"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2104,2522,5682,8337,3039,4094,8647,8179,7628,8006],{2522:(h,c,o)=>{o.d(c,{v:()=>l});var a=o(5e3),i=o(9928);let l=(()=>{class s{constructor(){this.step=1,this.percent=0}ngOnInit(){console.log("Stepper ng oninit"),localStorage.getItem("step")&&(this.step=Number(localStorage.getItem("step")),this.percent=Number(this.step/8))}}return s.\u0275fac=function(n){return new(n||s)},s.\u0275cmp=a.Xpm({type:s,selectors:[["app-stepper"]],decls:1,vars:1,consts:[[2,"height","5px","--background","transparent","min-width","100%",3,"value"]],template:function(n,t){1&n&&a._UZ(0,"ion-progress-bar",0),2&n&&a.Q6J("value",t.percent)},dependencies:[i.X7],styles:[".stepper[_ngcontent-%COMP%]{margin:0;padding:30px 0 0;list-style:none;color:#dbdbdb;display:table;table-layout:fixed;width:100%;font-size:.8em}.stepper[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{display:table-cell;text-align:center;position:relative}.step-icon[_ngcontent-%COMP%]{background-color:#dce1f2!important;border-radius:50%;height:20px;width:20px;text-align:center;flex-shrink:0;position:relative;font-weight:500;color:#49158c;margin:0 auto}.step-icon-active[_ngcontent-%COMP%]{background-color:#49158c!important;color:#fff!important}.step-icon-content[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.step-horizontal-line[_ngcontent-%COMP%]{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin-bottom:10px;min-width:30px;border-top-color:#0000001f}"]}),s})()},8337:(h,c,o)=>{o.d(c,{Y:()=>s});var a=o(655),i=o(5e3),l=o(1892);let s=(()=>{class r{constructor(t){this.ui=t}response(t,e){return(0,a.mG)(this,void 0,void 0,function*(){if(t.error){if(t.error.messages)return void(yield this.ui.presentAlert({mode:"ios",header:t.error.messages[0],buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:d=>{e&&e.method&&"function"==typeof e.method&&e.method()}}]}));if(t.error.message)return void(yield this.ui.presentAlert({mode:"ios",header:t.error.message,buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:d=>{e&&e.method&&"function"==typeof e.method&&e.method()}}]}))}0==t.status?(e?e.message||(e.message="No se ha podido mostrar la informaci\xf3n"):e={message:"No se ha podido mostrar la informaci\xf3n"},yield this.ui.presentAlert({mode:"ios",header:e.message,message:"Esto se presenta cuando su conexi\xf3n es lenta o inexistente",buttons:[{text:"Aceptar",cssClass:"secondary",handler:d=>{e&&e.methodReload&&"function"==typeof e.methodReload&&e.methodReload(),e&&e.method&&"function"==typeof e.method&&e.method()}}]})):500==t.status&&(yield this.ui.presentAlert({mode:"ios",header:"Ha ocurrido un eror en el servidor",message:"",buttons:[{text:"Aceptar",cssClass:"secondary",handler:d=>{}}]})),t.message&&"Timeout has occurred"==t.message&&(yield this.ui.presentAlert({mode:"ios",header:"Esta operaci\xf3n ha demorado demasiado tiempo",message:"Por favor, revise su conexi\xf3n ",buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:d=>{e&&e.method&&"function"==typeof e.method&&e.method(),e&&e.methodReload&&"function"==typeof e.methodReload&&e.methodReload()}}]}))})}}return r.\u0275fac=function(t){return new(t||r)(i.LFG(l.F))},r.\u0275prov=i.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})()},9099:(h,c,o)=>{o.d(c,{i:()=>s});var a=o(5e3),i=o(2891),l=o(7556);let s=(()=>{class r{constructor(t,e){this.db=t,this.auth=e}setObject(t,e){this.db.object(t)}getFirebaseCollectionObject(t){return this.db.object(t).valueChanges()}getFirebaseCollectionList(t){return this.db.list(t).valueChanges()}}return r.\u0275fac=function(t){return new(t||r)(a.LFG(i.KQ),a.LFG(l.e))},r.\u0275prov=a.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})()}}]);