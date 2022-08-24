"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5135,8337,3039,4094,8647,8179],{5135:(p,h,o)=>{o.r(h),o.d(h,{QualificationPageModule:()=>a});var f=o(9808),i=o(4182),g=o(9928),_=o(3769),u=o(8785),d=o(5e3);const s=[{path:"",component:u.W}];let e=(()=>{class n{}return n.\u0275fac=function(c){return new(c||n)},n.\u0275mod=d.oAB({type:n}),n.\u0275inj=d.cJS({imports:[_.Bz.forChild(s),_.Bz]}),n})(),a=(()=>{class n{}return n.\u0275fac=function(c){return new(c||n)},n.\u0275mod=d.oAB({type:n}),n.\u0275inj=d.cJS({imports:[f.ez,i.u5,g.Pc,e]}),n})()},8785:(p,h,o)=>{o.d(h,{W:()=>v});var f=o(655),i=o(5e3),g=o(1892),_=o(1335),u=o(7556),d=o(8337),s=o(9808),e=o(4182),a=o(9928);const n=function(c){return{yellow:c}};let v=(()=>{class c{constructor(r,t,l,m){this.ui=r,this.request=t,this.auth=l,this.error=m,this.qualification={one:!1,two:!1,three:!1,four:!1,five:!1},this.opinion=""}ngOnInit(){console.log("Driver",this.driver)}dismiss(){this.ui.dismiss({},"QualificationPage")}star(r){Object.keys(this.qualification).forEach(t=>{this.qualification[t]=!1}),Object.keys(this.qualification).forEach(t=>{switch(r){case"one":this.qualification[r]=!0;break;case"two":this.qualification.one=!0,this.qualification[r]=!0;break;case"three":this.qualification.one=!0,this.qualification.two=!0,this.qualification[r]=!0;break;case"four":this.qualification.one=!0,this.qualification.two=!0,this.qualification.three=!0,this.qualification[r]=!0;break;case"five":this.qualification.one=!0,this.qualification.two=!0,this.qualification.three=!0,this.qualification.four=!0,this.qualification[r]=!0}})}scoreIt(){return(0,f.mG)(this,void 0,void 0,function*(){let r=0;if(Object.keys(this.qualification).forEach(t=>{this.qualification[t]&&r++}),r>0){const t={user_id:this.driver.driver_id,customer_id:this.auth.user.id,order_id:this.order.id,score:r,description:this.opinion},l=yield this.ui.loading("Por favor espere...");this.request.post("score/rate_user",t).subscribe(m=>(0,f.mG)(this,void 0,void 0,function*(){(yield l).dismiss(),this.order.score_service=r,this.dismiss()}),m=>(0,f.mG)(this,void 0,void 0,function*(){(yield l).dismiss(),this.error.response(m)})),console.log("Score",r),console.log("Opinion",this.opinion)}else yield this.ui.presentAlert({mode:"ios",header:"Debe poner una calificaci\xf3n ",buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:t=>{}}]})})}}return c.\u0275fac=function(r){return new(r||c)(i.Y36(g.F),i.Y36(_.s),i.Y36(u.e),i.Y36(d.Y))},c.\u0275cmp=i.Xpm({type:c,selectors:[["app-qualification"]],inputs:{order:"order",driver:"driver"},decls:35,vars:24,consts:[["mode","ios",2,"position","relative"],[2,"position","absolute","left","5px","bottom","14px"],[1,"ion-text-center"],[2,"width","80%","height","fit-content","position","absolute","top","0","left","0","right","0","bottom","0","margin","auto","text-align","center","justify-content","center"],[2,"text-align","center","margin","auto","width","80%","display","flex","justify-content","center"],[1,"ion-text-center",2,"width","200px","height","200px","padding","10px","border","0.5px solid #cccccc"],[3,"src"],[1,"ion-text-uppercase",2,"font-weight","bold","margin-top","10px"],["size","2",3,"click"],[2,"font-size","2em","color","#b8bac0","transition","color ease 1s",3,"name","ngClass"],[3,"click"],[2,"text-align","start","border","0.5px solid #ccc","border-radius","20px","padding","5px",3,"ngModel","ngModelChange"],[2,"display","flex"],["color","primary","fill","outline",2,"width","50%",3,"click"],["color","primary",2,"width","50%",3,"click"]],template:function(r,t){1&r&&(i.TgZ(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-title",1),i._uU(3,"Calificar "),i.qZA()()(),i.TgZ(4,"ion-content")(5,"h3",2),i._uU(6),i.qZA(),i.TgZ(7,"div",3)(8,"div",4)(9,"ion-avatar",5),i._UZ(10,"ion-img",6),i.qZA()(),i.TgZ(11,"ion-title",7),i._uU(12),i.qZA(),i.TgZ(13,"div")(14,"ion-grid")(15,"ion-row")(16,"ion-col",8),i.NdJ("click",function(){return t.star("one")}),i._UZ(17,"ion-icon",9),i.qZA(),i.TgZ(18,"ion-col",10),i.NdJ("click",function(){return t.star("two")}),i._UZ(19,"ion-icon",9),i.qZA(),i.TgZ(20,"ion-col",10),i.NdJ("click",function(){return t.star("three")}),i._UZ(21,"ion-icon",9),i.qZA(),i.TgZ(22,"ion-col",10),i.NdJ("click",function(){return t.star("four")}),i._UZ(23,"ion-icon",9),i.qZA(),i.TgZ(24,"ion-col",10),i.NdJ("click",function(){return t.star("five")}),i._UZ(25,"ion-icon",9),i.qZA()()()(),i.TgZ(26,"h4"),i._uU(27,"Opini\xf3n"),i.qZA(),i.TgZ(28,"ion-textarea",11),i.NdJ("ngModelChange",function(m){return t.opinion=m}),i.qZA()()(),i.TgZ(29,"ion-footer")(30,"div",12)(31,"ion-button",13),i.NdJ("click",function(){return t.dismiss()}),i._uU(32,"Cancelar"),i.qZA(),i.TgZ(33,"ion-button",14),i.NdJ("click",function(){return t.scoreIt()}),i._uU(34,"Calificar"),i.qZA()()()),2&r&&(i.xp6(6),i.hij("ORDEN #",t.order.id,""),i.xp6(4),i.Q6J("src",t.driver.photo_driver?t.driver.photo_driver:"assets/imgs/avatar.svg"),i.xp6(2),i.Oqu(t.driver.driver_name),i.xp6(5),i.Q6J("name",t.qualification.one?"star":"star-outline")("ngClass",i.VKq(14,n,t.qualification.one)),i.xp6(2),i.Q6J("name",t.qualification.two?"star":"star-outline")("ngClass",i.VKq(16,n,t.qualification.two)),i.xp6(2),i.Q6J("name",t.qualification.three?"star":"star-outline")("ngClass",i.VKq(18,n,t.qualification.three)),i.xp6(2),i.Q6J("name",t.qualification.four?"star":"star-outline")("ngClass",i.VKq(20,n,t.qualification.four)),i.xp6(2),i.Q6J("name",t.qualification.five?"star":"star-outline")("ngClass",i.VKq(22,n,t.qualification.five)),i.xp6(3),i.Q6J("ngModel",t.opinion))},dependencies:[s.mk,e.JJ,e.On,a.BJ,a.YG,a.wI,a.W2,a.fr,a.jY,a.Gu,a.gu,a.Xz,a.Nd,a.g2,a.sr,a.wd,a.j9],styles:[".yellow[_ngcontent-%COMP%]{color:#ff0!important}"]}),c})()},8337:(p,h,o)=>{o.d(h,{Y:()=>_});var f=o(655),i=o(5e3),g=o(1892);let _=(()=>{class u{constructor(s){this.ui=s}response(s,e){return(0,f.mG)(this,void 0,void 0,function*(){if(s.error){if(s.error.messages)return void(yield this.ui.presentAlert({mode:"ios",header:s.error.messages[0],buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:a=>{e&&e.method&&"function"==typeof e.method&&e.method()}}]}));if(s.error.message)return void(yield this.ui.presentAlert({mode:"ios",header:s.error.message,buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:a=>{e&&e.method&&"function"==typeof e.method&&e.method()}}]}))}0==s.status?(e?e.message||(e.message="No se ha podido mostrar la informaci\xf3n"):e={message:"No se ha podido mostrar la informaci\xf3n"},yield this.ui.presentAlert({mode:"ios",header:e.message,message:"Esto se presenta cuando su conexi\xf3n es lenta o inexistente",buttons:[{text:"Aceptar",cssClass:"secondary",handler:a=>{e&&e.methodReload&&"function"==typeof e.methodReload&&e.methodReload(),e&&e.method&&"function"==typeof e.method&&e.method()}}]})):500==s.status&&(yield this.ui.presentAlert({mode:"ios",header:"Ha ocurrido un eror en el servidor",message:"",buttons:[{text:"Aceptar",cssClass:"secondary",handler:a=>{}}]})),s.message&&"Timeout has occurred"==s.message&&(yield this.ui.presentAlert({mode:"ios",header:"Esta operaci\xf3n ha demorado demasiado tiempo",message:"Por favor, revise su conexi\xf3n ",buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:a=>{e&&e.method&&"function"==typeof e.method&&e.method(),e&&e.methodReload&&"function"==typeof e.methodReload&&e.methodReload()}}]}))})}}return u.\u0275fac=function(s){return new(s||u)(i.LFG(g.F))},u.\u0275prov=i.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),u})()}}]);