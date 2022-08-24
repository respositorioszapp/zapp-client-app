import { Component, OnInit } from '@angular/core';
import { ProductPage } from 'src/app/dialogs/product/product.page';
import { UiService } from 'src/app/services/ui.service';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { ErrorResponseService } from 'src/app/services/error-response.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView : 2,
    height : "200px"
  };
  slideOpts2 = {
    initialSlide: 0,
    speed: 400,
    slidesPerView : 4
  };
  loading = false
  dataParams: any = {
    total: 0,
    per_page: 5,
    page: 1,
    filters: [],
  };
  array2 : any[] = [
    {
      image : "assets/imgs/icono-promocion.png",
      text : "Promociones",
      type : "image",
      route : "tabs/offers"
    },
    {
      image : "assets/imgs/icono-moto.png",
      text : "Zapp",
      type : "image",
      route : "tabs/transport-type"
    },
    {
      image : "assets/imgs/icon-tendencias.png",
      text : "Tendencias",
      type : "image"
    },
    {
      image : "assets/imgs/icon-notificaciones.png",
      text : "Lo nuevo",
      type : "image"
    }
  ]
  array3 : any[] = []
  banners = []
  banners_loading = false
  slideOpts4 = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoplay: {
      delay: 2000,
    },
  };
  

  constructor(private ui : UiService,
     private auth : AuthService, private http : RequestService, private error: ErrorResponseService) { }

  ngOnInit() {
    
  }

  async ionViewWillEnter(){
    this.slideOpts4 = {
      initialSlide: 0,
      speed: 400,
      slidesPerView: 1,
      autoplay: {
        delay: 2000,
      },
    };
    this.banners_loading = true;
    this.http.get("/?option=banners&page=1&per_page=10", true)
    .subscribe((res: any) => {
      this.banners_loading = false;
      this.banners = res.data;
    }, err => {
      this.banners_loading = false
    })
    this.loadData(true);
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

  async loadData(starting, event?) {
    if (!starting) {
      this.dataParams.page++;
    }
    if (starting) {
      this.array3 = []
      this.dataParams.page = 1;
    }

    // this.orders = []
    let loader
    console.log("Loader init", loader)
    this.loading = true
    this.http
      .get("/?option=promotionalProducts&page=" + this.dataParams.page + "&per_page=10", true)
      .subscribe(async (res: any) => {

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
            image:  e.images[0] ? e.images[0].src : 'assets/imgs/sinimagen.png',
            business: e.store ? e.store.name : "Mc Donalds",
            product: e.name,
            description: e.description ? e.description : "Sin descripción",
            price: e.price ? e.price : 20000,
            time: "40-45 min",
            calification: "4.7",
            comments: "",
            categories: e.categories,
            store: e.store ? e.store : {},
            regular_price : e.regular_price,
            fields,
            available: e.stock_status == "instock",
            meta_data:e.meta_data,
            images:e.images
          }
          if (!this.array3.find(a => a.id == obj.id)) {
            this.array3.push(obj)
          }
        })
        this.array3 = this.array3.sort((a, b) => { return a.price - b.price });
        console.log("Products Array", this.array3)
        if (event) {
          console.log("Event", event)
          event.target.complete();
          if (res.data.length <= 0) {
            event.target.disabled = true;
          }
        }

      }, async err => {
        console.log("error", err)
        this.loading = false;
        event.target.complete();
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


}
