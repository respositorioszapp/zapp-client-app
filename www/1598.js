"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1598,2680],{76:(x,u,e)=>{e.d(u,{GW:()=>m,dk:()=>g,oK:()=>l});var l=(()=>{return(o=l||(l={})).Prompt="PROMPT",o.Camera="CAMERA",o.Photos="PHOTOS",l;var o})(),m=(()=>{return(o=m||(m={})).Rear="REAR",o.Front="FRONT",m;var o})(),g=(()=>{return(o=g||(g={})).Uri="uri",o.Base64="base64",o.DataUrl="dataUrl",g;var o})()},1598:(x,u,e)=>{e.r(u),e.d(u,{EventsPageModule:()=>h});var l=e(9808),m=e(4182),g=e(9928),o=e(3769),t=e(7282),v=e(5e3);const P=[{path:"",component:t.s}];let y=(()=>{class s{}return s.\u0275fac=function(c){return new(c||s)},s.\u0275mod=v.oAB({type:s}),s.\u0275inj=v.cJS({imports:[o.Bz.forChild(P),o.Bz]}),s})(),h=(()=>{class s{}return s.\u0275fac=function(c){return new(c||s)},s.\u0275mod=v.oAB({type:s}),s.\u0275inj=v.cJS({imports:[l.ez,m.u5,g.Pc,y]}),s})()},7282:(x,u,e)=>{e.d(u,{s:()=>p});var l=e(655),m=e(7511),g=e(4182),o=e(9928),t=e(5e3),v=e(1892),P=e(2680),y=e(7556),h=e(1335),s=e(3769),n=e(9808);function c(a,f){if(1&a){const i=t.EpF();t.TgZ(0,"ion-img",12),t.NdJ("click",function(){t.CHM(i);const d=t.oxw().$implicit,T=t.oxw();return t.KtG(T.viewImage(d.photo))}),t.qZA()}if(2&a){const i=t.oxw().$implicit;t.Q6J("src",i.photo)}}function E(a,f){if(1&a&&(t.TgZ(0,"p",13)(1,"span",14),t._uU(2),t._UZ(3,"ion-icon",15),t.qZA()()),2&a){const i=t.oxw().$implicit;t.xp6(2),t.Oqu(i.description),t.xp6(1),t.Q6J("name",i.sending?"checkmark-done-outline":"checkmark-outline")}}function _(a,f){if(1&a&&(t.TgZ(0,"div",8),t.YNc(1,c,1,1,"ion-img",9),t.YNc(2,E,4,2,"p",10),t.TgZ(3,"p",11),t._uU(4),t.ALo(5,"date"),t.qZA()()),2&a){const i=f.$implicit;t.xp6(1),t.Q6J("ngIf",i.photo),t.xp6(1),t.Q6J("ngIf",i.description),t.xp6(2),t.hij(" ",t.xi3(5,3,i.created_at,"HH:MM"),"")}}let p=(()=>{class a{constructor(i,r,d,T,O,M){this.ui=i,this.photo=r,this.auth=d,this.request=T,this.fb=O,this.router=M,this.personal_information=this.fb.group({comment:["",g.kI.required]}),this.image={url:"assets/imgs/img-default.jpg",format:""},this.driver={driver_name:"No asignada"},this.events=[]}get controls(){return this.personal_information.controls}ionViewWillEnter(){return(0,l.mG)(this,void 0,void 0,function*(){console.log("Order",this.order);const i=yield this.ui.loading("Por favor espere...");if(3!=this.order.service_type_id){if(this.driver=this.order.drivers.length>0?this.order.drivers[0]:{driver_name:"No asignada"},this.order.status_order<24)return void(yield i).dismiss();this.request.get(`driver/events_in_order/${this.order.id}`).subscribe(r=>(0,l.mG)(this,void 0,void 0,function*(){(yield i).dismiss(),this.events=r.data,this.events=this.events.map(d=>Object.assign(Object.assign({},d),{sending:!0})),this.scrollToBottom()}),r=>(0,l.mG)(this,void 0,void 0,function*(){(yield i).dismiss(),yield this.ui.presentAlert({mode:"ios",header:"No se ha podido cargar las eventualidades",buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:d=>{this.dismiss()}}]}),console.log("Error",r)}))}else this.order.driver_assigned?(this.driver=this.order.driver_assigned,this.driver&&this.request.get(`driver/events_per_driver/${this.order.id}/${this.driver.driver_id}`).subscribe(r=>(0,l.mG)(this,void 0,void 0,function*(){(yield i).dismiss(),this.events=r.data,this.events=this.events.map(d=>Object.assign(Object.assign({},d),{sending:!0})),console.log("Events",r.data),this.scrollToBottom()}),r=>(0,l.mG)(this,void 0,void 0,function*(){(yield i).dismiss(),yield this.ui.presentAlert({mode:"ios",header:"No se ha podido cargar las eventualidades",buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:d=>{this.dismiss()}}]}),console.log("Error",r)}))):(yield i).dismiss()})}ngOnInit(){}scrollToBottom(){return(0,l.mG)(this,void 0,void 0,function*(){try{console.log("Scrolling..."),yield this.myContent.scrollToBottom(100)}catch(i){}})}viewImage(i){this.ui.presentModal(m.h,{image:i})}dismiss(){this.ui.dismiss()}}return a.\u0275fac=function(i){return new(i||a)(t.Y36(v.F),t.Y36(P.T),t.Y36(y.e),t.Y36(h.s),t.Y36(g.qu),t.Y36(s.F0))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-events"]],viewQuery:function(i,r){if(1&i&&t.Gf(o.W2,5,o.W2),2&i){let d;t.iGM(d=t.CRH())&&(r.myContent=d.first)}},inputs:{order:"order",longitude:"longitude",latitude:"latitude"},decls:11,vars:3,consts:[["color","primary","mode","ios",2,"position","relative"],["lines","none","color","primary"],[3,"click"],["slot","start","name","arrow-back-outline"],[2,"width","40px","height","40px"],[3,"src","click"],["forceOverscroll","true"],["style","text-align: right;float:right;clear: both;",4,"ngFor","ngForOf"],[2,"text-align","right","float","right","clear","both"],["alt","","style","width: 200px;\n    height: 100px;\n    margin-right: 10px;\n    float: right;\n    margin-bottom: 10px;",3,"src","click",4,"ngIf"],["style","margin-bottom: 5px;font-size: 1em;margin-right: 10px;",4,"ngIf"],[1,"grey-color-text",2,"margin-bottom","5px","font-size","1em","margin-right","10px","clear","both"],["alt","",2,"width","200px","height","100px","margin-right","10px","float","right","margin-bottom","10px",3,"src","click"],[2,"margin-bottom","5px","font-size","1em","margin-right","10px"],[2,"text-align","right","background","#49158c","padding","9px","border-radius","10px","color","white","display","block","width","max-content","float","right","max-width","300px"],[3,"name"]],template:function(i,r){1&i&&(t.TgZ(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-item",1)(3,"ion-button",2),t.NdJ("click",function(){return r.dismiss()}),t._UZ(4,"ion-icon",3),t.qZA(),t.TgZ(5,"ion-avatar",4)(6,"ion-img",5),t.NdJ("click",function(){return r.viewImage(r.driver.photo_driver)}),t.qZA()(),t.TgZ(7,"ion-title"),t._uU(8),t.qZA()()()(),t.TgZ(9,"ion-content",6),t.YNc(10,_,6,6,"div",7),t.qZA()),2&i&&(t.xp6(6),t.Q6J("src",null!=r.driver.photo_driver?r.driver.photo_driver:"assets/imgs/avatar.svg"),t.xp6(2),t.hij("",r.driver.driver_name," "),t.xp6(2),t.Q6J("ngForOf",r.events))},dependencies:[n.sg,n.O5,o.BJ,o.YG,o.W2,o.Gu,o.gu,o.Xz,o.Ie,o.sr,o.wd,n.uU]}),a})()},2680:(x,u,e)=>{e.d(u,{T:()=>y});var l=e(655),m=e(7423),g=e(76);const o=(0,m.fo)("Camera",{web:()=>e.e(3954).then(e.bind(e,3954)).then(h=>new h.CameraWeb)});var t=e(591),v=e(5e3),P=e(9928);let y=(()=>{class h{constructor(n){this.actionSheetCtrl=n,this.imageSubject=new t.X({})}takePicture(n){return(0,l.mG)(this,void 0,void 0,function*(){try{const c=yield o.getPhoto({quality:60,allowEditing:!1,correctOrientation:!0,promptLabelPhoto:"Elegir de la galer\xeda",promptLabelPicture:"Tomar foto",resultType:g.dk.DataUrl,source:n});this.imageSubject.next(c),this.imageSubject.complete(),this.imageSubject=new t.X({})}catch(c){console.log("Error",c),this.imageSubject.complete(),this.imageSubject=new t.X({})}})}selectImageSource(){return(0,l.mG)(this,void 0,void 0,function*(){const n=[{text:"Tomar foto",icon:"camera",handler:()=>{this.takePicture(g.oK.Camera)}},{text:"Elegir galeria",icon:"image",handler:()=>{this.takePicture(g.oK.Photos)}},{text:"Cancelar",icon:"close",role:"cancel",handler:()=>{this.imageSubject.complete(),this.imageSubject=new t.X({})}}];yield(yield this.actionSheetCtrl.create({mode:"ios",header:"Escoger",buttons:n})).present()})}dataUrlToBlob(n){const c=n.split(","),E=c[0].match(/:(.*?);/)[1],_=atob(c[1]);let p=_.length;const a=new Uint8Array(p);for(;p--;)a[p]=_.charCodeAt(p);return new Blob([a],{type:E})}getFileImage(n,c,E,_){const p=_?E:`image/${E}`;return new File([this.dataUrlToBlob(n)],c,{type:p})}}return h.\u0275fac=function(n){return new(n||h)(v.LFG(P.BX))},h.\u0275prov=v.Yz7({token:h,factory:h.\u0275fac,providedIn:"root"}),h})()}}]);