"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7581,2522,7628,8006],{2522:(u,l,r)=>{r.d(l,{v:()=>s});var g=r(5e3),d=r(9928);let s=(()=>{class c{constructor(){this.step=1,this.percent=0}ngOnInit(){console.log("Stepper ng oninit"),localStorage.getItem("step")&&(this.step=Number(localStorage.getItem("step")),this.percent=Number(this.step/8))}}return c.\u0275fac=function(t){return new(t||c)},c.\u0275cmp=g.Xpm({type:c,selectors:[["app-stepper"]],decls:1,vars:1,consts:[[2,"height","5px","--background","transparent","min-width","100%",3,"value"]],template:function(t,_){1&t&&g._UZ(0,"ion-progress-bar",0),2&t&&g.Q6J("value",_.percent)},dependencies:[d.X7],styles:[".stepper[_ngcontent-%COMP%]{margin:0;padding:30px 0 0;list-style:none;color:#dbdbdb;display:table;table-layout:fixed;width:100%;font-size:.8em}.stepper[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{display:table-cell;text-align:center;position:relative}.step-icon[_ngcontent-%COMP%]{background-color:#dce1f2!important;border-radius:50%;height:20px;width:20px;text-align:center;flex-shrink:0;position:relative;font-weight:500;color:#49158c;margin:0 auto}.step-icon-active[_ngcontent-%COMP%]{background-color:#49158c!important;color:#fff!important}.step-icon-content[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.step-horizontal-line[_ngcontent-%COMP%]{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin-bottom:10px;min-width:30px;border-top-color:#0000001f}"]}),c})()},7581:(u,l,r)=>{r.r(l),r.d(l,{TimeSummaryPageModule:()=>J});var g=r(9808),d=r(4182),s=r(9928),c=r(3769),m=r(655),t=r(5e3),_=r(1892),x=r(1335),f=r(7556),h=r(2522);function y(n,o){1&n&&t._UZ(0,"img",42)}function Z(n,o){1&n&&t._UZ(0,"img",43)}function v(n,o){1&n&&t._UZ(0,"img",44)}function T(n,o){1&n&&(t.TgZ(0,"ion-item",29),t._UZ(1,"img",45),t.TgZ(2,"p",36)(3,"span",46),t._uU(4,"Diligencia"),t.qZA()()())}function b(n,o){if(1&n&&(t.ynx(0),t.TgZ(1,"div",27)(2,"ion-list",28)(3,"ion-item",29),t._UZ(4,"img",30),t.TgZ(5,"div",31)(6,"span",32),t._uU(7,"Tipo de servicio:"),t.qZA(),t._uU(8),t.qZA()(),t.TgZ(9,"ion-item",29),t.YNc(10,y,1,0,"img",33),t.YNc(11,Z,1,0,"img",34),t.YNc(12,v,1,0,"img",35),t.TgZ(13,"p",36)(14,"span",32),t._uU(15,"Tipo de transporte:"),t.qZA(),t._uU(16),t.qZA()(),t.TgZ(17,"ion-item",29),t._UZ(18,"img",37),t.TgZ(19,"p",36)(20,"span",38),t._uU(21,"Ciudad:"),t.qZA(),t._uU(22),t.qZA()(),t.TgZ(23,"ion-item",29),t._UZ(24,"img",39),t.TgZ(25,"p",36)(26,"span",38),t._uU(27,"Tipo:"),t.qZA(),t._uU(28),t.qZA()(),t.TgZ(29,"ion-item",29),t._UZ(30,"img",40),t.TgZ(31,"p",36)(32,"span",38),t._uU(33,"Fecha:"),t.qZA(),t._uU(34),t.qZA()(),t.YNc(35,T,5,0,"ion-item",41),t.qZA()(),t.BQk()),2&n){const i=t.oxw(3);t.xp6(8),t.hij(" ",i.quotation.service_type," "),t.xp6(2),t.Q6J("ngIf","Motorizado"==i.quotation.transport_type),t.xp6(1),t.Q6J("ngIf","Carry"==i.quotation.transport_type),t.xp6(1),t.Q6J("ngIf","Autom\xf3vil"==i.quotation.transport_type),t.xp6(4),t.Oqu(i.quotation.transport_type),t.xp6(6),t.hij(" ",i.quotation.city," "),t.xp6(6),t.hij(" ",i.quotation.round_trip?"Ida y Vuelta":"Solo ida"," "),t.xp6(6),t.hij(" ",i.quotation.date," "),t.xp6(1),t.Q6J("ngIf",i.quotation.diligence)}}function q(n,o){if(1&n){const i=t.EpF();t.ynx(0),t.TgZ(1,"div")(2,"ion-item",24),t.NdJ("click",function(){t.CHM(i);const a=t.oxw().$implicit,p=t.oxw();return t.KtG(p.openExpansion(a))}),t.TgZ(3,"ion-label",25),t._uU(4,"Resumen"),t.qZA(),t._UZ(5,"ion-icon",26),t.qZA()(),t.YNc(6,b,36,9,"ng-container",23),t.BQk()}if(2&n){const i=t.oxw().$implicit;t.xp6(5),t.Q6J("name",i.open?"chevron-up-outline":"chevron-down-outline"),t.xp6(1),t.Q6J("ngIf",i.open)}}function U(n,o){if(1&n&&(t.TgZ(0,"ion-item",55)(1,"div",56),t._UZ(2,"img",57),t.qZA(),t.TgZ(3,"div",58)(4,"fieldset",59),t._uU(5),t.qZA()()()),2&n){const i=o.$implicit,e=o.index,a=t.oxw(5);t.xp6(2),t.Q6J("src","assets/imgs/markers/"+a.az_arr[e]+".png",t.LSH),t.xp6(3),t.hij(" ",i.address," ")}}function A(n,o){if(1&n&&(t.TgZ(0,"div",49),t._uU(1),t.TgZ(2,"div",50),t._uU(3," Direcciones: "),t.qZA(),t.TgZ(4,"ion-list",51),t.YNc(5,U,6,2,"ion-item",52),t.qZA(),t.TgZ(6,"ion-row")(7,"ion-col",53)(8,"div"),t._uU(9,"Hora de Inicio: "),t.TgZ(10,"span",54),t._uU(11),t.qZA()()(),t.TgZ(12,"ion-col",53)(13,"div"),t._uU(14,"Hora de fin: "),t.TgZ(15,"span",54),t._uU(16),t.qZA()()()()()),2&n){const i=o.$implicit;t.xp6(1),t.hij(" ",i.driver," "),t.xp6(4),t.Q6J("ngForOf",i.address_array),t.xp6(6),t.Oqu(i.start_time),t.xp6(5),t.hij("",i.departure_time," ")}}function w(n,o){if(1&n&&(t.ynx(0),t.TgZ(1,"div",47)(2,"div"),t.YNc(3,A,17,4,"div",48),t.qZA()(),t.BQk()),2&n){const i=t.oxw(3);t.xp6(3),t.Q6J("ngForOf",i.quotation.driver_count_array)}}function P(n,o){if(1&n){const i=t.EpF();t.ynx(0),t.TgZ(1,"div")(2,"ion-item",24),t.NdJ("click",function(){t.CHM(i);const a=t.oxw().$implicit,p=t.oxw();return t.KtG(p.openExpansion(a))}),t.TgZ(3,"ion-label",25),t._uU(4),t.qZA(),t._UZ(5,"ion-icon",26),t.qZA()(),t.YNc(6,w,4,1,"ng-container",23),t.BQk()}if(2&n){const i=t.oxw().$implicit,e=t.oxw();t.xp6(4),t.AsE("",e.quotation.transport_type,"(",e.quotation.driver_count,")"),t.xp6(1),t.Q6J("name",i.open?"chevron-up-outline":"chevron-down-outline"),t.xp6(1),t.Q6J("ngIf",i.open)}}function S(n,o){1&n&&(t.TgZ(0,"ion-item",62)(1,"div",63)(2,"span",64),t._uU(3,"Diligencia:"),t.qZA(),t._uU(4," $ 12.000 "),t.qZA()())}function k(n,o){if(1&n&&(t.ynx(0),t.TgZ(1,"div",60)(2,"ion-list",61)(3,"ion-item",62)(4,"div",63)(5,"span",64),t._uU(6,"Tarifa base:"),t.qZA(),t.TgZ(7,"ion-label",65),t._uU(8),t.qZA()()(),t.TgZ(9,"ion-item",62)(10,"div",63)(11,"span",64),t._uU(12,"Recargo por distancia:"),t.qZA(),t._uU(13),t.qZA()(),t.TgZ(14,"ion-item",62)(15,"div",63)(16,"span",64),t._uU(17,"Valor declarado:"),t.qZA(),t._uU(18," $ 0 "),t.qZA()(),t.TgZ(19,"ion-item",62)(20,"div",63)(21,"span",64),t._uU(22,"Periferias:"),t.qZA(),t._uU(23," $ 0 "),t.qZA()(),t.TgZ(24,"ion-item",62)(25,"div",63)(26,"span",64),t._uU(27,"Tiempo en espera:"),t.qZA(),t._uU(28," $ 0 "),t.qZA()(),t.TgZ(29,"ion-item",62)(30,"div",63)(31,"span",64),t._uU(32,"Otros:"),t.qZA(),t._uU(33," $ 0 "),t.qZA()(),t.YNc(34,S,5,0,"ion-item",66),t.qZA()(),t.BQk()),2&n){const i=t.oxw(3);t.xp6(8),t.Oqu("$ "+i.transform(i.price_per_transport_type[i.quotation.transport_type])),t.xp6(5),t.hij(" ","$ "+i.transform(i.kmadd_base_total)," "),t.xp6(21),t.Q6J("ngIf",i.quotation.diligence)}}function O(n,o){if(1&n){const i=t.EpF();t.ynx(0),t.TgZ(1,"div")(2,"ion-item",24),t.NdJ("click",function(){t.CHM(i);const a=t.oxw().$implicit,p=t.oxw();return t.KtG(p.openExpansion(a))}),t.TgZ(3,"ion-label",25),t._uU(4,"Valor servicio"),t.qZA(),t._UZ(5,"ion-icon",26),t.qZA()(),t.YNc(6,k,35,3,"ng-container",23),t.BQk()}if(2&n){const i=t.oxw().$implicit;t.xp6(5),t.Q6J("name",i.open?"chevron-up-outline":"chevron-down-outline"),t.xp6(1),t.Q6J("ngIf",i.open)}}function I(n,o){if(1&n&&(t.TgZ(0,"div",22),t.YNc(1,q,7,2,"ng-container",23),t.YNc(2,P,7,4,"ng-container",23),t.YNc(3,O,7,2,"ng-container",23),t.qZA()),2&n){const i=o.$implicit;t.xp6(1),t.Q6J("ngIf",1==i.index),t.xp6(1),t.Q6J("ngIf",2==i.index),t.xp6(1),t.Q6J("ngIf",3==i.index)}}const z=[{path:"",component:(()=>{class n{constructor(i,e,a,p){this.ui=i,this.request=e,this.router=a,this.auth=p,this.loading=!1,this.quotation={total:0},this.address_arr=[{address:"",description:"",latitude:"",longitude:"",hover:!1},{address:"",description:"",latitude:"",longitude:"",hover:!1}],this.az_arr=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],this.total=0,this.kmadd_base_total=0,this.neighboring=0,this.rate_base=5300,this.kmadd_base=1035,this.neighboring_base=0,this.distance=0,this.duration=0,this.price_per_transport_type={},this.taxes={},this.items=[{index:1,open:!1},{index:2,open:!1},{index:3,open:!1}]}ngOnInit(){localStorage.setItem("step","7")}hideCart(){this.auth.person.hide_cart=!0,this.auth.setPerson(this.auth.person)}ionViewWillEnter(){return(0,m.mG)(this,void 0,void 0,function*(){localStorage.setItem("step","7"),this.hideCart();const i=yield this.ui.loading("Por favor espere...");this.request.get("list/attributes?parameter_id=2").subscribe(e=>(0,m.mG)(this,void 0,void 0,function*(){(yield i).dismiss(),e.data.map(a=>{this.price_per_transport_type[a.name]=a.value}),this.openExpansion(this.items[0])}),e=>(0,m.mG)(this,void 0,void 0,function*(){(yield i).dismiss()})),localStorage.getItem("quotation")&&(this.quotation=JSON.parse(localStorage.getItem("quotation")))})}payment(){const{transport_type:i}=this.quotation;this.quotation.rate_base=this.price_per_transport_type[i],this.quotation.kmadd_base_total=0,localStorage.setItem("quotation",JSON.stringify(this.quotation)),this.router.navigate(["/tabs/select-payment"])}openExpansion(i){console.log("Open",i),this.items.forEach(e=>{e.index!=i.index&&(e.open=!1)}),i.open=!i.open}transform(i){return i?i.toString().replace(/\B(?=(\d{3})+(?!\d))/g,"."):"0"}getTotal(){const{transport_type:i,number_hour:e,driver_count:a}=this.quotation;return e*this.price_per_transport_type[i]*a}getTime(){const{number_hour:i,driver_count:e}=this.quotation;return i*e}}return n.\u0275fac=function(i){return new(i||n)(t.Y36(_.F),t.Y36(x.s),t.Y36(c.F0),t.Y36(f.e))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-time-summary"]],decls:37,vars:5,consts:[[1,"col-5",2,"margin-top","3px"],[1,"son-container"],[1,"row","justify-content-center","ion-text-center"],[1,"col-md-11","col-lg-10","col-xl-8"],[2,"background","#eeeeee","color","gray","/* padding-right","90px","*/\n    /* padding-left","90px","*/\n    padding","0 16px","border-radius","30px","font-size","1.2em","display","block","width","100%","text-align","inherit","margin","8px auto 6px auto"],[2,"width","80%"],[1,"row","justify-content-center"],[1,"col-md-4","col-xs-12","justify-content-center",2,"color","#4992e7","font-family","Gilroy-ExtraBold","font-size","19px","text-align","center","width","33.33333%"],["src","assets/imgs/pay-icon.png",1,"summary-icon"],[1,"col-md-4","col-xs-12","justify-content-center",2,"color","#f5a448","font-family","Gilroy-ExtraBold","font-size","19px","text-align","center","width","33.33333%"],["src","assets/imgs/kmsn-icon.png",1,"summary-icon"],[1,"col-md-4","col-xs-12","justify-content-center",2,"color","#6cc286","font-family","Gilroy-ExtraBold","font-size","19px","text-align","center","width","33.33333%"],["src","assets/imgs/timen-icon.png",1,"summary-icon"],["style","width: 90%;margin: auto;padding: 10px;",4,"ngFor","ngForOf"],["mat-line","",2,"text-align","right","background-color","#48158e","color","white","font-size","15px","border-radius","14px","padding","7px","width","90%","margin","auto","font-family","Gilroy-Light"],[2,"float","left","font-size","15px","font-family","Gilroy-Light"],[1,"col-md-11","col-lg-10","col-xl-8","m-auto",2,"margin","auto"],["mode","ios","fill","outline","routerLink","/tabs/select-time"],["slot","start","name","chevron-back-outline"],["name","arrow-left"],["mode","ios",3,"click"],["slot","end","name","chevron-forward-outline"],[2,"width","90%","margin","auto","padding","10px"],[4,"ngIf"],["lines","none",2,"border","3px solid #49158c","border-radius","40px","text-align","center","font-size","1.3em",3,"click"],[1,"ion-text-center"],[3,"name"],[1,"col-md-10","col-xs-10",2,"background","#f2f2f2","/* border","0.5px solid red","*/\n    border-radius","20px","/* border-radius","15px 0px 0px 15px","*/\n    /* box-shadow","5px 5px 5px 5px #888","*/\n    width","100%","margin","auto"],[2,"text-align","left !important","font-size","22px !important","background","#f2f2f2","border-radius","20px"],["lines","none",2,"padding","10px","--background","#f2f2f2","height","40px"],["src","assets/imgs/typeservice-icon.png",2,"width","30px","height","30px","margin-right","10px"],["mat-line","",2,"font-size","0.9em","font-family","Gilroy-Light","text-align","right","width","90%"],[2,"float","left","color","#49158a","font-size","0.9em","font-family","Gilroy-ExtraBold"],["src","assets/imgs/motorizado-icon.png","style","    width: 30px;\n                   height: 30px;\n                   margin-right: 10px;",4,"ngIf"],["src","assets/imgs/carrysm-icon.png","style","    width: 30px;\n                   height: 30px;\n                   margin-right: 10px;",4,"ngIf"],["src","assets/imgs/carro-icon.png","style","    width: 30px;\n                   height: 30px;\n                   margin-right: 10px;",4,"ngIf"],[2,"text-align","right","width","90%"],["src","assets/imgs/city-icon.png",2,"width","30px","height","30px","margin-right","10px"],[2,"color","#49158a","font-size","0.9em","font-family","Gilroy-ExtraBold","float","left"],["src","assets/imgs/type-icon.png",2,"width","40px","height","40px"],["src","assets/imgs/date-con.png",2,"width","30px","height","30px","margin-right","10px"],["lines","none","style","padding: 10px;--background: #f2f2f2;height: 40px;",4,"ngIf"],["src","assets/imgs/motorizado-icon.png",2,"width","30px","height","30px","margin-right","10px"],["src","assets/imgs/carrysm-icon.png",2,"width","30px","height","30px","margin-right","10px"],["src","assets/imgs/carro-icon.png",2,"width","30px","height","30px","margin-right","10px"],["src","assets/imgs/type-icon.png",2,"width","30px","height","30px","margin-right","10px"],[2,"color","#49158a","font-size","0.9em","font-family","Gilroy-ExtraBold"],[1,"col-md-5","col-xs-5",2,"background","#f2f2f2","background","#f2f2f2","/* border","0.5px solid red","*/\n    border-radius","20px","/* border-radius","15px 0px 0px 15px","*/\n    /* box-shadow","5px 5px 5px 5px #888","*/\n    width","100%","margin","auto","max-height","200px","overflow-y","scroll"],["style","margin-bottom: 18px;\n                  margin-top: 15px;font-family: Gilroy-ExtraBold;color: #49158a;text-align: center;",4,"ngFor","ngForOf"],[2,"margin-bottom","18px","margin-top","15px","font-family","Gilroy-ExtraBold","color","#49158a","text-align","center"],[2,"text-align","left !important","margin-left","24px"],[2,"text-align","left !important","background","#f2f2f2"],["style","\n                      margin-bottom: 24px;--background: #f2f2f2;","lines","none",4,"ngFor","ngForOf"],["size","6"],[2,"font-family","Gilroy-Light","font-size","16px","font-weight","bold"],["lines","none",2,"margin-bottom","24px","--background","#f2f2f2"],[1,"address-btn","text-center"],[2,"width","40px","height","40px",3,"src"],["mat-line",""],[2,"border-radius","12px","border-color","#dfdfdf","width","90%","font-size","0.75em"],[1,"col-md-10","col-xs-10",2,"background","#f2f2f2","/* height","29%","*/\n             width","100%","border-radius","20px"],[2,"text-align","left !important","background","#f2f2f2","border-radius","20px"],["lines","none",2,"--background","#f2f2f2","height","30px","padding","5px !important","/* min-height","50px","*/\n                font-size","0.9em"],["mat-line","",2,"text-align","right","font-size","1.1em","font-family","Gilroy-Light","height","40px","width","100%"],[2,"float","left","color","#49158a","font-size","0.9em","font-family","Gilroy-Light"],["slot","end"],["lines","none","style","    --background: #f2f2f2;\n                height: 30px;\n                padding: 5px !important;\n                /* min-height: 50px; */\n                font-size: 0.9em;",4,"ngIf"]],template:function(i,e){1&i&&(t.TgZ(0,"div",0),t._UZ(1,"app-stepper"),t.qZA(),t.TgZ(2,"ion-content")(3,"div",1)(4,"div",2)(5,"div",3)(6,"span",4),t._uU(7,"Resumen del servicio"),t.qZA()(),t.TgZ(8,"div",5)(9,"div",6)(10,"div",7),t._UZ(11,"img",8)(12,"br"),t._uU(13),t.qZA(),t.TgZ(14,"div",9),t._UZ(15,"img",10)(16,"br"),t._uU(17),t.qZA(),t.TgZ(18,"div",11),t._UZ(19,"img",12)(20,"br"),t._uU(21),t.qZA()()(),t.YNc(22,I,4,3,"div",13),t.qZA()()(),t.TgZ(23,"div",14)(24,"span",15)(25,"strong"),t._uU(26,"Total:"),t.qZA()(),t.TgZ(27,"strong"),t._uU(28),t.qZA()(),t.TgZ(29,"div",16)(30,"ion-button",17),t._UZ(31,"ion-icon",18)(32,"ion-icon",19),t._uU(33," Atr\xe1s "),t.qZA(),t.TgZ(34,"ion-button",20),t.NdJ("click",function(){return e.payment()}),t._UZ(35,"ion-icon",21),t._uU(36," Pagar "),t.qZA()()),2&i&&(t.xp6(13),t.hij(" ","$ "+e.transform(e.quotation?e.quotation.total:0)," "),t.xp6(4),t.hij(" ",e.quotation.distance," KM "),t.xp6(4),t.hij(" ",e.quotation.duration," HORAS "),t.xp6(1),t.Q6J("ngForOf",e.items),t.xp6(6),t.hij(" ","$ "+e.transform(e.quotation.total),""))},dependencies:[g.sg,g.O5,s.YG,s.wI,s.W2,s.gu,s.Ie,s.Q$,s.q_,s.Nd,s.YI,h.v,c.rH],styles:["span[_ngcontent-%COMP%]{margin-right:10px}ion-list[_ngcontent-%COMP%], ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{padding:0!important}ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:40px!important}"]}),n})()}];let C=(()=>{class n{}return n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[c.Bz.forChild(z),c.Bz]}),n})();var M=r(8412);let J=(()=>{class n{}return n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[g.ez,d.u5,s.Pc,M.j,C]}),n})()}}]);