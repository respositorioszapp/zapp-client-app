"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1396],{3995:(E,_,a)=>{a.d(_,{F:()=>T});var d=a(655),P=a(3238),i=a(5e3),m=a(1335),f=a(7556),t=a(1892),Z=a(8337),g=a(9808),p=a(9928);function x(c,s){if(1&c&&(i.TgZ(0,"ion-card-subtitle",13),i._uU(1),i.ALo(2,"currency"),i.qZA()),2&c){const e=i.oxw();i.xp6(1),i.hij("",i.gM2(2,1,e.product.regular_price,"","symbol","1.0")," ")}}function v(c,s){if(1&c&&(i.ynx(0),i._uU(1),i._UZ(2,"ion-icon",14),i.BQk()),2&c){const e=i.oxw();i.xp6(1),i.hij(" ",e.product.calification," ")}}function O(c,s){if(1&c&&(i.ynx(0),i._uU(1),i._UZ(2,"ion-icon",14),i.BQk()),2&c){const e=i.oxw(2);i.xp6(1),i.hij(" ",e.product.calification," ")}}function C(c,s){if(1&c&&i.YNc(0,O,3,1,"ng-container",15),2&c){const e=i.oxw();i.Q6J("ngIf",!e.isOffer)}}function w(c,s){1&c&&(i.TgZ(0,"p",16),i._uU(1,"Agotado"),i.qZA())}const M=function(c){return{wishlist:c}},b=function(c){return{blur:c}};let T=(()=>{class c{constructor(e,o,n,r){this.request=e,this.auth=o,this.ui=n,this.error=r,this.isOffer=!1,this.shop_open=!0}ngOnInit(){this.product.product=this.product.product.replace("?","\xf1");const e=this.product.meta_data.find(n=>"_wapf_fieldgroup"==n.key);let o=[];if(e){const n=e.value.fields;n&&n.map(r=>{o.push({label:r.label,price:r.options.choices[0]?r.options.choices[0].pricing_amount:0,required:r.required,type:r.type,id:r.id,description:r.description,category_id:r.category_id,category_name:r.category_name})}),console.log("Metadata Extras Fields",o)}this.product.fields=o,this.findIsOnWishList()}wishList(){return(0,d.mG)(this,void 0,void 0,function*(){if(console.log("Wish"),this.product.wishlist){const e=yield this.ui.loading("Por favor espere...");this.request.get("/?option=wish_list&user_id="+this.auth.user.id+"&page=1&per_page=2",!0).subscribe(o=>{console.log("Res",o.data),o.data.length>0&&this.request.post("/?option=del_product_wish_list",{product_id:this.product.id,wishlist_id:o.data[0].ID},!0).subscribe(r=>(0,d.mG)(this,void 0,void 0,function*(){(yield e).dismiss(),this.product.wishlist=!1,this.productFavorites&&(this.productFavorites=this.productFavorites.filter(u=>u.id!=this.product.id))}),r=>(0,d.mG)(this,void 0,void 0,function*(){(yield e).dismiss()}))},o=>{console.log("Error",o)})}else{const e=yield this.ui.loading("Por favor espere...");this.request.get("/?option=wish_list&user_id="+this.auth.user.id+"&page=1&per_page=2",!0).subscribe(o=>{console.log("Res",o.data),o.data.length>0?this.request.post("/?option=add_product_wish_list",{product_id:this.product.id,quantity:1,user_id:this.auth.user.id,wishlist_id:o.data[0].ID},!0).subscribe(r=>(0,d.mG)(this,void 0,void 0,function*(){(yield e).dismiss(),this.product.wishlist=!0}),r=>(0,d.mG)(this,void 0,void 0,function*(){(yield e).dismiss()})):this.request.post("/?option=create_wish_list",{user_id:this.auth.user.id},!0).subscribe(r=>(0,d.mG)(this,void 0,void 0,function*(){this.request.post("/?option=add_product_wish_list",{product_id:this.product.id,quantity:1,user_id:this.auth.user.id,wishlist_id:r.data.ID},!0).subscribe(y=>(0,d.mG)(this,void 0,void 0,function*(){(yield e).dismiss(),this.product.wishlist=!0}),y=>(0,d.mG)(this,void 0,void 0,function*(){(yield e).dismiss(),console.log("Error add Product",y)}))}),r=>(0,d.mG)(this,void 0,void 0,function*(){(yield e).dismiss(),console.log("Error Create List",r),yield this.ui.presentAlert({mode:"ios",header:"No se pudo crear la lista",buttons:[{text:"Aceptar",role:"cancel",cssClass:"secondary",handler:u=>{}}]})}))},o=>{console.log("Error",o)})}})}findIsOnWishList(){this.request.get("/?option=wish_list&user_id="+this.auth.user.id+"&page=1&per_page=2",!0).subscribe(e=>{console.log("Res",e.data),this.request.get("/?option=find_product_in_wish_list&wishlist_id="+e.data[0].ID+"&prod_id="+this.product.id,!0).subscribe(o=>{this.product.wishlist=o.data.product_exists,console.log("Url Respuesta endpoint",o)})},e=>{console.log("Error",e)})}getPriceItem(e){return(Number(e.price)+Number(e.additional_price?e.additional_price:0))*Number(e.quantity)}showProduct(){return(0,d.mG)(this,void 0,void 0,function*(){(yield this.ui.presentModal(P.e,{product:this.product})).onDidDismiss().then(o=>{console.log("Cancel",o),o.data.cancel?this.product=o.data.product:(this.auth.person.total=0,this.auth.person.quantity=0,this.auth.person.cart_items&&this.auth.person.cart_items.length>0&&(console.log("Calculating"),this.auth.person.cart_items.map(n=>{console.log(`Total ${n.id}`,this.getPriceItem(n)),this.auth.person.total+=this.getPriceItem(n),this.auth.person.quantity+=n.quantity,this.auth.setPerson(this.auth.person)})))})})}}return c.\u0275fac=function(e){return new(e||c)(i.Y36(m.s),i.Y36(f.e),i.Y36(t.F),i.Y36(Z.Y))},c.\u0275cmp=i.Xpm({type:c,selectors:[["product"]],inputs:{product:"product",isOffer:"isOffer",shop_open:"shop_open",productFavorites:"productFavorites"},decls:24,vars:19,consts:[["fill","clear",1,"wish",3,"click"],["name","heart-circle-outline",1,"not-in-wishlist",2,"position","absolute","right","0","font-size","x-large",3,"ngClass"],["mode","ios",1,"product"],[1,"product-detail"],["alt","",1,"image",3,"src","ngClass","click"],[1,"info"],["size","6"],["class","offer",4,"ngIf"],[4,"ngIf","ngIfElse"],["elseTemplate",""],["class","spent",4,"ngIf"],["size","6",1,"ion-text-right"],[3,"click"],[1,"offer"],["name","star",2,"color","#ecec3e"],[4,"ngIf"],[1,"spent"]],template:function(e,o){if(1&e&&(i.TgZ(0,"ion-button",0),i.NdJ("click",function(){return o.wishList()}),i._UZ(1,"ion-icon",1),i.qZA(),i.TgZ(2,"ion-card",2)(3,"ion-card-content",3)(4,"img",4),i.NdJ("click",function(){return o.showProduct()}),i.qZA(),i.TgZ(5,"div",5)(6,"h3"),i._uU(7),i.qZA(),i.TgZ(8,"h5"),i._uU(9),i.qZA(),i.TgZ(10,"ion-row")(11,"ion-col",6),i.YNc(12,x,3,6,"ion-card-subtitle",7),i.TgZ(13,"ion-card-subtitle"),i._uU(14),i.ALo(15,"currency"),i.qZA(),i.TgZ(16,"ion-card-subtitle"),i.YNc(17,v,3,1,"ng-container",8),i.YNc(18,C,1,1,"ng-template",null,9,i.W1O),i.qZA(),i.YNc(20,w,2,0,"p",10),i.qZA(),i.TgZ(21,"ion-col",11)(22,"ion-button",12),i.NdJ("click",function(){return o.showProduct()}),i._uU(23,"Ver"),i.qZA()()()()()()),2&e){const n=i.MAs(19);i.xp6(1),i.Q6J("ngClass",i.VKq(15,M,o.product.wishlist)),i.xp6(3),i.Q6J("src",o.product.image,i.LSH)("ngClass",i.VKq(17,b,0==o.product.available)),i.xp6(3),i.Oqu(o.product.business),i.xp6(2),i.Oqu(o.product.product),i.xp6(3),i.Q6J("ngIf",o.isOffer),i.xp6(2),i.hij("",i.gM2(15,10,o.product.price,"","symbol","1.0")," "),i.xp6(3),i.Q6J("ngIf",o.product.categories)("ngIfElse",n),i.xp6(3),i.Q6J("ngIf",0==o.product.available)}},dependencies:[g.mk,g.O5,p.YG,p.PM,p.FN,p.tO,p.wI,p.gu,p.Nd,g.H9],styles:[".not-in-wishlist[_ngcontent-%COMP%]{color:#666}.wishlist[_ngcontent-%COMP%]{color:#462688}.blur[_ngcontent-%COMP%]{filter:blur(4px)}.spent[_ngcontent-%COMP%]{border:1px solid #151515;text-align:center;left:0;right:0;width:100%;color:#131313;bottom:0;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;text-transform:uppercase;border-radius:10px;margin:auto}.wish[_ngcontent-%COMP%]{position:absolute;right:10px;font-size:x-large;width:24px;height:24px;z-index:1000000;top:-3px}.product[_ngcontent-%COMP%]{display:flex;width:100%;margin:10px 0 0;text-align:right}.product[_ngcontent-%COMP%]   .product-detail[_ngcontent-%COMP%]{display:flex;padding:0;width:100%}.product[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]{display:block;width:170px;height:200px;-o-object-fit:contain;object-fit:initial}.product[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]{width:70%;padding:5px;text-align:left}.product[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:first-child{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;max-height:69px}.product[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:first-child   ion-card-subtitle[_ngcontent-%COMP%]{display:inline}.product[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:first-child   ion-card-subtitle.offer[_ngcontent-%COMP%]{text-decoration:line-through;padding-right:4px;color:#969696}.product[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:first-child   ion-card-subtitle[_ngcontent-%COMP%]:nth-child(2){margin-left:10px}.product[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:first-child   ion-card-subtitle[_ngcontent-%COMP%]:nth-child(2)   ion-icon[_ngcontent-%COMP%]{color:#ecec3e}.product[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:nth-child(2){height:inherit;max-height:50px}.product[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:nth-child(2)   ion-button[_ngcontent-%COMP%]{padding:10px}"]}),c})()},1396:(E,_,a)=>{a.r(_),a.d(_,{WishlistPageModule:()=>c});var d=a(9808),P=a(4182),i=a(9928),m=a(3769),f=a(655),t=a(5e3),Z=a(1335),g=a(7556),p=a(1892),x=a(3995);function v(s,e){if(1&s&&(t.TgZ(0,"div",4),t._UZ(1,"product",5),t.qZA()),2&s){const o=e.$implicit,n=t.oxw();t.xp6(1),t.Q6J("product",o)("productFavorites",n.array3)}}function O(s,e){1&s&&(t.ynx(0),t._UZ(1,"img",6),t.TgZ(2,"h2",7),t._uU(3,"No hay productos favoritos "),t.qZA(),t.BQk())}function C(s,e){1&s&&(t.TgZ(0,"ion-list")(1,"ion-item")(2,"ion-thumbnail",8),t._UZ(3,"ion-skeleton-text",9),t.qZA(),t.TgZ(4,"ion-label")(5,"h3"),t._UZ(6,"ion-skeleton-text",10),t.qZA(),t.TgZ(7,"p"),t._UZ(8,"ion-skeleton-text",11),t.qZA(),t.TgZ(9,"p"),t._UZ(10,"ion-skeleton-text",12),t.qZA()()(),t.TgZ(11,"ion-item")(12,"ion-thumbnail",8),t._UZ(13,"ion-skeleton-text",9),t.qZA(),t.TgZ(14,"ion-label")(15,"h3"),t._UZ(16,"ion-skeleton-text",10),t.qZA(),t.TgZ(17,"p"),t._UZ(18,"ion-skeleton-text",11),t.qZA(),t.TgZ(19,"p"),t._UZ(20,"ion-skeleton-text",12),t.qZA()()(),t.TgZ(21,"ion-item")(22,"ion-thumbnail",8),t._UZ(23,"ion-skeleton-text",9),t.qZA(),t.TgZ(24,"ion-label")(25,"h3"),t._UZ(26,"ion-skeleton-text",10),t.qZA(),t.TgZ(27,"p"),t._UZ(28,"ion-skeleton-text",11),t.qZA(),t.TgZ(29,"p"),t._UZ(30,"ion-skeleton-text",12),t.qZA()()(),t.TgZ(31,"ion-item")(32,"ion-thumbnail",8),t._UZ(33,"ion-skeleton-text",9),t.qZA(),t.TgZ(34,"ion-label")(35,"h3"),t._UZ(36,"ion-skeleton-text",10),t.qZA(),t.TgZ(37,"p"),t._UZ(38,"ion-skeleton-text",11),t.qZA(),t.TgZ(39,"p"),t._UZ(40,"ion-skeleton-text",12),t.qZA()()(),t.TgZ(41,"ion-item")(42,"ion-thumbnail",8),t._UZ(43,"ion-skeleton-text",9),t.qZA(),t.TgZ(44,"ion-label")(45,"h3"),t._UZ(46,"ion-skeleton-text",10),t.qZA(),t.TgZ(47,"p"),t._UZ(48,"ion-skeleton-text",11),t.qZA(),t.TgZ(49,"p"),t._UZ(50,"ion-skeleton-text",12),t.qZA()()(),t.TgZ(51,"ion-item")(52,"ion-thumbnail",8),t._UZ(53,"ion-skeleton-text",9),t.qZA(),t.TgZ(54,"ion-label")(55,"h3"),t._UZ(56,"ion-skeleton-text",10),t.qZA(),t.TgZ(57,"p"),t._UZ(58,"ion-skeleton-text",11),t.qZA(),t.TgZ(59,"p"),t._UZ(60,"ion-skeleton-text",12),t.qZA()()()())}const M=[{path:"",component:(()=>{class s{constructor(o,n,r){this.request=o,this.auth=n,this.ui=r,this.wish_list={},this.dataParams={total:0,per_page:5,page:1,filters:[]},this.loading=!1,this.shop="",this.array3=[]}ngOnInit(){}ionViewDidEnter(){this.request.get("/?option=wish_list&user_id="+this.auth.user.id,!0).subscribe(o=>{console.log("WishList",o),this.wish_list=o.data[0],this.wish_list&&this.loadData(!0),console.log("/?option=detail_wish_list&wishlist_id=13&page=1&per_page=2")},o=>{console.log("Error Get",o)})}loadData(o,n){return(0,f.mG)(this,void 0,void 0,function*(){let r;o||this.dataParams.page++,o&&(this.array3=[],this.dataParams.page=1),console.log("Loader init",r),this.loading=!0,n||(r=yield this.ui.loading("Por favor espere...")),this.wish_list?this.request.get("/?option=detail_wish_list&wishlist_id="+this.wish_list.ID+"&page="+this.dataParams.page+"&per_page=10",!0).subscribe(u=>(0,f.mG)(this,void 0,void 0,function*(){console.log("Res",u.data),this.loading=!1,console.log("Loader",r),r&&(console.log("Cancel Loading"),(yield r).dismiss()),console.log("Products",u.data),u.data.forEach(l=>{console.log("Producto",l);const A=l.meta_data.find(q=>"_wapf_fieldgroup"==q.key);let U=[];A&&(A.value.fields.map(h=>{U.push({label:h.label,price:h.options.choices[0]?h.options.choices[0].pricing_amount:0,required:h.required,type:h.type,id:h.id})}),console.log("Medata Extras Fields",U)),this.array3.push({id:l.id,image:l.images[0].src,business:l.store?l.store.shop_name:"Mc Donalds",product:l.name,description:l.description?l.description:"Sin descripci\xf3n",price:l.price?l.price:2e4,time:"40-45 min",calification:"4.7",comments:"",store:l.store?l.store:{},wishlist:!0,meta_data:l.meta_data,images:l.images,available:"instock"==l.stock_status})}),console.log("Products Array",this.array3),n&&(n.target.complete(),u.data.length<=0&&(n.target.disabled=!0))}),u=>{console.log("Error",u)}):(r&&(yield r).dismiss(),this.loading=!1)})}get filter(){return this.array3.filter(o=>o.wishlist)}}return s.\u0275fac=function(o){return new(o||s)(t.Y36(Z.s),t.Y36(g.e),t.Y36(p.F))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-wishlist"]],decls:6,vars:3,consts:[["style","position: relative;",4,"ngFor","ngForOf"],[4,"ngIf"],["threshold","100px",3,"ionInfinite"],["loadingSpinner","bubbles","loadingText","Loading more data..."],[2,"position","relative"],[3,"product","productFavorites"],["src","assets/imgs/empty-and-lost.gif","alt","",2,"height","60%"],[1,"ion-text-center"],["slot","start"],["animated",""],["animated","",2,"width","50%"],["animated","",2,"width","80%"],["animated","",2,"width","60%"]],template:function(o,n){1&o&&(t.TgZ(0,"ion-content"),t.YNc(1,v,2,2,"div",0),t.YNc(2,O,4,0,"ng-container",1),t.YNc(3,C,61,0,"ion-list",1),t.TgZ(4,"ion-infinite-scroll",2),t.NdJ("ionInfinite",function(u){return n.loadData(!1,u)}),t._UZ(5,"ion-infinite-scroll-content",3),t.qZA()()),2&o&&(t.xp6(1),t.Q6J("ngForOf",n.filter),t.xp6(1),t.Q6J("ngIf",0==n.filter.length&&!n.loading),t.xp6(1),t.Q6J("ngIf",n.loading))},dependencies:[d.sg,d.O5,i.W2,i.ju,i.MB,i.Ie,i.Q$,i.q_,i.CK,i.Bs,x.F]}),s})()}];let b=(()=>{class s{}return s.\u0275fac=function(o){return new(o||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[m.Bz.forChild(M),m.Bz]}),s})();var T=a(8412);let c=(()=>{class s{}return s.\u0275fac=function(o){return new(o||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[d.ez,P.u5,i.Pc,b,T.j]}),s})()}}]);