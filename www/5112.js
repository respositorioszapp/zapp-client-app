"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5112,8337,3039,4094,8647,8179],{6090:(P,b,r)=>{r.d(b,{b:()=>v});const v=(0,r(7423).fo)("Geolocation",{web:()=>r.e(4561).then(r.bind(r,4561)).then(h=>new h.GeolocationWeb)})},5112:(P,b,r)=>{r.d(b,{s:()=>O});var l=r(655),v=r(6090),h=r(4182),e=r(5e3),_=r(1892),x=r(7556),c=r(8337),s=r(1335),f=r(9808),p=r(9928);function M(n,g){if(1&n){const t=e.EpF();e.TgZ(0,"ion-input",15,16),e.NdJ("keydown",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.focus())})("ionBlur",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.blur())})("keyup",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.search())}),e.qZA()}}function w(n,g){1&n&&(e.TgZ(0,"div",17)(1,"ion-item")(2,"p",18)(3,"ion-label",19),e._uU(4,"Puede marcar una direcci\xf3n con el icono ("),e._UZ(5,"ion-icon",20),e._uU(6,")"),e.qZA(),e.TgZ(7,"ion-label",21),e._uU(8,"para que pueda guardar en tus direcciones favoritas"),e.qZA()()()())}function A(n,g){if(1&n){const t=e.EpF();e.TgZ(0,"ion-button",27),e.NdJ("click",function(){e.CHM(t);const a=e.oxw().$implicit,i=e.oxw(2);return e.KtG(i.saveFavoriteAddress(a))}),e._UZ(1,"ion-icon",20),e.qZA()}}function E(n,g){1&n&&(e.TgZ(0,"ion-button",28),e._UZ(1,"ion-icon",29),e.qZA())}function k(n,g){if(1&n){const t=e.EpF();e.TgZ(0,"div",17)(1,"ion-item"),e._UZ(2,"ion-icon",23),e.TgZ(3,"ion-label",24),e.NdJ("click",function(){const i=e.CHM(t).$implicit,u=e.oxw(2);return e.KtG(u.selectAddress(i))}),e._uU(4),e.qZA(),e.YNc(5,A,2,0,"ion-button",25),e.YNc(6,E,2,0,"ion-button",26),e.qZA()()}if(2&n){const t=g.$implicit;e.xp6(4),e.Oqu(t.description),e.xp6(1),e.Q6J("ngIf",!t.favorite),e.xp6(1),e.Q6J("ngIf",t.favorite)}}function T(n,g){if(1&n&&(e.ynx(0),e.YNc(1,k,7,3,"div",22),e.BQk()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngForOf",t.results)}}function C(n,g){if(1&n){const t=e.EpF();e.TgZ(0,"ion-button",30),e.NdJ("click",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.selectMyLocation())}),e._UZ(1,"ion-icon",31),e.TgZ(2,"ion-label"),e._uU(3,"Usar mi ubicaci\xf3n"),e.qZA()()}}function L(n,g){if(1&n){const t=e.EpF();e.TgZ(0,"ion-button",32),e.NdJ("click",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.save())}),e._uU(1," Guardar"),e.qZA()}}let O=(()=>{class n{constructor(t,o,a,i){this.ui=t,this.auth=o,this.error=a,this.request=i,this.map_data=new h.cw({address:new h.NI("",[h.kI.required,h.kI.email])}),this.az_arr=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],this.distance="",this.duration="",this.details=[],this.title="",this.lat=null,this.lng=null,this.searchText="",this.results=[],this.quotation={},this.address_selected={},this.inputFocus=!1}ngOnInit(){this.disable||(this.disable=!1),console.log("Disable",this.disable),localStorage.getItem("quotation")&&(this.quotation=JSON.parse(localStorage.getItem("quotation")),console.log("Quotation",this.quotation)),this.loadMap()}ionViewWillEnter(){this.inputFocus=!0}focus(){console.log("Focus"),this.inputFocus=!0}blur(){console.log("Blur")}loadMap(){return(0,l.mG)(this,void 0,void 0,function*(){const t=yield this.ui.loading("Por favor espere...");let o=new google.maps.LatLng(this.latitude,this.longitude);new google.maps.InfoWindow,this.map=new google.maps.Map(document.getElementById("mapMap"),{zoom:16,center:o,rotateControl:!1,mapTypeControl:!1,fullscreenControl:!1,streetViewControl:!1,mapTypeId:google.maps.MapTypeId.ROADMAP,zoomControl:!1});var i=this;i.marker=new google.maps.Marker({map:i.map,position:o,draggable:!0,animation:google.maps.Animation.DROP,icon:"assets/imgs/markers/"+i.icon}),i.marker.setMap(i.map),this.disable||(i.marker.addListener("dragend",y=>{i.lat=this.marker.getPosition().lat(),i.lng=this.marker.getPosition().lng(),console.log(this.lat,this.lng),i.findPlace(new google.maps.LatLng(this.lat,this.lng),!0)}),document.getElementById("searchbar")),this.info_window=new google.maps.InfoWindow;let m="Escriba una direcci\xf3n o mueva el marcador";this.address&&(m=this.address),this.info_window.setContent(m),this.info_window.open(this.map,this.marker),this.map.addListener("idle",function(y){return(0,l.mG)(this,void 0,void 0,function*(){(yield t).dismiss()})})})}selectMyLocation(){return(0,l.mG)(this,void 0,void 0,function*(){try{const t=yield v.b.getCurrentPosition();console.log("Position",t.coords),this.lat=t.coords.latitude,this.lng=t.coords.longitude,console.log("Latitude",this.lat),console.log("Longitude",this.lng);const o=new google.maps.LatLng(t.coords.latitude,t.coords.longitude);this.marker.setMap(null),this.map.panTo(new google.maps.LatLng(t.coords.latitude,t.coords.longitude)),this.marker=new google.maps.Marker({map:this.map,position:o,draggable:!0,animation:google.maps.Animation.DROP,icon:"assets/imgs/markers/"+this.icon}),this.marker.setMap(this.map),this.findPlace(new google.maps.LatLng(t.coords.latitude,t.coords.longitude),!1)}catch(t){}})}search(){const t=this.map_data.value.address;if(t){const a=new google.maps.places.AutocompleteService;var o=this;a.getPlacePredictions({input:t,componentRestrictions:{country:"CO"}},(i,u)=>{if(u==google.maps.places.PlacesServiceStatus.OK){if(null!=this.auth.user){this.auth.user.customer_addresses||(this.auth.user.customer_addresses=[]);let d=this.auth.user.customer_addresses.filter((m,y)=>m.address.toLowerCase().includes(this.address.toLowerCase())||m.name_shortcut.toLowerCase().includes(this.address.toLowerCase()));console.log("Direcciones favoritas",d);for(let m=0;m<d.length;m++)i.unshift({description:d[m].address,latitude:d[m].latitude,longitude:d[m].longitude,favorite:!0})}console.log("Predictions",i),o.results=i}else this.results=[{description:"No hay resultados"}]})}else this.results=[]}selectAddress(t){return(0,l.mG)(this,void 0,void 0,function*(){this.searchText=t.description,this.address=t.description,this.address_selected=t,this.results=[],this.findAddress(t.description),this.inputFocus=!1})}findAddressFavorite(t){return(0,l.mG)(this,void 0,void 0,function*(){const o=yield this.ui.loading("Por favor espere...");let a=new google.maps.Geocoder;return new Promise(i=>{a.geocode({address:t},(u,d)=>(0,l.mG)(this,void 0,void 0,function*(){if((yield o).dismiss(),d!=google.maps.GeocoderStatus.OK)i({});else{console.log("Address results",u[0]);const m=u[0].geometry.location.lat(),y=u[0].geometry.location.lng();i({latitude:m,longitude:y})}}))})})}findAddress(t){return(0,l.mG)(this,void 0,void 0,function*(){const o=yield this.ui.loading("Por favor espere...");(new google.maps.Geocoder).geocode({address:t},(i,u)=>(0,l.mG)(this,void 0,void 0,function*(){if((yield o).dismiss(),u==google.maps.GeocoderStatus.OK){console.log("Address results",i[0]),this.lat=i[0].geometry.location.lat(),this.lng=i[0].geometry.location.lng(),console.log(this.lat,this.lng);const d=new google.maps.LatLng(this.lat,this.lng);this.map.panTo(d),this.marker.setMap(null),this.marker=new google.maps.Marker({map:this.map,position:d,draggable:!0,animation:google.maps.Animation.DROP,icon:"assets/imgs/markers/"+this.icon}),this.marker.setMap(this.map),this.info_window.setContent(i[0].formatted_address),this.info_window.open(this.map,this.marker),this.address=i[0].formatted_address,this.map_data.patchValue({address:i[0].formatted_address}),this.marker.addListener("dragend",m=>{this.lat=this.marker.getPosition().lat(),this.lng=this.marker.getPosition().lng(),console.log(this.lat,this.lng),this.findPlace(new google.maps.LatLng(this.lat,this.lng),!1)})}}))})}findPlace(t,o){return(0,l.mG)(this,void 0,void 0,function*(){let a=new google.maps.Geocoder;o&&(this.marker.setMap(null),this.marker=new google.maps.Marker({map:this.map,position:t,draggable:!0,animation:google.maps.Animation.DROP,icon:"assets/imgs/markers/"+this.icon}),this.marker.setMap(this.map),this.marker.addListener("dragend",i=>{this.lat=this.marker.getPosition().lat(),this.lng=this.marker.getPosition().lng(),console.log(this.lat,this.lng),this.findPlace(new google.maps.LatLng(this.lat,this.lng),!1)})),a.geocode({latLng:t},(i,u)=>(0,l.mG)(this,void 0,void 0,function*(){u==google.maps.GeocoderStatus.OK?(console.log(i[0]),console.log("Este es el find place"),this.info_window.setContent(i[0].formatted_address),this.info_window.open(this.map,this.marker),this.map_data.patchValue({address:i[0].formatted_address}),this.address=i[0].formatted_address):yield this.ui.presentAlert({mode:"ios",header:"No se ha podido mostrar la informaci\xf3n",buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:d=>{}}]})}))})}save(){var t=document.getElementById("searchbar");console.log(t.value),""!=this.aTrim(t.value)&&this.lat&&this.lng?(localStorage.setItem("address_item",JSON.stringify({lat:this.lat,lng:this.lng,address:t.value,favorite:this.address_selected.favorite})),this.dismiss()):this.ui.showToast("Introduzca una ubicaci\xf3n o mueva el marcador")}saveFavoriteAddress(t){return(0,l.mG)(this,void 0,void 0,function*(){if(t&&!t.favorite){const o=yield this.findAddressFavorite(t.description);if(Object.keys(o).length<=0)return void(yield this.ui.presentAlert({mode:"ios",header:"Lo sentimos",message:"No se encontr\xf3 la ubicaci\xf3n",buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:a=>(0,l.mG)(this,void 0,void 0,function*(){})}]}));t.description&&o.latitude&&o.longitude?yield this.ui.presentAlert({mode:"ios",header:"Seleccionar esta direcci\xf3n como favorita ",inputs:[{name:"name_shorcut",id:"name_shorcut",type:"text",placeholder:"Nombre de alias",mode:"ios"},{name:"description",id:"description",type:"textarea",placeholder:"Descripci\xf3n",mode:"ios"}],buttons:[{text:"Registar",cssClass:"secondary",handler:a=>(0,l.mG)(this,void 0,void 0,function*(){const i={customer_id:this.auth.user.id,address:t.description,latitude:o.latitude,longitude:o.longitude,name_shortcut:a.name_shorcut,description:a.description},u=yield this.ui.loading("Por favor espere...");this.request.post("customer/add_favourite_address",i).subscribe(d=>(0,l.mG)(this,void 0,void 0,function*(){(yield u).dismiss(),console.log("Res ",d),t.favorite=!0,this.auth.user.customer_addresses||(this.auth.user.customer_addresses=[]),this.auth.user.customer_addresses.push(i),this.auth.setUser(this.auth.user)}),d=>(0,l.mG)(this,void 0,void 0,function*(){console.log("Err ",d),(yield u).dismiss(),this.error.response(d)}))})}]}):t.description||(yield this.ui.presentAlert({mode:"ios",header:"Seleccione una direcci\xf3n",buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:a=>{}}]}))}})}aTrim(t){return t.replace(/\s/g,"")}dismiss(){this.ui.dismiss()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(_.F),e.Y36(x.e),e.Y36(c.Y),e.Y36(s.s))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-map"]],inputs:{city:"city",latitude:"latitude",longitude:"longitude",index:"index",icon:"icon",disable:"disable",address:"address"},decls:18,vars:7,consts:[["color","primary",2,"position","relative"],[2,"position","absolute","left","5px","bottom","14px"],[2,"position","absolute","right","5px","bottom","5px",3,"click"],["slot","icon-only","name","close-outline"],[2,"position","relative"],[2,"width","80%","position","fixed","top","80px","left","0","right","0","margin","auto","z-index","200000"],[3,"formGroup"],["class","inputSearch","type","text","placeholder","Escribe una direcci\xf3n","formControlName","address","autocomplete","off","id","searchbar",3,"keydown","ionBlur","keyup",4,"ngIf"],[2,"position","absolute","top","60px","left","0","right","0","margin","auto","width","80%","z-index","100000","max-height","300px","overflow","scroll"],["class","serach_results",4,"ngIf"],[4,"ngIf"],["id","mapMap",2,"width","100%","height","100%"],["map",""],["class","ion-margin-top","style","font-weight: bold;\n    margin: auto;\n    width: 80%;\n    position: absolute;\n    bottom: 60px;\n    left: 0;\n    right: 0;\n    font-size: 1.2em;","color","primary","expand","block",3,"click",4,"ngIf"],["class","ion-margin-top","style","margin: auto;width: 80%;position: absolute;bottom: 10px;left: 0;right: 0;","color","primary","expand","block",3,"click",4,"ngIf"],["type","text","placeholder","Escribe una direcci\xf3n","formControlName","address","autocomplete","off","id","searchbar",1,"inputSearch",3,"keydown","ionBlur","keyup"],["searchbar",""],[1,"serach_results"],[2,"max-width","300px","text-align","center","font-size","small","margin","10px 0","color","#a7a7a7"],[2,"text-align","center","white-space","initial","max-width","100%"],["name","star","color","primary"],[2,"white-space","break-spaces"],["class","serach_results",4,"ngFor","ngForOf"],["name","location","color","primary"],[2,"font-size","0.8em",3,"click"],["size","small","fill","clear",3,"click",4,"ngIf"],["size","small","fill","clear","class","favoactive",4,"ngIf"],["size","small","fill","clear",3,"click"],["size","small","fill","clear",1,"favoactive"],["name","star"],["color","primary","expand","block",1,"ion-margin-top",2,"font-weight","bold","margin","auto","width","80%","position","absolute","bottom","60px","left","0","right","0","font-size","1.2em",3,"click"],["name","location-icon"],["color","primary","expand","block",1,"ion-margin-top",2,"margin","auto","width","80%","position","absolute","bottom","10px","left","0","right","0",3,"click"]],template:function(t,o){1&t&&(e.TgZ(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-title",1),e._uU(3),e.qZA(),e.TgZ(4,"ion-button",2),e.NdJ("click",function(){return o.dismiss()}),e._UZ(5,"ion-icon",3),e.qZA()()(),e.TgZ(6,"ion-content")(7,"div",4)(8,"div",5)(9,"form",6),e.YNc(10,M,2,0,"ion-input",7),e.qZA()(),e.TgZ(11,"div",8),e.YNc(12,w,9,0,"div",9),e.YNc(13,T,2,1,"ng-container",10),e.qZA()(),e._UZ(14,"div",11,12),e.YNc(16,C,4,0,"ion-button",13),e.YNc(17,L,2,0,"ion-button",14),e.qZA()),2&t&&(e.xp6(3),e.hij("",o.city," "),e.xp6(6),e.Q6J("formGroup",o.map_data),e.xp6(1),e.Q6J("ngIf",!o.disable),e.xp6(2),e.Q6J("ngIf",o.results.length>0&&o.inputFocus),e.xp6(1),e.Q6J("ngIf",o.results.length>0&&o.inputFocus),e.xp6(3),e.Q6J("ngIf",!o.disable),e.xp6(1),e.Q6J("ngIf",!o.disable))},dependencies:[f.sg,f.O5,h._Y,h.JJ,h.JL,h.sg,h.u,p.YG,p.W2,p.Gu,p.gu,p.pK,p.Ie,p.Q$,p.sr,p.wd,p.j9],styles:[".inputSearch[_ngcontent-%COMP%]{display:block;width:100%;background-color:#fff;padding:8px I!important;border:.5px solid #49158c;border-radius:20px;outline:none!important}"]}),n})()},8337:(P,b,r)=>{r.d(b,{Y:()=>e});var l=r(655),v=r(5e3),h=r(1892);let e=(()=>{class _{constructor(c){this.ui=c}response(c,s){return(0,l.mG)(this,void 0,void 0,function*(){if(c.error){if(c.error.messages)return void(yield this.ui.presentAlert({mode:"ios",header:c.error.messages[0],buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:f=>{s&&s.method&&"function"==typeof s.method&&s.method()}}]}));if(c.error.message)return void(yield this.ui.presentAlert({mode:"ios",header:c.error.message,buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:f=>{s&&s.method&&"function"==typeof s.method&&s.method()}}]}))}0==c.status?(s?s.message||(s.message="No se ha podido mostrar la informaci\xf3n"):s={message:"No se ha podido mostrar la informaci\xf3n"},yield this.ui.presentAlert({mode:"ios",header:s.message,message:"Esto se presenta cuando su conexi\xf3n es lenta o inexistente",buttons:[{text:"Aceptar",cssClass:"secondary",handler:f=>{s&&s.methodReload&&"function"==typeof s.methodReload&&s.methodReload(),s&&s.method&&"function"==typeof s.method&&s.method()}}]})):500==c.status&&(yield this.ui.presentAlert({mode:"ios",header:"Ha ocurrido un eror en el servidor",message:"",buttons:[{text:"Aceptar",cssClass:"secondary",handler:f=>{}}]})),c.message&&"Timeout has occurred"==c.message&&(yield this.ui.presentAlert({mode:"ios",header:"Esta operaci\xf3n ha demorado demasiado tiempo",message:"Por favor, revise su conexi\xf3n ",buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:f=>{s&&s.method&&"function"==typeof s.method&&s.method(),s&&s.methodReload&&"function"==typeof s.methodReload&&s.methodReload()}}]}))})}}return _.\u0275fac=function(c){return new(c||_)(v.LFG(h.F))},_.\u0275prov=v.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"}),_})()}}]);