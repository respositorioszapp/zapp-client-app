import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  wish_list: any = {}
  dataParams: any = {
    total: 0,
    per_page: 5,
    page: 1,
    filters: [],
  };
  loading = false
  shop = ""
  array3: any[] = []
  constructor(private request: RequestService,
    private auth: AuthService, private ui: UiService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.request.get("/?option=wish_list&user_id=" + this.auth.user.id, true)
      .subscribe((res: any) => {
        console.log("WishList", res)
        this.wish_list = res.data[0];
        if(this.wish_list){
          this.loadData(true)
        }
        console.log("/?option=detail_wish_list&wishlist_id=13&page=1&per_page=2")
        
      }, err => {
        console.log("Error Get", err)
      })

  }

  async loadData(starting, event?) {
    if (!starting) {
      this.dataParams.page++;

    }
    if(starting){
      this.array3=[]
      this.dataParams.page=1;
    }

    // this.orders = []
    let loader
    console.log("Loader init", loader)
    this.loading = true
    if (!event) {
      loader = await this.ui.loading("Por favor espere...");
    }
    if (this.wish_list) {
      this.request
        .get("/?option=detail_wish_list&wishlist_id=" + this.wish_list.ID + "&page=" + this.dataParams.page + "&per_page=10", true)
        .subscribe(async (res: any) => {
          console.log("Res", res.data)
          this.loading = false;
          console.log("Loader", loader)
          if (loader) {
            console.log("Cancel Loading");
            (await loader).dismiss()
          }
          console.log("Products", res.data)

          const array: any[] = res.data;
          array.forEach(e => {
            console.log("Producto", e)
            const metadata_extras = e.meta_data.find(m => m.key == "_wapf_fieldgroup");
            let fields = []
            if (metadata_extras) {

              const meta_fields: any[] = metadata_extras.value.fields;
              meta_fields.map(field => {
                fields.push({
                  label: field.label,
                  price: field.options.choices[0] ? field.options.choices[0].pricing_amount : 0,
                  required: field.required,
                  type: field.type,
                  id: field.id
                })
              })
              console.log("Medata Extras Fields", fields);
            }
            const obj = {
              id: e.id,
              image: e.images[0].src,
              business: e.store ? e.store.shop_name : "Mc Donalds",
              product: e.name,
              description: e.description ? e.description : "Sin descripción",
              price: e.price ? e.price : 20000,
              time: "40-45 min",
              calification: "4.7",
              comments: "",
              store: e.store ? e.store : {},
              wishlist: true,
              meta_data:e.meta_data,
              images:e.images,
              available: e.stock_status == "instock",
            }
            this.array3.push(obj)
          })
          console.log("Products Array", this.array3)
          if (event) {
            event.target.complete();
            if (res.data.length <= 0) {
              event.target.disabled = true;
            }
          }
        }, err => {
          console.log("Error", err)
        })
    } else {
      if (loader) {
        (await loader).dismiss()
      }
      this.loading = false;
    }

    // this.request.get("/?option=products_by_shop&id=" + this.shop + "&page=" + this.dataParams.page + "&per_page=10", true)
    //   .subscribe(async (res: any) => {

    //     this.loading = false;
    //     console.log("Loader", loader)
    //     if (loader) {
    //       console.log("Cancel Loading");
    //       (await loader).dismiss()
    //     }
    //     console.log("Products", res.data)

    //     const array: any[] = res.data;
    //     array.forEach(e => {
    //       console.log("Producto", e)
    //       const obj = {
    //         id: e.id,
    //         image: e.images[0].src,
    //         business: e.store ? e.store.name : "Mc Donalds",
    //         product: e.name,
    //         description: e.description ? e.description : "Sin descripción",
    //         price: e.price ? e.price : 20000,
    //         time: "40-45 min",
    //         calification: "4.7",
    //         comments: "",
    //         store: e.store ? e.store : {}
    //       }
    //       this.array3.push(obj)
    //     })
    //     console.log("Products Array", this.array3)
    //     if (event) {
    //       event.target.complete();
    //       if (res.data.length <= 0) {
    //         event.target.disabled = true;
    //       }
    //     }

    //   }, async err => {
    //     console.log("error", err)
    //     this.loading = false;
    //     event.target.complete();
    //     if (event && err.status && err.status == 400) {

    //       event.target.disabled = true;
    //     } else {
    //       (await loader).dismiss()
    //       if (!err.status) {
    //         this.error.response(err)
    //       }
    //       if (err.status && err.status != 400) {
    //         this.error.response(err)
    //       }
    //     }
    //   })




  }

  get filter(){
    return this.array3.filter(p=>p.wishlist)
  }

}
