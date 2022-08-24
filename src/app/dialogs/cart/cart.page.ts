import { Component, OnInit, NgZone } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/app/interfaces/Product';
import { Address } from 'src/app/interfaces/Address';
import { MapPage } from '../map/map.page';
import { RequestService } from 'src/app/services/request.service';
import { ErrorResponse } from 'src/app/interfaces/ErrorResponse';
import { ErrorResponseService } from 'src/app/services/error-response.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Router } from '@angular/router';
import { City } from 'src/app/interfaces/City';
import { CartSelectPaymentPage } from '../cart-select-payment/cart-select-payment.page';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5/dist/md5';
import { Plugins } from '@capacitor/core';
import { PriceService } from 'src/app/services/price.service';
import { ViewOrderPage } from '../view-order/view-order.page';
import { HttpClient } from '@angular/common/http';
import { ProductPage } from '../product/product.page';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { MapLocationService } from 'src/app/services/map-location.service';

const { Geolocation } = Plugins;
declare var google: any;

interface DistanceDuration {
  distance: number,
  duration: number
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  feautured_products:any[] = [
  ]
  items: Product[] = []
  coupon
  coupon_object: any = {}
  couponRedimi = false
  error = false
  loading = false;
  shopLoading = false
  cashLoading = false
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 3,
    autoplay: {
      delay: 2000,
    },
  };
  address: Address = {
    address: "Calle 93 #7-39, Barranquilla, Atlántico",
    latitude: "10.9495919",
    longitude: "-74.8352923",
    favorite: false
  }

  distance = 0
  duration = 0

  paymentMethod: string = "efectivo"

  defaults_location: any = {
    1: "4.6034581,-74.0824232",
    2: "6.2507287,-75.5850634",
    3: "3.3692357,-76.5297074",
    4: "10.9909237,-74.8021089",
    5: "10.4252546,-75.5424482"
  }
  //
  shop_id: number = 0
  price_logistic = 0
  shop_selected: any = {}
  total_ = 0
  coupon_discount = 0

  constructor(private ui: UiService, public auth: AuthService,
    private request: RequestService,
    private errorS: ErrorResponseService,
    private zone: NgZone,
    private router: Router,
    private iab: InAppBrowser,
    private price: PriceService,
    private http: HttpClient,
    private geolocation:GeolocationService,
    private map_service: MapLocationService,
    ) { }

  async ngOnInit() {


  }

  async ionViewWillEnter() {
    if(!this.auth.person.location){
      this.geolocation.getCurrentPosition()
        .then(data => {
          this.auth.person.location = {
            latitude: data.coords.latitude,
            longitude: data.coords.longitude
          };
          this.map_service.findPlace(this.auth.person.location)
            .then((data) => {
              if (data) {
                this.auth.setPerson(this.auth.person);
              }
            });
        })
    }
    if (localStorage.getItem("coupon")) {
      this.coupon_object = JSON.parse(localStorage.getItem("coupon"));

    }
    if (localStorage.getItem("address_selected")) {
      this.address = JSON.parse(localStorage.getItem("address_selected"))
    }
    if (localStorage.getItem("payment_method")) {
      this.paymentMethod = localStorage.getItem("payment_method")
    }
    this.items = []
    if (this.auth.person.cart_items.length > 0) {
      const cart_item = this.auth.person.cart_items[0];
      this.shop_id = cart_item.store.id;
      this.shopLoading = true;
      this.request.get("/?option=shopById&id=" + this.shop_id, true)
        .subscribe((res: any) => {
          console.log("Tienda", res)
          this.shopLoading = false;
          this.shop_selected = res.data;
          this.getPrice()
          localStorage.setItem("shop", JSON.stringify(this.shop_selected));
          // this.shop = JSON.parse(localStorage.getItem("shop"))
        }, err => {
          this.shopLoading = false;
          console.log("Error Tienda")
          // this.getPrice()
        })
    }


    this.auth.person.cart_items.map((p: any) => {
      const obj: Product = {
        id: p.id,
        name: p.product,
        price: Number(p.price),
        quantity: p.quantity,
        image: p.image,
        store: p.store,
        additional_price: Number(p.additional_price),
        radio_id: p.radio_id,
        additionals_ids: p.additionals_ids
      }
      this.items.push(obj)
    })
    this.loadProducts()
    // const id = this.shop.ID || this.shop.id;







  }

  loadProducts(){
    
    this.feautured_products=[]
    this.request.get("/?option=products_by_shop&id=" + this.shop_id + "&page=1&per_page=10", true)
      .subscribe(async (res: any) => {

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
            this.feautured_products.push(obj)
          })
        }

        console.log("Products Array", this.feautured_products)
        /**Ordenamos ascedentemente dependiendo si son productos destacados o no */
        this.feautured_products= this.feautured_products.sort((a,b)=> b.featured-a.featured)
        /**Filtramos para quitar los productos que ya se seleccionaron*/
        this.feautured_products= this.feautured_products.filter(p=> !this.items.find(i=>i.id==p.id))
      }, async err => {
        console.log("error", err)
        

        if (event && err.status && err.status == 400) {

        } else {
          
          if (!err.status) {
            this.errorS.response(err)
          }
          if (err.status && err.status != 400) {
            this.errorS.response(err)
          }
        }
      })
  }

  async showProduct(product) {

    const modal = await this.ui.presentModal(ProductPage, { product })
    modal.onDidDismiss().then((obj: any) => {
      console.log("Cancel", obj)
      if (!obj.data.cancel) {
        this.auth.person.total = 0;
        this.auth.person.quantity = 0;
        if (this.auth.person.cart_items && this.auth.person.cart_items.length > 0) {
          this.items=[]
          this.auth.person.cart_items.map((p: any) => {
            const obj: Product = {
              id: p.id,
              name: p.product,
              price: Number(p.price),
              quantity: p.quantity,
              image: p.image,
              store: p.store,
              additional_price: Number(p.additional_price),
              radio_id: p.radio_id,
              additionals_ids: p.additionals_ids
            }
            this.items.push(obj)
          })
          this.auth.person.cart_items.map(p => {
            this.auth.person.total += (Number(p.quantity) * (Number(p.price) + (p.additional_price ? Number(p.additional_price) : 0)))
            this.auth.person.quantity += p.quantity;
            this.auth.setPerson(this.auth.person)
          })
        }

      } else {
        product = obj.data.product;
      }

    })

  }

  dismiss() {
    this.ui.dismiss()
  }

  async view_order(order) {
    const modal = await this.ui.presentModal(ViewOrderPage, { order }, ['custom-modal'])
    modal.onDidDismiss().then(r => {
      // this.loadData();
    });
  }

  getDistanceMatrix(origin, destination, loader?): Promise<DistanceDuration> {
    var service = new google.maps.DistanceMatrixService();
    var _this = this;

    return new Promise((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        },
        async function (response, status) {
          if (status != google.maps.DistanceMatrixStatus.OK) {
            resolve({ distance: 0, duration: 0 })
            console.log('Error was: ' + status);

          } else {

            try {
              const { distance, duration: dur } = response.rows[0].elements[0];
              console.log("Response", response.rows[0].elements[0])
              let distance_text = response.rows[0].elements[0].distance.value;
              console.log("Distance Text", distance_text)
              let duration = dur.value;
              resolve({ distance: Math.round(Number(distance_text)), duration })


            } catch (e) {
              console.log("error", e)
            }
          }
        }
      );
    })
    //calculo distancia

  }

  async applyCoupon() {
    if (this.coupon) {
      if (this.couponRedimi) {
        await this.ui.presentAlert({
          mode: 'ios',
          header: 'Ya se ha redimido un cupón en esta orden',
          buttons: [
            {
              text: 'Aceptar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {

              }
            },
          ]
        });
        return;
      }
      const obj = {
        customer_id: this.auth.user.id,
        coupon_code: this.coupon,
        platform: 'mobile'
      }
      this.loading = true;
      this.error = false;
      this.request.post('coupon/redeem_a_coupon', obj).subscribe((res: any) => {
        this.loading = false;
        this.error = false;
        this.couponRedimi = true;
        console.log("Res", res)
        this.coupon = ""
        const coupon = res.data[0];
        if (coupon) {
          this.total_ = this.total;
          if (coupon.type_value_id == 40) {
            if (Number(coupon.value) <= this.total_) {
              this.coupon_discount = Number(coupon.value);
            } else {
              this.coupon_discount = this.total;
            }
          } else {
            this.coupon_discount = (this.auth.person.total * (Number(coupon.value) / 100));
          }
          localStorage.setItem("couponRedimi", "yes");
          this.coupon_object = coupon;

          localStorage.setItem("coupon", JSON.stringify(coupon))
          this.ui.presentAlert({
            mode: 'ios',
            header: 'Información',
            message: "El cupón es aplicado solamente al total de los productos",
            buttons: [
              {
                text: 'Aceptar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {

                }
              },
            ]
          })
          this.ui.showToast("Se ha redimido tu cupón exitosamente");
        }
      }, err => {
        this.error = true;
        this.loading = false;
        console.log("Err", err)
        const f = () => {
          console.log("Esto es una prueba de error")
        }
        this.errorS.response(err, {
          method: f
        })
        // if(err.error){
        //   if(err.error.message){
        //     this.ui.showToast(err.error.message);
        //     return;
        //   }
        // }
        // if(err.status == 0){
        //   this.ui.showToast("Error de conexión");
        // }else{
        //   if(err.status == 500 ){
        //     this.ui.showToast("Error en el servidor");
        //   }
        // }

      })
    } else {
      this.error = true;
      this.ui.showToast("Debe ingresar un cupón")
    }

  }

  pay() {
    if (this.paymentMethod != "Wompi") {
      this.createOrder()
    } else {
      this.payment()
    }
  }

  generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async searchTransaction(url, transactionId) {
    const loader = await this.ui.loading("Por favor espere...");
        localStorage.setItem("isWompiRequest", "yes");
        this.http.get(`${url}transactions/${transactionId}`).
          subscribe(async (res: any) => {
            await (await loader).dismiss();
            const status = {
              PENDING: "La transacción se encuentra en estado pendiente",
              APPROVED: "Aprobado",
              DECLINED: "La transacción ha sido rechazada",
              ERROR: "Se ha producido un error con la transacción",
              VOIDE: "I don´t know"
            }
            const transaction = res.data;
            localStorage.setItem("transaction", JSON.stringify(transaction));
            if (transaction.status == "APPROVED") {
              this.createOrder()
            } else {
              await this.ui.presentAlert({
                mode: 'ios',
                header: 'Transacción no aprobada',
                message: status[transaction.status],
                buttons: [
                  {
                    text: 'Aceptar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {

                    }
                  },
                ]
              })
            }
            console.log("event url transaction", res)
          }, async err => {
            (await loader.dismiss());
            if (err.status == 401 || err.status == 404) {
              const alterMessage = err.status == 404 ? "Error no se encontró el id" : "Error al consultar la transacción " + transactionId;
              const message = err.error ? err.error.reason : alterMessage;

              await this.ui.presentAlert({
                mode: 'ios',
                header: 'Error',
                message,
                buttons: [
                  {
                    text: 'Aceptar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {

                    }
                  },
                ]
              })
              return;
            }
            if (err.status == 422) {



              const message = err.error ? err.error.messages.reference[0] : "Error mensage";

              await this.ui.presentAlert({
                mode: 'ios',
                header: 'Error',
                message,
                buttons: [
                  {
                    text: 'Aceptar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {

                    }
                  },
                ]
              })
              return;
            }


            console.log("event url error", JSON.stringify(err.error))
          })
  }

 

  payment() {
    //Extract credentials from environment
    let {
      confirmationUrl,
      publicKey,
      currency,
      postUrl,
      responseUrl,
      urlToFind
    } = environment.wompiCredentials;
    console.log("Wompi Credentials", environment.wompiCredentials)
    let referenceCode = this.generateGuid();
    let total = (this.coupon_discount ? (this.total - this.coupon_discount) : this.total) * 100;
    let paymentString = `
            <html>
              <body>
                <form action="${postUrl}" method="get" id="payu_form">
                <input name="reference"    type="hidden"  value="${referenceCode}"   >
                  <input name="public-key"    type="hidden"  value="${publicKey}"   >
                  <input name="currency"      type="hidden"  value="${currency}">
                  <input type="hidden" name="amount-in-cents" value="${total}"/>
                  <input name="redirect-url"    type="hidden"  value="${responseUrl}" >
                  <button type="submit" value="submit" #submitBtn></button>
                </form>
                <script type="text/javascript">document.getElementById("payu_form").submit();</script>
              </body>
            </html>`;

    paymentString = 'data:text/html;base64,' + btoa(paymentString);

    const browser = this.iab.create(paymentString, "_self", {
      location: 'no',
      clearcache: 'yes',
      hardwareback: 'yes',
      mediaPlaybackRequiresUserAction: 'no',
      shouldPauseOnSuspend: 'no', //Android only
      closebuttoncaption: 'Close', //iOS only
      disallowoverscroll: 'yes', //iOS only 
      toolbar: 'yes', //iOS only 
      toolbartranslucent: 'yes',
      enableViewportScale: 'no', //iOS only 
      allowInlineMediaPlayback: 'no',//iOS only 
      presentationstyle: 'pagesheet',//iOS only 
      toolbarposition: 'bottom'
    });
    console.log("Browser", browser)
    browser.on('loadstart').subscribe(async event => {
      console.log("event url", event.url)

      // browser.close();

      if (event.url.includes(responseUrl)) {
        browser.close();
        //https://demoewc.tech/payu_response_url.php?id=110687-1618580707-65217&env=test
        const id = event.url.replace(responseUrl + "?", "").split("&")
          .find(d => d.includes("id=")).replace("id=", "");
        console.log("event url Id", id)
        this.searchTransaction(urlToFind,id);
        // if (event.url.includes("APPROVED")) {
        //   console.log("event url approved", event.url)
        //   this.createOrder()
        // } else {
        //   console.log("event url declined ", event.url)
        //   await this.ui.presentAlert({
        //     mode: 'ios',
        //     header: 'Transacción rechazada',
        //     message: "Por favor intentelo de nuevo <br> o seleccione otro método de pago ",
        //     buttons: [
        //       {
        //         text: 'Aceptar',
        //         role: 'cancel',
        //         cssClass: 'secondary',
        //         handler: (blah) => {

        //         }
        //       },
        //     ]
        //   })
        // }

      }
    });



  }

  async getPrice() {
    this.cashLoading = true;
    try {
      if (!this.shop_selected.profile_settings.location) {
        console.log("Set Location");
        const city = this.auth.person.city_selected ? this.auth.person.city_selected.id : this.auth.person.city_id
        this.shop_selected.profile_settings.location = this.defaults_location[4]
        // this.shop.profile_settings.location = this.defaults_location[4]
        localStorage.setItem("shop", JSON.stringify(this.shop_selected));
      }
      let address_selected;

      const address_array = [];
      const split_lat = this.shop_selected.profile_settings.location.split(",");
      console.log("Latitude", split_lat[0], "Longitude", split_lat[1])
      const shop_Lat_Lng = { lat: parseFloat(split_lat[0]), lng: parseFloat(split_lat[1]) };
      const address_selected_Lat_Lng = {
        lat: (this.auth.person.location.latitude),
        lng: (this.auth.person.location.longitude)
      };
      let { distance, duration } = await this.getDistanceMatrix(shop_Lat_Lng, address_selected_Lat_Lng);
      if (distance == 0 || duration == 0) {
        console.log("Distance =0")
        return;
      }
      if (distance >= 1000) {
        distance = Number((distance / 1000).toFixed(0));
      } else {
        distance = Number((distance / 1000).toFixed(1))
      }
      if (duration >= 3600) {
        duration = Number((duration / 3600).toFixed(0));
      } else {
        duration = Number((duration / 60).toFixed(0))
      }
      const price = await this.price.getTotalStore(distance, 'Motorizado', 0, 0, 4);
      console.log("Distance", distance)
      console.log("Price", price)
      this.price_logistic = Math.round(price / 50) * 50;
      this.cashLoading = false
      this.distance = distance;
      this.duration = duration;
      if (this.coupon_object) {
        console.log("Coupon", this.coupon_object)
        const total = this.auth.person.total + this.price_logistic;
        if (this.coupon_object.type_value_id == 40) {
          if (Number(this.coupon_object.value) <= this.total) {
            this.coupon_discount = Number(this.coupon_object.value);
          } else {
            this.coupon_discount = total;
          }
        } else {
          this.coupon_discount = (total * (Number(this.coupon_object.value) / 100));
        }

      }
    } catch (e) {
      this.cashLoading = false
    }
  }

  async createOrder() {

    const { user } = this.auth;
    console.log('User', user);
    if (!this.shop_selected.profile_settings.location) {
      console.log("Set Location");
      const city = this.auth.person.city_selected ? this.auth.person.city_selected.id : this.auth.person.city_id
      this.shop_selected.profile_settings.location = this.defaults_location[city]
      // this.shop.profile_settings.location = this.defaults_location[4]
      localStorage.setItem("shop", JSON.stringify(this.shop_selected));
    }
    let address_selected;

    const address_array = [];
    const split_lat = this.shop_selected.profile_settings.location.split(",");
    const shop_Lat_Lng = { lat: parseFloat(split_lat[0]), lng: parseFloat(split_lat[1]) };
    const address_selected_Lat_Lng = {
      lat: (this.auth.person.location.latitude),
      lng: (this.auth.person.location.longitude)
    };
    let products = " ";

    let items = this.auth.person.cart_items.map(i => { return i.id + "/" + i.quantity }).join(",");
    let products_additionals = [];
    this.auth.person.cart_items.forEach(p => {
      products += p.product + "X" + p.quantity + " " + p.comments + ", "
      //Searching for additionals selected
      const additionals_fields = p.fields.filter(f => p.additional_radio.find(a => a == f.id) || p.additionals_ids.find(id => id == f.id))
      const additionals = additionals_fields.map(a => {
        return {
          name: a.label,
          price: a.price.toString()
        }
      })
      const discount = this.coupon_discount && this.coupon_discount > 0 ? (this.coupon_discount / this.auth.person.cart_items.length) : 0;
      products_additionals.push({
        product_id: p.id,
        note: `${p.product} ${p.comments}`,
        quantity: p.quantity,
        total: this.getPriceItem(p) - discount,
        additionals
      })
      products_additionals.forEach(ad => {
        Object.keys(ad).forEach(key => {
          if (key != "additionals") {
            ad[key] = ad[key].toString()
          }
        })
      })
    });
    console.log("Product Aditionals", products_additionals)
    // return;

    const { first_name, last_name, phone, city, state_id } = this.auth.person;
    const customer_id = 0;
    const city_name_selected = this.auth.person.city_selected ? this.auth.person.city_selected.name : city;
    const state_selected = this.auth.person.city_selected ? this.auth.person.city_selected.state_id : state_id;
    let state = ""
    switch (state_selected) {
      case 1:
        state = "CU"
        break;
      case 2:
        state = "VC"
        break;
      case 3:
        state = "AT"
        break;
      case 4:
        state = "BO"
        break;
      case 5:
        state = "AN"
        break;
    }
    const { email } = this.auth.user;
    /**
     * 'payment_method' => 'bacs',
    'payment_method_title' => 'Direct Bank Transfer'
     */
    let payment_method_title;
    let payment_method;
    switch (this.paymentMethod) {
      case 'efectivo':
        payment_method = 'cod'
        payment_method_title = 'Contra Entrega'
        break;
      case 'Wompi':
        payment_method = 'payulatam';
        payment_method_title = 'PayU Latam'
        break;
      default:
        payment_method = 'bacs';
        payment_method_title = 'Direct Bank Transfer'
        break;
    }
    const obj_word_press = {
      payment_method,
      payment_method_title,
      first_name,
      last_name,
      phone,
      city: city_name_selected,
      state,
      address_1: this.auth.person.location.address,
      address_2: "abc 123",
      postcode: "00008",
      email,
      items: products_additionals,
      customer_id,
      set_paid: this.paymentMethod != 'efectivo',
    }

    console.log("Items", items)

    let first = "Recoger en " + this.shop_selected.profile_settings.store_name + " los productos ";
    first += products;
    let second = "Entregar los productos " + products
    const descriptions = {
      collect_description: first,
      delivery_description: second
    }
    address_array[0] = {
      title: '',
      address: this.shop_selected.profile_settings.find_address ? this.shop_selected.profile_settings.find_address : this.shop_selected.profile_settings.address.street_1,
      latitude: shop_Lat_Lng.lat,
      longitude: shop_Lat_Lng.lng,
      description: descriptions.collect_description,
      contact_name: this.shop_selected.profile_settings.store_name,
      contact_phone: this.shop_selected.profile_settings.phone,
    };
    address_array[1] = {
      title: '',
      address: this.auth.person.location.address,
      latitude: this.auth.person.location.latitude,
      longitude: this.auth.person.location.longitude,
      description: descriptions.delivery_description,
      contact_name: this.auth.user.name,
      contact_phone: this.auth.person.phone,
    };

    const parameters = {
      customer_id: user.id,
      service_type_id: 1,
      transport_type_id: 4,
      hourly_value: 0,
      number_hours: 0,
      driver_count: 0,
      city_id: this.auth.person.city_selected ? this.auth.person.city_selected.id : this.auth.person.city_id,
      round_trip: 0,
      distance: this.distance,
      duration: this.duration,
      diligence: 0,
      date: this.formatDated(),
      range: '09:30PM - 10:00PM',
      declared_value: 0,
      total: this.price_logistic,
      zapp_tool: 'Maleta de Alimentos',
      payment_method: this.paymentMethod,
      address_arr: address_array,
      branch_office_id: 0,
      zapp_store_order: 1,
      seller_id: this.shop_selected.ID ? this.shop_selected.ID : this.shop_selected.id,
      wc_order_id: 0,
      cash_handling: this.paymentMethod=="efectivo" ? 1:0,
      total_zapp_store: (this.coupon_discount ? (this.total - this.coupon_discount) : this.total),
      seller: this.shop_selected,
      products:this.auth.person.cart_items.map(p=> {
        return {...p, category:""}})
    };

    // Object.keys(parameters).map((key) => {
    //   if (key != 'address_arr' || key != 'seller') {
    //     parameters[key] = parameters[key].toString();
    //   }
    // });
    console.log("Parameters", parameters);
    console.log("Object WordPress", obj_word_press)
    const loader = await this.ui.loading("Por favor espere...");
    this.request.post("/?option=create_order", obj_word_press, true)
      .subscribe((res: any) => {
        console.log("Respuesta wordpress", res)
        parameters.wc_order_id = res.data.id;
        console.log("Parameters ", parameters)
        this.request.post("order/store_order", parameters)
          .subscribe(async (res: any) => {
            (await loader).dismiss();
            this.auth.person.cart_items = [];
            localStorage.removeItem("address_selected");
            localStorage.removeItem("shop");
            localStorage.removeItem("payment_method");

            localStorage.removeItem("couponRedimi");
            localStorage.removeItem("coupon");
            console.log("Order Zapp", res)


            this.auth.setPerson(this.auth.person);
            this.ui.showToast("Orden Creada", async () => {
              this.dismiss()
              this.view_order(res.data[0])
              const notifs = await LocalNotifications.schedule(
                  {
                  notifications:[{
                    title: "Orden " + res.data[0].id + " Creada",
                    body: "Estamos buscando el mensajero más cercano",
                    id: Math.round(Math.random() * 100),
                    autoCancel: true,
  
                  }]
                  }
                );

              // this.router.navigate(['/tabs/history']);
            })
          }, async (err: any) => {
            (await loader).dismiss();
            console.log("Error", err)
            if (err.error) {
              if (err.error.messages) {
                await this.ui.presentAlert({
                  mode: 'ios',
                  header: err.error.messages[0],
                  buttons: [
                    {
                      text: 'Aceptar',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: (blah) => {

                      }
                    },
                  ]
                })
                return;
              }
            }

            await this.ui.presentAlert({
              mode: 'ios',
              header: 'No se ha podido crear la orden',
              message: "Error de conexión o servidor",
              buttons: [
                {
                  text: 'Aceptar',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {

                  }
                },
              ]
            })

          })
      }, async err => {
        (await loader).dismiss();
        console.log("Error", err)
        if (err.error) {
          if (err.error.messages) {
            await this.ui.presentAlert({
              mode: 'ios',
              header: err.error.messages[0],
              buttons: [
                {
                  text: 'Aceptar',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {

                  }
                },
              ]
            })
            return;
          }
        }

        await this.ui.presentAlert({
          mode: 'ios',
          header: 'No se ha podido crear la orden en la tienda',

          buttons: [
            {
              text: 'Aceptar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {

              }
            },
          ]
        })
      })




  }

  get total() {
    console.log("Cupon",)
    return this.auth.person.total + (this.price_logistic ? this.price_logistic : 0)
  }

  isObjejctWithKeys(object) {
    return Object.keys(object).length > 0
  }

  formatDated() {
    let d = new Date(),
      day = '' + d.getDate(),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    console.log("Fecha", [year, month, day].join('-'))
    return [year, month, day].join('-');
  }

  keyUp() {
    this.error = false;
  }

  async showMap() {
    let icon = 'a.png';
    let data = {
      city: this.auth.person.city,
      latitude: this.auth.person.location ? this.auth.person.location.latitude : this.address.latitude,
      longitude: this.auth.person.location ? this.auth.person.location.longitude : this.address.longitude,
      icon: icon,
      address: this.auth.person.location ? this.auth.person.location.address : this.address.address
    };
    const modal = await this.ui.presentModal(MapPage, data, ['custom-modal'])
    modal.onDidDismiss().then(() => {
      if (localStorage.getItem('address_item')) {
        let address_item = JSON.parse(localStorage.getItem('address_item'));
        this.address.address = address_item.address;
        this.address.latitude = address_item.lat;
        this.address.longitude = address_item.lng;
        if(!this.auth.person.location){
          this.auth.person.location={};
        }
        this.auth.person.location.address = address_item.address;
        this.auth.person.location.latitude = address_item.lat;
        this.auth.person.location.longitude = address_item.lng;
        this.auth.setPerson(this.auth.person);
        // item.selected = true;
        this.address.favorite = address_item.favorite;
        localStorage.setItem("address_selected", JSON.stringify(this.address))
        this.getPrice()
        // item.address_invalid = false
        localStorage.removeItem('address_item');
      }
    })
  }

  add(item) {
    console.log("Product", item)
    item.quantity++;
    const index = this.auth.person.cart_items.findIndex(p => {
      return p.id == item.id;
    });

    if (index != -1) {
      this.auth.person.cart_items[index] = { ...this.auth.person.cart_items[index], quantity: item.quantity };
      this.auth.person.total = 0;
      this.auth.person.quantity = 0;
      if (this.auth.person.cart_items && this.auth.person.cart_items.length > 0) {
        this.auth.person.cart_items.map(p => {
          this.auth.person.total += (Number(p.quantity) * (Number(p.price) + (p.additional_price ? Number(p.additional_price) : 0)))
          this.auth.person.quantity += p.quantity;
          this.auth.setPerson(this.auth.person)
        })
      }

      this.auth.setPerson(this.auth.person);
    } else {
      console.log("No se ha encontrado");
    }
  }

  getPriceItem(item) {
    return (((Number(item.price) + Number(item.additional_price ? item.additional_price : 0)) * Number(item.quantity)));
  }

  sub(item) {
    if (item.quantity > 1) {
      item.quantity--;
      const index = this.auth.person.cart_items.findIndex(p => p.id == item.id);
      if (index != -1) {
        this.auth.person.cart_items[index] = { ...this.auth.person.cart_items[index], quantity: item.quantity };
        this.auth.person.total = 0;
        this.auth.person.quantity -= item.quantity;
        if (this.auth.person.cart_items && this.auth.person.cart_items.length > 0) {
          this.auth.person.cart_items.map(p => {
            this.auth.person.total += (p.quantity * (Number(p.price) + (p.additional_price ? p.additional_price : 0)))
            this.auth.setPerson(this.auth.person)
          })
        }
        this.auth.setPerson(this.auth.person);
      }
    } else {
      if (item.quantity == 1) {
        item.quantity--;
        if (this.auth.person.cart_items.length == 1) {
          this.auth.person.cart_items = [];
          this.auth.person.total = 0;
          this.auth.person.quantity = 0;
          localStorage.removeItem("address_selected");
          localStorage.removeItem("shop");
          localStorage.removeItem("payment_method");
          localStorage.removeItem("couponRedimi");
          localStorage.removeItem("coupon");
          this.auth.setPerson(this.auth.person);
          this.dismiss()
        } else {
          this.auth.person.total -= item.price;
          this.auth.person.quantity -= item.quantity;
          this.items = this.items.filter(i => i.id != item.id);
          this.auth.person.cart_items = this.auth.person.cart_items.filter(c => c.id != item.id);
          this.auth.setPerson(this.auth.person);
        }
        item.additional_price = 0;
        item.additionals_ids = [];
        item.radio_id = "";
      }
      this.auth.person.total = 0;
      this.auth.person.quantity = 0;
      if (this.auth.person.cart_items && this.auth.person.cart_items.length > 0) {
        this.auth.person.cart_items.map(p => {
          this.auth.person.total += (Number(p.quantity) * (Number(p.price) + (p.additional_price ? Number(p.additional_price) : 0)))
          this.auth.person.quantity += p.quantity;
          this.auth.setPerson(this.auth.person)
        })
      }
    }
  }

  async findPlace(message?) {
    let geocoder = new google.maps.Geocoder();
    //cuando usamos el buscador
    let latLng = new google.maps.LatLng(this.address.latitude, this.address.longitude);

    const loader = await this.ui.loading(message ? message : "Por favor espere...");
    var _this = this
    geocoder.geocode({ 'latLng': latLng }, async (results, status) => {
      (await loader).dismiss()
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results[0]);
        console.log("Este es el find place")
        _this.zone.run(() => {
          _this.address.address = results[0]['formatted_address']
          _this.address.latitude = results[0]['geometry'].location.lat()
          _this.address.longitude = results[0]['geometry'].location.lng()
          localStorage.setItem("address_selected", JSON.stringify(this.address))
        })

        // this.address.address = results[0]['formatted_address']
      } else {
        await this.ui.presentAlert({
          mode: 'ios',
          header: 'No se ha podido mostrar la información',
          buttons: [
            {
              text: 'Aceptar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {

              }
            },
          ]
        })
      }
    });
  }

  async saveFavoriteAddress(item) {
    if (item) {
      if (!item.favorite) {
        if (item.address && item.latitude && item.longitude) {
          await this.ui.presentAlert({
            mode: 'ios',
            header: 'Seleccionar esta dirección como favorita ',
            inputs: [
              {
                name: 'name_shorcut',
                id: 'name_shorcut',
                type: 'text',
                placeholder: 'Nombre de alias',
                mode: 'ios'
              },
              {
                name: 'description',
                id: 'description',
                type: 'textarea',
                placeholder: 'Descripción',
                mode: 'ios'
              },
            ],
            buttons: [
              {
                text: 'Registar',
                cssClass: 'secondary',
                handler: async (blah) => {
                  const obj = {
                    customer_id: this.auth.user.id,
                    address: item.address,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    name_shortcut: blah.name_shorcut,
                    description: blah.description
                  }
                  const loader = await this.ui.loading("Por favor espere...");

                  this.request.post('customer/add_favourite_address', obj)
                    .subscribe(async (res: any) => {
                      (await loader).dismiss()
                      console.log("Res ", res)
                      item.favorite = true;
                      localStorage.setItem("address_selected", JSON.stringify(this.address))

                      if (!this.auth.user.customer_addresses) {
                        this.auth.user.customer_addresses = []
                        // this.auth.user.user.customer_addresses = []
                      }
                      this.auth.user.customer_addresses.push(obj);
                      this.auth.setUser(this.auth.user);
                    }, async (err: any) => {
                      console.log("Err ", err);
                      (await loader).dismiss()
                      this.errorS.response(err)
                    })

                }
              },
            ]
          })
        } else {
          if (!item.address) {
            await this.ui.presentAlert({
              mode: 'ios',
              header: 'Seleccione una dirección',
              buttons: [
                {
                  text: 'Aceptar',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {

                  }
                },
              ]
            })
          }

        }
      }


    }

  }

  selectPaymentMethod(f){
    this.paymentMethod = f;
  }



}
