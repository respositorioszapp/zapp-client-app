"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[524,2522,7628,8006],{2522:(v,u,n)=>{n.d(u,{v:()=>a});var p=n(5e3),d=n(9928);let a=(()=>{class r{constructor(){this.step=1,this.percent=0}ngOnInit(){console.log("Stepper ng oninit"),localStorage.getItem("step")&&(this.step=Number(localStorage.getItem("step")),this.percent=Number(this.step/8))}}return r.\u0275fac=function(e){return new(e||r)},r.\u0275cmp=p.Xpm({type:r,selectors:[["app-stepper"]],decls:1,vars:1,consts:[[2,"height","5px","--background","transparent","min-width","100%",3,"value"]],template:function(e,g){1&e&&p._UZ(0,"ion-progress-bar",0),2&e&&p.Q6J("value",g.percent)},dependencies:[d.X7],styles:[".stepper[_ngcontent-%COMP%]{margin:0;padding:30px 0 0;list-style:none;color:#dbdbdb;display:table;table-layout:fixed;width:100%;font-size:.8em}.stepper[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{display:table-cell;text-align:center;position:relative}.step-icon[_ngcontent-%COMP%]{background-color:#dce1f2!important;border-radius:50%;height:20px;width:20px;text-align:center;flex-shrink:0;position:relative;font-weight:500;color:#49158c;margin:0 auto}.step-icon-active[_ngcontent-%COMP%]{background-color:#49158c!important;color:#fff!important}.step-icon-content[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.step-horizontal-line[_ngcontent-%COMP%]{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin-bottom:10px;min-width:30px;border-top-color:#0000001f}"]}),r})()},524:(v,u,n)=>{n.r(u),n.d(u,{ServiceTypePageModule:()=>C});var p=n(9808),d=n(4182),a=n(9928),r=n(3769),l=n(655),e=n(5e3),g=n(1892),h=n(1335),y=n(7556),f=n(2522);const x=function(t){return{"m-auto":t}};function b(t,s){if(1&t){const o=e.EpF();e.TgZ(0,"ion-col",12)(1,"label",13)(2,"input",14),e.NdJ("ngModelChange",function(c){e.CHM(o);const m=e.oxw();return e.KtG(m.quotation.service_type_id=c)}),e.qZA(),e.TgZ(3,"div",15),e._UZ(4,"img",16),e.TgZ(5,"div",17)(6,"b"),e._uU(7),e.qZA()()()()()}if(2&t){const o=s.$implicit,i=s.index,c=e.oxw();e.Q6J("ngClass",e.VKq(7,x,i==c.service_array.length-1)),e.xp6(2),e.s9C("value",o.id),e.Q6J("ngModel",c.quotation.service_type_id),e.xp6(1),e.Tol(c.quotation.service_type_id==o.id?"radio-button-box radio-button-box-active":"radio-button-box"),e.xp6(1),e.MGl("src","assets/imgs/",o.img,"",e.LSH),e.xp6(3),e.Oqu(o.name)}}const S=[{path:"",component:(()=>{class t{constructor(o,i,c,m){this.ui=o,this.request=i,this.router=c,this.auth=m,this.service_array=[],this.loading=!1,this.quotation={}}ngOnInit(){return(0,l.mG)(this,void 0,void 0,function*(){localStorage.setItem("step","2")})}ionViewWillEnter(){return(0,l.mG)(this,void 0,void 0,function*(){this.hideCart(),localStorage.getItem("quotation")&&(this.quotation=JSON.parse(localStorage.getItem("quotation"))),this.loadData()})}hideCart(){this.auth.person.hide_cart=!0,this.auth.setPerson(this.auth.person)}loadData(){return(0,l.mG)(this,void 0,void 0,function*(){this.service_array=[];const o=yield this.ui.loading("Por favor espere...");this.request.get("list/attributes?parameter_id=1").subscribe(i=>(0,l.mG)(this,void 0,void 0,function*(){(yield o).dismiss(),this.service_array=i.data}),i=>(0,l.mG)(this,void 0,void 0,function*(){(yield o).dismiss(),yield this.ui.presentAlert({mode:"ios",header:"No se ha podido cargar la informaci\xf3n ",message:"Por favor, revise su conexi\xf3n",buttons:[{text:"Intentar de nuevo",cssClass:"secondary",handler:c=>{this.loadData()}}]})}))})}next(){let o=this.service_array.find(i=>i.id==this.quotation.service_type_id);this.quotation.service_type=o.name,localStorage.setItem("quotation",JSON.stringify(this.quotation)),this.router.navigate(["/tabs/select-city"])}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(g.F),e.Y36(h.s),e.Y36(r.F0),e.Y36(y.e))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-service-type"]],decls:19,vars:1,consts:[[1,"son-container",2,"text-align","center","margin-top","12px"],[1,"row","justify-content-center"],[1,"col-md-11","col-lg-10","col-xl-8",2,"margin-bottom","10px"],[1,"title"],[2,"background","#eeeeee","color","gray","text-align","center","/* margin-right","20px","*/\n    padding","10px 0px","/* padding-right","5px","*/\n    /* padding-left","5px","*/\n    border-radius","30px","/* background-size","20px","*/\n    display","block","width","80%","margin","auto"],["size","6",3,"ngClass",4,"ngFor","ngForOf"],[1,"col-md-11","col-lg-10","col-xl-8"],["mode","ios","routerLink","/tabs/transport-type"],["slot","start","name","chevron-back-outline"],["name","arrow-left"],["mode","ios",3,"click"],["slot","end","name","chevron-forward-outline"],["size","6",3,"ngClass"],[1,"radio-button","lg","ion-text-center","text-muted",2,"width","100%"],["type","radio",1,"hidden",3,"ngModel","value","ngModelChange"],[2,"width","100%"],[1,"imagen",3,"src"],[1,"radio-button-box-type",2,"width","100%"]],template:function(o,i){1&o&&(e.TgZ(0,"div"),e._UZ(1,"app-stepper"),e.qZA(),e.TgZ(2,"ion-content")(3,"div",0)(4,"div",1)(5,"div",2)(6,"div",3)(7,"span",4),e._uU(8,"\xbfQu\xe9 tipo de servicio deseas?"),e.qZA()(),e.TgZ(9,"ion-row"),e.YNc(10,b,8,9,"ion-col",5),e.qZA()(),e.TgZ(11,"div",6)(12,"ion-button",7),e._UZ(13,"ion-icon",8)(14,"ion-icon",9),e._uU(15," Atr\xe1s "),e.qZA(),e.TgZ(16,"ion-button",10),e.NdJ("click",function(){return i.next()}),e._UZ(17,"ion-icon",11),e._uU(18," Siguiente "),e.qZA()()()()()),2&o&&(e.xp6(10),e.Q6J("ngForOf",i.service_array))},dependencies:[p.mk,p.sg,d.Fj,d._,d.JJ,d.On,f.v,a.YG,a.wI,a.W2,a.gu,a.Nd,a.YI,r.rH]}),t})()}];let T=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[r.Bz.forChild(S),r.Bz]}),t})();var P=n(8412);let C=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[p.ez,d.u5,P.j,a.Pc,T]}),t})()}}]);