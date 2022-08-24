import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { UiService } from 'src/app/services/ui.service';
import { ProductPage } from 'src/app/dialogs/product/product.page';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorResponseService } from 'src/app/services/error-response.service';
import { take } from 'rxjs/operators';
import { CloseShopPage } from 'src/app/dialogs/close-shop/close-shop.page';


@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.page.html',
  styleUrls: ['./show-products.page.scss'],
})
export class ShowProductsPage implements OnInit {
  dataParams: any = {
    total: 0,
    per_page: 5,
    page: 1,
    filters: [],
  };
  loading = false
  shop = ""
  shop_selected
  array3: any[] = []
  segment = "products"
  status_shop = { status : "open" , closing_time: "", opening_time: ""}
  status 
  constructor(private route: ActivatedRoute,
    private request: RequestService,
    private ui: UiService, private auth: AuthService, private error: ErrorResponseService) { }

  ngOnInit() {

  }


  ionViewDidEnter() {
    this.auth.person.hide_cart = false;
    this.dataParams.page = 1;
    if (localStorage.getItem("shop")) {
      this.shop_selected = JSON.parse(localStorage.getItem("shop"));
      console.log("SHop", this.shop)
    } else {

    }

    this.array3 = []
    this.route.paramMap.pipe(take(1)).subscribe((data: any) => {
      if (typeof data.params.shop != "undefined") {
        this.shop = data.params.shop;
        this.request.get("/?option=shopById&id=" + this.shop, true)
          .subscribe((res: any) => {
            console.log("Tienda", res)
            this.shop_selected = res.data;
            let date = new Date();
            let day = date.toLocaleString('en-us', { weekday: 'long' });
            console.log(day);
            day = day.toLowerCase();
            const dokan_store_time =res.data.profile_settings.dokan_store_time;
            console.log("Time",dokan_store_time)
            let status_today: any ={}
            if(!Array.isArray(dokan_store_time)){
              Object.keys(dokan_store_time).map(key => {
                if(key == day){
                  status_today = dokan_store_time[key];
                }
              });
              this.status_shop = status_today;
              console.log("Status Today", status_today);
              const closing_time = status_today.closing_time.trim();
              const opening_time = status_today.opening_time.trim();
              let format_date = date.getFullYear() + "/";
              format_date += (date.getMonth()+1)< 10 ? "0"+(date.getMonth()+1): (date.getMonth()+1) ;
              format_date +=  "/" + ((date.getDate())< 10 ? "0"+(date.getDate()): (date.getDate()));
              console.log("Fecha Inicial FOrmat", format_date + " "+ opening_time)
              console.log("Fecha Final FOrmat", format_date + " " + closing_time)
              const opening_date = new Date(format_date + " "+ opening_time);
              const closing_date = new Date(format_date + " " + closing_time);
              console.log("Opening Date ", opening_date)
              console.log("Closing Date ", closing_date)
              if(date >= opening_date && date < closing_date){
                this.status_shop.status = 'open'
              }else{
                this.status_shop.status = 'close'
                this.showClose()
              }
            }

            // localStorage.setItem("shop", JSON.stringify(this.shop));
            // this.shop = JSON.parse(localStorage.getItem("shop"))
          })
        this.loadData(true);
      }

    });
  }

  getShop() {

  }

  get shop_status(){
    if(this.shop_selected){
      if(this.shop_selected.profile_settings.dokan_store_time && !Array.isArray(this.shop_selected.profile_settings.dokan_store_time)){
        let date = new Date();
        let day = date.toLocaleString('en-us', { weekday: 'long' });
        console.log(day);
        day = day.toLowerCase();
        const dokan_store_time =this.shop_selected.profile_settings.dokan_store_time;
        let status_today: any ={}
        if(!Array.isArray(dokan_store_time)){
          Object.keys(dokan_store_time).map(key => {
            if(key == day){
              status_today = dokan_store_time[key];
            }
          });
          this.status_shop = status_today;
          console.log("Status Today", status_today);
          const closing_time = status_today.closing_time.trim();
          const opening_time = status_today.opening_time.trim();
          let format_date = date.getFullYear() + "/";
          format_date += (date.getMonth()+1)< 10 ? "0"+(date.getMonth()+1): (date.getMonth()+1) ;
          format_date +=  "/" + ((date.getDate())< 10 ? "0"+(date.getDate()): (date.getDate()));
          console.log("Fecha Inicial FOrmat", format_date + " "+ opening_time)
          console.log("Fecha Final FOrmat", format_date + " " + closing_time)
          const opening_date = new Date(format_date + " "+ opening_time);
          const closing_date = new Date(format_date + " " + closing_time);
          console.log("Opening Date ", opening_date)
          console.log("Closing Date ", closing_date)
          if(date >= opening_date && date < closing_date){
            this.status_shop.status = 'open'
          }else{
            this.status_shop.status = 'close'
          }
        }
        if(this.status_shop.status == 'open'){
          return 'Abierto';
        }else{
          return 'Cerrado';
        }
      }
    }
    return ''
    
  }

  async loadData(starting, event?) {
    if (!starting) {
      this.dataParams.page++;
    }

    // this.orders = []
    let loader
    console.log("Loader init", loader)
    this.loading = true
    if (!event) {
      loader = await this.ui.loading("Por favor espere...");
    }
    console.log("/?option=products_by_shop&id=" + this.shop + "&page=" + this.dataParams.page + "&per_page=10")
    this.request.get("/?option=products_by_shop&id=" + this.shop + "&page=" + this.dataParams.page + "&per_page=10", true)
      .subscribe(async (res: any) => {

        this.loading = false;
        console.log("Loader", loader)
        if (loader) {
          console.log("Cancel Loading");
          (await loader).dismiss()
        }
        console.log("Products", res.data)


        const array: any[] = res.data;
        if (array) {
          array.forEach(e => {
            console.log("Producto", e)
            const metadata_extras = e.meta_data.find(m => m.key == "_wapf_fieldgroup");
            let fields = []
            if (metadata_extras) {

              const meta_fields: any[] = metadata_extras.value.fields;
              if(meta_fields){
                meta_fields.map(field => {
                  fields.push({
                    label: field.label,
                    price: field.options.choices[0] ? Number(field.options.choices[0].pricing_amount) : 0,
                    required: field.required,
                    type: field.type,
                    id: field.id,
                    category_id: field.category_id,
                    category_name:field.category_name
                  })
                })
              }
             
              console.log("Medata Extras Fields", fields);
            }

            const obj = {
              id: e.id,
              image:  e.images[0] ? e.images[0].src : 'assets/imgs/sinimagen.png',
              business: e.store ? e.store.shop_name : "Mc Donalds",
              product: e.name,
              description: e.description ? e.description : e.short_description?e.short_description: "Sin descripción",
              price: e.price ? e.price : 20000,
              time: "40-45 min",
              calification: "4.7",
              comments: "",
              store: e.store ? e.store : {},
              fields,
              available : e.stock_status== "instock",
              meta_data:e.meta_data,
              featured:e.featured,
              images:e.images
            }
            this.array3.push(obj)
          })
        }

        console.log("Products Array", this.array3)
        this.array3= this.array3.sort((a,b)=> b.featured-a.featured)
        if (event) {
          event.target.complete();
          if (res.data && res.data.length <= 0) {
            event.target.disabled = true;
          }
        }

      }, async err => {
        console.log("error", err)
        this.loading = false;
        if (event) {
          event.target.complete();
        }

        if (event && err.status && err.status == 400) {

          event.target.disabled = true;
        } else {
          (await loader).dismiss()
          if (!err.status) {
            this.error.response(err)
          }
          if (err.status && err.status != 400) {
            this.error.response(err)
          }
        }
      })




  }

  async wishList(item) {
    console.log("Wish")
    const object = {

    }
    const loader = await this.ui.loading("Por favor espere...")
    this.request.get("/?option=wish_list&user_id=" + this.auth.user.id + "&page=1&per_page=2", true)
      .subscribe((res: any) => {
        console.log("Res", res.data)
        if (res.data.length > 0) {
          const object = {
            product_id: item.id,
            quantity: 1,
            user_id: this.auth.user.id,
            wishlist_id: res.data[0].ID

          }
          this.request.post("/?option=add_product_wish_list", object, true)
            .subscribe(async (res: any) => {
              (await loader).dismiss()
              item.wishlist = true
            }, async err => {
              (await loader).dismiss()
            })
        } else {
          const obj = {
            user_id: this.auth.user.id.toString()
          }

          this.request.post("/?option=create_wish_list", obj, true)
            .subscribe(async (res: any) => {
              const object = {
                product_id: item.id,
                quantity: 1,
                user_id: this.auth.user.id,
                wishlist_id: res.data.ID
              }
              this.request.post("/?option=add_product_wish_list", object, true)
                .subscribe(async (res: any) => {
                  (await loader).dismiss()
                  item.wishlist = true
                }, async err => {
                  (await loader).dismiss()
                  console.log("Error add Product", err)
                })
            }, async err => {

              (await loader).dismiss()
              console.log("Error Create List", err)
            })
        }


      }, err => {
        console.log("Error", err)
      })


  }

  async showClose(){
    const obj = {
       image: 'assets/imgs/45557-time.gif',
       message : this.shop_selected.profile_settings.dokan_store_close_notice? this.shop_selected.profile_settings.dokan_store_close_notice : 'Cerrado',
       color_message : "#14a5c7"
    }
    const modal = await this.ui.presentModal(CloseShopPage, obj, ["modal-xs"])
  }

  async showProduct(product) {

    const modal = await this.ui.presentModal(ProductPage, { product })
    modal.onDidDismiss().then((obj: any) => {
      if (!obj.cancel) {
        this.auth.person.total = 0;
        if (this.auth.person.cart_items && this.auth.person.cart_items.length > 0) {
          this.auth.person.cart_items.map(p => {
            this.auth.person.total += p.quantity * p.price
            this.auth.setPerson(this.auth.person)
          })
        }
      }

    })

  }

}
