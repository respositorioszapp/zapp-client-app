"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[561],{3214:(B,O,l)=>{l.d(O,{P:()=>k});var a=l(5e3),v=l(7556),d=l(3769),x=l(9808),h=l(9928);function T(_,C){1&_&&(a.TgZ(0,"ion-thumbnail",3),a._UZ(1,"ion-skeleton-text",4),a.qZA())}function e(_,C){if(1&_){const p=a.EpF();a.TgZ(0,"ion-slide",7),a.NdJ("click",function(){const A=a.CHM(p).$implicit,H=a.oxw(2);return a.KtG(H.showProducts(A))}),a.TgZ(1,"ion-thumbnail",8),a._UZ(2,"img",9),a.qZA()()}if(2&_){const p=C.$implicit;a.xp6(2),a.Q6J("src",p.url_image_banner,a.LSH)}}function M(_,C){if(1&_&&(a.TgZ(0,"ion-slides",5),a.YNc(1,e,3,1,"ion-slide",6),a.qZA()),2&_){const p=a.oxw();a.Q6J("options",p.slideOpts4),a.xp6(1),a.Q6J("ngForOf",p.banners)}}let k=(()=>{class _{constructor(p,P){this.auth=p,this.router=P,this.slideOpts4={initialSlide:0,speed:400,slidesPerView:1,autoplay:{delay:1e4}}}ngOnInit(){console.log("Banners Loading",this.banners_loading)}showProducts(p){const P=p.id?p.id:Number(p.seller_id);0!=P&&(localStorage.setItem("back_route","tabs/home"),this.auth.setBack(!0),this.router.navigate(["tabs/show-products/"+P]))}}return _.\u0275fac=function(p){return new(p||_)(a.Y36(v.e),a.Y36(d.F0))},_.\u0275cmp=a.Xpm({type:_,selectors:[["app-banners"]],inputs:{banners:"banners",banners_loading:"banners_loading"},decls:4,vars:2,consts:[["size","12",1,"ion-no-padding"],["class","ion-text-center","style","display: block;width: 100%;height: 120px",4,"ngIf"],[3,"options",4,"ngIf"],[1,"ion-text-center",2,"display","block","width","100%","height","120px"],["animated",""],[3,"options"],["style","max-height: 120px;",3,"click",4,"ngFor","ngForOf"],[2,"max-height","120px",3,"click"],[1,"banner"],["alt","","srcset","",3,"src"]],template:function(p,P){1&p&&(a.TgZ(0,"ion-row")(1,"ion-col",0),a.YNc(2,T,2,0,"ion-thumbnail",1),a.YNc(3,M,2,2,"ion-slides",2),a.qZA()()),2&p&&(a.xp6(2),a.Q6J("ngIf",P.banners_loading),a.xp6(1),a.Q6J("ngIf",!P.banners_loading))},dependencies:[x.sg,x.O5,h.wI,h.Nd,h.CK,h.A$,h.Hr,h.Bs],styles:[".banner[_ngcontent-%COMP%]{width:90%;background-repeat:no-repeat;background-size:100%;background-position:center;height:100%;border-radius:30px}.banner[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;width:100%;height:120px;-o-object-fit:contain;object-fit:initial;border-radius:30px}"]}),_})()},561:(B,O,l)=>{l.r(O),l.d(O,{HomePageModule:()=>G});var a=l(9808),v=l(4182),d=l(9928),x=l(3769),h=l(655),T=l(3238),e=l(5e3),M=l(7556),k=l(1892),_=l(1335),C=l(8337),p=l(9099),P=l(3214);const S=["scrollMe"];function A(r,m){if(1&r){const i=e.EpF();e.ynx(0,15),e.NdJ("click",function(){const n=e.CHM(i).$implicit,g=e.oxw();return e.KtG(g.selectCategory(n))}),e.TgZ(1,"ion-slide",16),e.NdJ("click",function(){const n=e.CHM(i).$implicit,g=e.oxw();return e.KtG(g.selectCategory(n))}),e.TgZ(2,"ion-grid")(3,"ion-row")(4,"ion-col",3),e._UZ(5,"img",17),e.qZA()(),e.TgZ(6,"ion-row",18)(7,"ion-col",3)(8,"ion-label",19),e._uU(9),e.qZA()()()()(),e.BQk()}if(2&r){const i=m.$implicit;e.xp6(5),e.Q6J("src",i.image?i.image.src:"",e.LSH),e.xp6(4),e.Oqu(i.name)}}function H(r,m){1&r&&(e.ynx(0),e.TgZ(1,"ion-slide")(2,"div",20)(3,"div")(4,"ion-thumbnail",21),e._UZ(5,"ion-skeleton-text",22),e.qZA()(),e.TgZ(6,"p",23),e._UZ(7,"ion-skeleton-text",22),e.qZA()()(),e.TgZ(8,"ion-slide")(9,"div",20)(10,"div")(11,"ion-thumbnail",21),e._UZ(12,"ion-skeleton-text",22),e.qZA()(),e.TgZ(13,"p",23),e._UZ(14,"ion-skeleton-text",22),e.qZA()()(),e.TgZ(15,"ion-slide")(16,"div",20)(17,"div")(18,"ion-thumbnail",21),e._UZ(19,"ion-skeleton-text",22),e.qZA()(),e.TgZ(20,"p",23),e._UZ(21,"ion-skeleton-text",22),e.qZA()()(),e.BQk())}function I(r,m){if(1&r){const i=e.EpF();e.ynx(0),e.TgZ(1,"ion-slide",16),e.NdJ("click",function(){const n=e.CHM(i).$implicit,g=e.oxw();return e.KtG(g.selectCategory(n))}),e.TgZ(2,"ion-grid")(3,"ion-row")(4,"ion-col",3),e._UZ(5,"img",17),e.qZA()(),e.TgZ(6,"ion-row",18)(7,"ion-col",3)(8,"ion-label",19),e._uU(9),e.qZA()()()()(),e.BQk()}if(2&r){const i=m.$implicit;e.xp6(5),e.Q6J("src",i.image?i.image.src:"",e.LSH),e.xp6(4),e.Oqu(i.name)}}function J(r,m){1&r&&(e.TgZ(0,"h5",24),e._uU(1,"Productos destacados"),e.qZA())}function N(r,m){if(1&r){const i=e.EpF();e.TgZ(0,"ion-slide",25),e.NdJ("click",function(){const n=e.CHM(i).$implicit,g=e.oxw();return e.KtG(g.showProduct(n))}),e._UZ(1,"ion-icon",26),e.TgZ(2,"ion-grid")(3,"ion-row")(4,"ion-thumbnail",27),e._UZ(5,"img",28),e.qZA()(),e.TgZ(6,"ion-row")(7,"ion-col",3)(8,"p",29),e._uU(9),e.ALo(10,"titlecase"),e.qZA()()(),e.TgZ(11,"ion-row")(12,"ion-col",3)(13,"p",30),e._uU(14),e.ALo(15,"currency"),e.qZA()()()()()}if(2&r){const i=m.$implicit;e.xp6(5),e.Q6J("src",i.image,e.LSH),e.xp6(4),e.Oqu(e.lcZ(10,3,i.product)),e.xp6(5),e.Oqu(e.gM2(15,5,i.price,"","symbol","1.0"))}}function q(r,m){if(1&r){const i=e.EpF();e.TgZ(0,"ion-slide",25),e.NdJ("click",function(){const n=e.CHM(i).$implicit,g=e.oxw(2);return e.KtG(g.showProducts(n))}),e.TgZ(1,"ion-grid")(2,"ion-row")(3,"ion-thumbnail",27),e._UZ(4,"img",28),e.qZA()(),e.TgZ(5,"ion-row")(6,"ion-col",3)(7,"p",32),e._uU(8),e.ALo(9,"titlecase"),e.qZA()()(),e.TgZ(10,"ion-row")(11,"ion-col",33)(12,"p",34),e._uU(13),e.qZA()(),e.TgZ(14,"ion-col",33)(15,"p",34),e._uU(16),e._UZ(17,"ion-icon",35),e.qZA()()()()()}if(2&r){const i=m.$implicit;e.xp6(4),e.Q6J("src",i.image,e.LSH),e.xp6(4),e.Oqu(e.lcZ(9,4,i.business)),e.xp6(5),e.Oqu(i.time),e.xp6(3),e.hij("",i.calification," ")}}function E(r,m){if(1&r&&(e.ynx(0),e.TgZ(1,"h4",31),e._uU(2),e.qZA(),e.TgZ(3,"ion-slides",4),e.YNc(4,q,18,6,"ion-slide",12),e.qZA(),e.BQk()),2&r){const i=m.$implicit,o=e.oxw();e.xp6(2),e.Oqu(o.shopPerCategories[i].title),e.xp6(1),e.Q6J("options",o.slideOptsBusiness),e.xp6(1),e.Q6J("ngForOf",o.shopPerCategories[i].shops)}}const F=[{path:"",component:(()=>{class r{constructor(i,o,t,n,g,c){this.router=i,this.auth=o,this.ui=t,this.request=n,this.error=g,this.realtime=c,this.shopPerCategories={},this.slideOptsBusiness={initialSlide:0,speed:400,slidesPerView:2,autoplay:{delay:2e3}},this.slideOpts={initialSlide:0,speed:400,slidesPerView:3,autoplay:{delay:2e3}},this.slideOpts2={initialSlide:0,speed:400,slidesPerView:4},this.slideOpts3={initialSlide:0,speed:400,slidesPerView:3,autoplay:{delay:5e3}},this.slideOpts5={initialSlide:0,speed:400,slidesPerView:2},this.slideOpts4={initialSlide:0,speed:400,slidesPerView:1,autoplay:{delay:2e3}},this.array2=[{image:"assets/imgs/promotions.png",text:"Promociones",type:"image",route:"tabs/offers"},{image:"assets/imgs/mensajer\xeda.jpg",text:"Mensajer\xeda",type:"image",route:"tabs/transport-type"},{image:"assets/imgs/trending.png",text:"Tendencias",type:"image"},{image:"assets/imgs/new-products.png",text:"Lo nuevo",type:"image"}],this.array3=[],this.feautured_products=[],this.banners=[],this.banners_loading=!0,this.shops_loading=!1,this.categories=[],this.categories_loading=!1,this.dataParams={total:0,per_page:5,page:1,filters:[]},this.principal_items=[]}ngOnInit(){}showProducts(i){const o=i.id?i.id:Number(i.seller_id);0!=o&&(localStorage.setItem("back_route","tabs/home"),this.auth.setBack(!0),this.router.navigate(["tabs/show-products/"+o]))}scrollToTop(){return(0,h.mG)(this,void 0,void 0,function*(){try{this.myContent.scrollToTop(300)}catch(i){}})}ionViewWillEnter(){return(0,h.mG)(this,void 0,void 0,function*(){this.shopPerCategories={},this.slideOptsBusiness={initialSlide:0,speed:400,slidesPerView:2,autoplay:{delay:2e3}},this.scrollToTop(),this.request.get("indexcities").subscribe(i=>(0,h.mG)(this,void 0,void 0,function*(){this.cities=i.data,yield this.loadCategories(),this.loadData(!0)}),i=>{this.error.response(i)}),this.auth.removeBack(),this.infiniteScroll.disabled=!1,this.slideOpts4={initialSlide:0,speed:400,slidesPerView:1,autoplay:{delay:2e3}},this.slideOpts3={initialSlide:0,speed:400,slidesPerView:3,autoplay:{delay:5e3}},this.auth.person.cart_items?this.auth.person.cart_items&&0==this.auth.person.cart_items.length&&localStorage.removeItem("shop"):localStorage.removeItem("shop"),localStorage.removeItem("filters"),this.auth.removeBack(),this.auth.person.hide_cart=!1,this.auth.setPerson(this.auth.person),this.banners_loading=!0,this.categories_loading=!0,this.request.get("/?featured=true&page=1&per_page=10&option=products_by_featured",!0).subscribe(i=>{this.feautured_products=[],console.log("Productos Destacados",i);const o=i.data;o&&o.forEach(t=>{console.log("Producto",t);const n=t.meta_data.find(u=>"_wapf_fieldgroup"==u.key);let g=[];if(n){const u=n.value.fields;u&&u.map(s=>{g.push({label:s.label,price:s.options.choices[0]?Number(s.options.choices[0].pricing_amount):0,required:s.required,type:s.type,id:s.id,category_id:s.category_id,category_name:s.category_name})}),console.log("Medata Extras Fields",g)}const c={id:t.id,image:t.images[0]?t.images[0].src:"assets/imgs/sinimagen.png",business:t.store?t.store.shop_name:"Mc Donalds",product:t.name?t.name.replace("?","\xf1"):"",description:t.description?t.description:t.short_description?t.short_description:"Sin descripci\xf3n",price:t.price?t.price:2e4,time:"40-45 min",calification:"4.7",comments:"",store:t.store?t.store:{},fields:g,available:"instock"==t.stock_status,meta_data:t.meta_data,images:t.images};this.feautured_products.push(c)},t=>{this.feautured_products=[]}),console.log("Products Featured Array",this.feautured_products)}),this.request.get("/?option=banners&page=1&per_page=10",!0).subscribe(i=>{this.banners_loading=!1,console.log("Banners",i.data),this.banners=i.data},i=>{this.banners_loading=!1})})}loadCategories(){return new Promise(i=>{this.request.get("/?option=products/categories&page=1&per_page=100",!0).subscribe(o=>(0,h.mG)(this,void 0,void 0,function*(){if(i({}),this.categories_loading=!1,o.data&&(o.data=o.data.map(t=>{switch(t.id){case 107:t.icon="casera";break;case 106:t.icon="hamburger-r";break;case 115:t.icon="shops";break;default:t.icon="home"}return t})),this.categories=o.data?o.data:[],console.log("Categor\xedas",o.data),this.categories.length>0){this.categories=[];const t=o.data.filter(s=>116==s.id).sort((s,f)=>s.id-f.id);this.principal_items=o.data.filter(s=>115==s.id||124==s.id||135==s.id).sort((s,f)=>s.id-f.id);const n=o.data.filter(s=>0==s.parent&&15!=s.id&&115!=s.id&&116!=s.id&&135!=s.id&&124!=s.id&&194!=s.id&&s.image);console.log("Otras categor\xedas",n);const g=Number((n.length/2).toFixed(0));for(let s=0;s<g;s++)this.principal_items.push(n[s]);console.log("Principal items",this.principal_items);const c=n.filter(s=>!this.principal_items.find(f=>f.id==s.id)&&0==s.parent);t.map(s=>{this.categories.unshift(s)}),this.categories.unshift({count:3,description:"",display:"default",icon:"casera",id:0,menu_order:0,name:"Mensajer\xeda",parent:115,slug:"comidas-caseras",image:{src:"assets/imgs/mensajeria.png"},route:"tabs/transport-type"}),c.forEach(s=>{this.categories.push(s)}),this.categories.splice(0,0,this.categories[1]);const u=[];this.categories.forEach(s=>{u.find(f=>f.id==s.id)||u.push(s)}),this.categories=u,this.categories.forEach(s=>{(117==s.id||115==s.id)&&(s.route="tabs/stores"),116==s.id&&(s.route="tabs/offers")}),this.realtime.getFirebaseCollectionObject("application_resources/3/5").subscribe(s=>{i({}),null!=s?(this.categories.find(b=>0==b.id).image.src=s.image,console.log("Res Image",s)):this.realtime.setObject("application_resources/3/5",{image:"https://firebasestorage.googleapis.com/v0/b/zapp-logistica-dev.appspot.com/o/mensajeria.png?alt=media&token=efc0e415-5773-467b-a595-3cc96c616d39"})})}}),o=>(0,h.mG)(this,void 0,void 0,function*(){i({}),this.categories_loading=!1,console.log("Err",o)}))})}get arrayShopPerCategories(){return Object.keys(this.shopPerCategories)}loadData(i,o){return(0,h.mG)(this,void 0,void 0,function*(){let t;i||this.dataParams.page++,i&&(this.array3=[],this.dataParams.page=1),console.log("Page Number",this.dataParams.page),console.log("Loader init",t),this.shops_loading=!0,o||(t=yield this.ui.loading("Por favor espere...")),console.log("/?option=shops&page="+this.dataParams.page+"&per_page=10"),this.request.get("/?option=shops&page="+this.dataParams.page+"&per_page=200",!0).subscribe(n=>(0,h.mG)(this,void 0,void 0,function*(){console.log("Tiendas",n),this.shops_loading=!1,console.log("Loader",t),t&&(console.log("Cancel Loading"),(yield t).dismiss()),console.log("Tiendas",n.data);const g=n.data;console.log("Array de tiendas",g),g.forEach(c=>{if(console.log(c.profile_settings?c.profile_settings.store_name:c.display_name,c),c.profile_settings.address){let u=c.profile_settings.address.city;console.log("Ciudad antes",u);let s=this.auth.person.city_selected?this.auth.person.city_selected.name:this.auth.person.city,f=this.auth.person.city_selected?this.auth.person.city_selected.id:this.auth.person.city_id;if(s=s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(),u=u.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(),console.log("Ciudad seleccionada ",s),console.log("Ciudad restaurante ",u),u.includes(s)||this.cities.find(b=>b.id==u&&b.id==f)){const b={id:c.ID,image:c.profile_settings.img_gravatar?c.profile_settings.img_gravatar:"assets/imgs/sinimagen.png",business:c.profile_settings?c.profile_settings.store_name:c.display_name,time:"40-45 min",calification:"4.7",price:2e4,description:"Sin descripci\xf3n",store:c};let Z=c.profile_settings.categories;if(Z){console.log("Categor\xedas restaurante ",b.business,Z),console.log("Categor\xedas actuales",this.principal_items),console.log("Categor\xedas Seleccionada",Z[0]);const y=[...this.principal_items,...this.categories].find(w=>void 0!==Z.find(j=>j.slug.includes(w.slug)));console.log("Category is match"),y&&(this.shopPerCategories[y.id]||(this.shopPerCategories[y.id]={title:y.name,shops:[]}),this.array3.find(w=>(console.log("Id Shop",b.business,b.id,w.id),w.id==b.id))||(this.shopPerCategories[y.id].shops.push(b),this.array3.push(b)))}}}else this.array3.push({id:c.ID,image:c.profile_settings.img_gravatar?c.profile_settings.img_gravatar:"assets/imgs/sinimagen.png",business:c.profile_settings?c.profile_settings.store_name:c.display_name,time:"40-45 min",calification:"4.7",price:2e4,description:"Lorem ipsumz dolor sit amet consectetur, adipisicing elit. Necessitatibus expedita ex ab ad sed molestiae deserunt aperiam cumque,",store:c})}),console.log("Products Array",this.array3),o&&(o.target.complete(),n.data.length<=0&&(o.target.disabled=!0))}),n=>(0,h.mG)(this,void 0,void 0,function*(){console.log("error",n),this.shops_loading=!1,o&&o.target.complete(),t&&(yield t).dismiss(),o&&n.status&&400==n.status?o.target.disabled=!0:((yield t).dismiss(),n.status||this.error.response(n),n.status&&400!=n.status&&this.error.response(n))}))})}showProduct(i){return(0,h.mG)(this,void 0,void 0,function*(){(yield this.ui.presentModal(T.e,{product:i})).onDidDismiss().then(t=>{console.log("Cancel",t),t.data.cancel?i=t.data.product:(this.auth.person.total=0,this.auth.person.quantity=0,this.auth.person.cart_items&&this.auth.person.cart_items.length>0&&this.auth.person.cart_items.map(n=>{this.auth.person.total+=Number(n.quantity)*(Number(n.price)+(n.additional_price?Number(n.additional_price):0)),this.auth.person.quantity+=n.quantity,this.auth.setPerson(this.auth.person)}))})})}hideCart(){this.auth.person.hide_cart=!0,this.auth.setPerson(this.auth.person)}selectCategory(i){i.route||localStorage.setItem("filters",JSON.stringify({category:i.id})),localStorage.getItem("category_selected")&&localStorage.removeItem("category_selected"),localStorage.setItem("category_selected",JSON.stringify(i)),this.goTo(i.route?i.route:`tabs/stores/${i.id}`)}goTo(i){i&&(console.log("Route",i),this.hideCart(),this.router.navigateByUrl(i),localStorage.setItem("back_route","tabs/home"),this.auth.setBack(!0)),console.log("Aqu\xed")}showCart(){this.auth.person.hide_cart=!1,this.auth.setPerson(this.auth.person)}}return r.\u0275fac=function(i){return new(i||r)(e.Y36(x.F0),e.Y36(M.e),e.Y36(k.F),e.Y36(_.s),e.Y36(C.Y),e.Y36(p.i))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-home"]],viewQuery:function(i,o){if(1&i&&(e.Gf(d.ju,5),e.Gf(d.W2,5,d.W2),e.Gf(S,5)),2&i){let t;e.iGM(t=e.CRH())&&(o.infiniteScroll=t.first),e.iGM(t=e.CRH())&&(o.myContent=t.first),e.iGM(t=e.CRH())&&(o.myScrollContainer=t.first)}},decls:23,vars:12,consts:[["id","mainHome",3,"scrollEvents","click"],[2,"width","90%","margin","auto"],["mode","ios","placeholder","\xbfQu\xe9 quieres hoy...?","searchIcon","find",1,"seacrh-bar",3,"click"],["size","12"],[3,"options"],[3,"click",4,"ngFor","ngForOf"],[2,"margin-bottom","20px"],["size","12",2,"margin","auto"],[4,"ngIf"],[4,"ngFor","ngForOf"],[3,"banners","banners_loading"],["class","title",4,"ngIf"],["class","slide","style","position: relative;",3,"click",4,"ngFor","ngForOf"],["threshold","100px",3,"ionInfinite"],["loadingSpinner","bubbles","loadingText","Loading more data..."],[3,"click"],[1,"slide-categories",3,"click"],["alt","",3,"src"],[1,"reversed-top"],[2,"font-size","0.8em","font-family","Gilroy-ExtraBold !important"],[1,"card"],["slot","start",1,"ion-text-center",2,"margin","auto","height","37px"],["animated",""],[2,"font-size","0.6em","margin","0"],[1,"title"],[1,"slide",2,"position","relative",3,"click"],["name","star",2,"color","#ecec3e","position","absolute","top","-4px","right","10px","font-size","1.2em"],[2,"width","100%","height","90%"],[3,"src"],[2,"white-space","nowrap","text-overflow","ellipsis","max-width","120px","display","block","overflow","hidden","margin","0"],[2,"white-space","nowrap","text-overflow","ellipsis","max-width","120px","display","block","overflow","hidden","font-weight","bold","text-align","left","margin","0"],[2,"font-family","'Gilroy-ExtraBold' !important","background","#cccccc85","padding","5px"],[2,"white-space","nowrap","text-overflow","ellipsis","text-align","center","max-width","95%","display","block","overflow","hidden","font-weight","bolder","font-size","0.8em","margin","0"],["size","6"],[2,"margin","0","font-size","0.8em"],["name","star","color","primary"]],template:function(i,o){1&i&&(e.TgZ(0,"ion-content",0),e.NdJ("click",function(){return o.showCart()}),e.TgZ(1,"div",1)(2,"ion-searchbar",2),e.NdJ("click",function(){return o.goTo("tabs/search")}),e.qZA()(),e.TgZ(3,"ion-row")(4,"ion-col",3)(5,"ion-slides",4),e.YNc(6,A,10,2,"ng-container",5),e.qZA()()(),e.TgZ(7,"ion-row",6)(8,"ion-col",7)(9,"ion-slides",4),e.YNc(10,H,22,0,"ng-container",8),e.YNc(11,I,10,2,"ng-container",9),e.qZA()()(),e._UZ(12,"app-banners",10),e.TgZ(13,"ion-row"),e.YNc(14,J,2,0,"h5",11),e.TgZ(15,"ion-col",3)(16,"ion-slides",4),e.YNc(17,N,16,10,"ion-slide",12),e.qZA()()(),e.TgZ(18,"ion-row")(19,"ion-col",3),e.YNc(20,E,5,3,"ng-container",9),e.qZA()(),e.TgZ(21,"ion-infinite-scroll",13),e.NdJ("ionInfinite",function(n){return o.loadData(!1,n)}),e._UZ(22,"ion-infinite-scroll-content",14),e.qZA()()),2&i&&(e.Q6J("scrollEvents",!0),e.xp6(5),e.Q6J("options",o.slideOpts3),e.xp6(1),e.Q6J("ngForOf",o.principal_items),e.xp6(3),e.Q6J("options",o.slideOpts3),e.xp6(1),e.Q6J("ngIf",o.categories_loading),e.xp6(1),e.Q6J("ngForOf",o.categories),e.xp6(1),e.Q6J("banners",o.banners)("banners_loading",o.banners_loading),e.xp6(2),e.Q6J("ngIf",o.feautured_products.length>0),e.xp6(2),e.Q6J("options",o.slideOpts),e.xp6(1),e.Q6J("ngForOf",o.feautured_products),e.xp6(3),e.Q6J("ngForOf",o.arrayShopPerCategories))},dependencies:[a.sg,a.O5,d.wI,d.W2,d.jY,d.gu,d.ju,d.MB,d.Q$,d.Nd,d.VI,d.CK,d.A$,d.Hr,d.Bs,d.j9,P.P,a.rS,a.H9],styles:[".slide[_ngcontent-%COMP%]{min-height:93px;min-width:125px}.slide[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]{padding:0;max-width:100%}.slide[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]{padding:0}.slide[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-row.reversed-top[_ngcontent-%COMP%]{margin-top:-20px}.slide-categories[_ngcontent-%COMP%]{min-height:93px;min-width:100px;max-width:30%}.slide-categories.none-max-width[_ngcontent-%COMP%]{max-width:none}.slide-categories[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:20px;min-height:86px;max-height:86px;-o-object-fit:cover;object-fit:cover}.slide-categories[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]{padding:0}.slide-categories[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]{padding:0}.slide-categories[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-row.reversed-top[_ngcontent-%COMP%]{margin-top:-20px}ion-thumbnail.banner[_ngcontent-%COMP%]{width:100%;height:200px;max-height:300px}ion-thumbnail.banner[_ngcontent-%COMP%]   ion-img[_ngcontent-%COMP%]{width:100%;height:100%}.slide[_ngcontent-%COMP%]   ion-thumbnail[_ngcontent-%COMP%]{width:100%;height:100%}.search-bar[_ngcontent-%COMP%]{--border-radius: 20px}.banner[_ngcontent-%COMP%]{width:100%;background-repeat:no-repeat;background-size:100%;background-position:center;height:100%;border-radius:30px}.slide[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:20px;width:120px;height:100px}.red-color[_ngcontent-%COMP%]{color:#dc143c}.title[_ngcontent-%COMP%]{font-weight:700;margin-left:5px}.item-search[_ngcontent-%COMP%]{background:white;color:#000;border-radius:30px;padding:0!important;margin-top:10px;height:40px;border:.5px solid #CCCCCC}.item-search[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{margin:0;color:#ccc}.item-search[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#ccc;margin:0 0 5px}"]}),r})()}];let U=(()=>{class r{}return r.\u0275fac=function(i){return new(i||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[x.Bz.forChild(F),x.Bz]}),r})();var Q=l(8412);let G=(()=>{class r{}return r.\u0275fac=function(i){return new(i||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[a.ez,v.u5,d.Pc,U,Q.j]}),r})()}}]);