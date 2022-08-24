import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5/dist/md5';
import { LocalNotifications} from '@capacitor/local-notifications';
import { ErrorResponseService } from 'src/app/services/error-response.service';
import { HttpClient } from '@angular/common/http';
import { ViewOrderPage } from 'src/app/dialogs/view-order/view-order.page';
import { CloseShopPage } from 'src/app/dialogs/close-shop/close-shop.page';
import ModalOptions from 'src/app/interfaces/ModalOptions';
import { LittleAlertPage } from 'src/app/dialogs/little-alert/little-alert.page';


@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {

  loading = false;
  quotation: any = {};
  coupon
  address_arr: any = [
    { address: '', description: '', latitude: '', longitude: '', hover: false },
    { address: '', description: '', latitude: '', longitude: '', hover: false },
  ];
  az_arr = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  total = 0;
  error = false

  kmadd_base_total = 0;
  neighboring = 0;
  rate_base = 5300;
  kmadd_base = 1035;
  neighboring_base = 0;
  distance = 0;
  duration = 0;
  price_per_transport_type: any = {};
  payment_method = "efectivo"
  taxes: any = {};
  firstTime = true
  params: any
  couponRedimi = false
  constructor(private ui: UiService,
    private auth: AuthService,
    private router: Router,
    private request: RequestService,
    private iab: InAppBrowser,
    private route: ActivatedRoute,
    private errorS: ErrorResponseService,
    private http: HttpClient) {

  }

  ngOnInit() {

    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));
      console.log("Quotation", this.quotation)
    }

  }

  async ionViewDidEnter() {
    this.couponRedimi = false;
    await LocalNotifications.requestPermissions();
    this.route.queryParams.subscribe(res => {
      this.params = res;
      console.log("Query params", res)
    });
    if (Object.keys(this.params).length > 0) {
      if (this.params.lapTransactionState == "APPROVED") {
        this.payment_method = "Wompi"
        this.createOrder()
      }

    } else {
      if (localStorage.getItem('quotation')) {
        this.quotation = JSON.parse(localStorage.getItem('quotation'));
        console.log("Quotation", this.quotation)
        if (this.quotation.couponRedimi) {
          this.couponRedimi = this.quotation.couponRedimi
        }
        // this.loadMap();



      }
    }



  }

  selectPaymentMethod(method) {
    this.payment_method = method;
    if (this.payment_method != "Transferencia bancaria") {
      this.pay()
    }

  }

  async logOut() {

    const modal = await this.ui.presentModal(LittleAlertPage, {}, ["modal-xxs", "box-shadow-modal"])
  }

  async showConfirmDiligence() {
    const obj: ModalOptions = {
      image: 'assets/imgs/campana.png',
      imageClass: 'image-alert',
      message: 'El tiempo de espera tiene un costo y el mismo debe ser cancelado en efectivo',
      imageDivClass: 'div-image-alert',
      affirmativeText: "Aceptar",
      negativeText: "Cancelar",
      modalWithButtons: true,
      affirmativeMethod: () => {
        if (this.payment_method != 'Wompi') {
          this.createOrder();
        } else {
          this.payment();
        }
      }
    }
    const modal = await this.ui.presentModal(LittleAlertPage, obj, ["modal-xxxs", "box-shadow-modal"])
  }

  async view_order(order) {
    const modal = await this.ui.presentModal(ViewOrderPage, { order }, ['custom-modal'])
    modal.onDidDismiss().then(r => {
      // this.loadData();
    });
  }

  async createOrder() {

    const { user } = this.auth;
    console.log('User', user);
    const parameters = {
      customer_id: user.id,
      service_type_id: this.quotation.service_type_id,
      transport_type_id: this.quotation.transport_type_id,
      cash_handling: this.payment_method == "efectivo" ? 1 : 0,
      hourly_value:
        this.quotation.service_type_id == 3
          ? this.quotation.transport_type
            ? this.quotation.transport_type
            : 0
          : 0,
      number_hours: this.quotation.number_hour
        ? this.quotation.number_hour
        : 0,
      driver_count: this.quotation.driver_count
        ? this.quotation.driver_count
        : 0,
      city_id: this.quotation.city_id,
      round_trip: this.quotation.round_trip ? 1 : 0,
      distance: this.quotation.distance ? this.quotation.distance : 0,
      duration: this.quotation.duration ? this.quotation.duration : 0,
      diligence: this.quotation.diligence ? 1 : 0,
      date: this.quotation.date ? this.quotation.date : '2020-07-17',
      range: this.quotation.hour ? this.quotation.hour : '09:30PM - 10:00PM',
      declared_value: this.quotation.cargo_price
        ? this.quotation.cargo_price
        : 0,
      total: this.quotation.total ? this.quotation.total : 0,
      zapp_tool: this.quotation.accessory_id ? this.quotation.accessory_id : '',
      payment_method: this.payment_method,
      address_arr:
        this.quotation.service_type_id == 3
          ? this.quotation.driver_count_array
          : this.quotation.address_arr,
      branch_office_id: this.auth.role.id == 4 ? this.quotation.branch_office_id ? this.quotation.branch_office_id : 0 : 0
    };
    if (parameters.service_type_id != 3) {
      parameters.address_arr = parameters.address_arr.map((address) => {
        return {
          title: '',
          address: address.address,
          latitude: address.latitude.toString(),
          longitude: address.longitude.toString(),
          description: address.description,
          contact_name: address.contact_name,
          contact_phone: address.contact_phone,
          start_time: '',
          departure_time: '',
          total: 0,
          start_time_military_format: '',
          departure_time_military_format: '',
          number_of_hours: 0,
        };
      });
    } else {
      const array = [];
      for (let i = 0; i < parameters.address_arr.length; i++) {
        const driver = parameters.address_arr[i].driver;
        for (
          let j = 0;
          j < parameters.address_arr[i].address_array.length;
          j++
        ) {
          const start_time = parameters.address_arr[i].address_array[j].start_time_military_format;
          const start_time_split = start_time.split(" ");
          const start_time_value = start_time_split.length > 1 ? start_time_split[1] : start_time_split[0]
          const departure_time = parameters.address_arr[i].address_array[j].departure_time_military_format;
          const departure_time_split = departure_time.split(" ");
          const departure_time_value = departure_time_split.length > 1 ? departure_time_split[1] : departure_time_split[0]
          array.push({
            title: driver,
            address: parameters.address_arr[i].address_array[j].address,
            latitude: parameters.address_arr[i].address_array[
              j
            ].latitude.toString(),
            longitude: parameters.address_arr[i].address_array[
              j
            ].longitude.toString(),
            description:
              parameters.address_arr[i].address_array[j].description,
            contact_name: parameters.address_arr[i].address_array[j].contact_name,
            contact_phone: parameters.address_arr[i].address_array[j].contact_phone,
            start_time: parameters.address_arr[i].address_array[j].start_time,
            departure_time: parameters.address_arr[i].address_array[j].departure_time,
            total: parameters.address_arr[i].address_array[j].total,
            start_time_military_format: start_time_value,
            departure_time_military_format: departure_time_value,
            number_of_hours: parameters.address_arr[i].address_array[j].number_of_hours,
          });

          /**
           * start_time:parameters.address_arr[i].address_array[j].start_time,
            departure_time:parameters.address_arr[i].address_array[j].departure_time,
            total:parameters.address_arr[i].address_array[j].total,
            start_time_military_format:parameters.address_arr[i].address_array[j].start_time_military_format,
            departure_time_military_format:parameters.address_arr[i].address_array[j].departure_time_military_format,
            number_of_hours:parameters.address_arr[i].address_array[j].number_of_hours,
           */
        }
      }
      parameters.address_arr = array;
    }
    //Only when is time service
    if (parameters.service_type_id == 3) {
      // Set the range with the first start time choosed and the last departure time choosed
      parameters.range = `${parameters.address_arr[0].start_time} - ${parameters.address_arr[parameters.address_arr.length - 1].departure_time}`
    }
    if (parameters.round_trip == 1) {
      //Duplicate the first address to do a round trip
      parameters.address_arr.push(parameters.address_arr[0]);
    }
    Object.keys(parameters).map((key) => {
      if (key != 'address_arr') {
        parameters[key] = parameters[key].toString();
      }
    });
    console.log(parameters);
    const loader = await this.ui.loading("Por favor espere...");
    this.request.post("order/store_order", parameters)
      .subscribe(async (res: any) => {
        (await loader).dismiss();
        localStorage.removeItem('quotation');
        this.ui.showToast("Orden Creada", async () => {
          this.view_order(res.data[0])
          const notifs = await LocalNotifications.schedule({
            notifications: [
              {
                title: "Orden " + res.data[0].id + " Creada",
                body: "Estamos buscando el mensajero más cercano",
                id: Math.round(Math.random() * 100),
                autoCancel: true,

              }
            ]
          });
          //this.router.navigate(['/tabs/history']);
        })
      }, async (err: any) => {
        (await loader).dismiss();
        console.log("ERror", err)
        if (err.error) {
          if (err.error.messages) {
            this.ui.showToast(err.error.messages[0])
            return;
          }
        }

        await this.ui.presentAlert({
          mode: 'ios',
          header: 'No se ha podido crear la orden',
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

  pay() {
    if (this.quotation.diligence) {
      this.showConfirmDiligence();
    } else {
      if (this.payment_method != 'Wompi') {
        this.createOrder();
      } else {
        this.payment();
      }
    }

    console.log('PAy', this.payment_method);
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
          APPROVED: "Aprobada",
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
            backdropDismiss: transaction.status != "PENDING",
            buttons: [
              {
                text: transaction.status == "PENDING" ? 'Reintentar' : 'Aceptar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  this.searchTransaction(url, transactionId);
                }
              },
            ]
          })
        }
        console.log("event url transaction", res)
      }, async err => {
        (await loader.dismiss());
        console.log("event url error", err)
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
    let referenceCode = this.generateGuid();
    let total = (this.quotation.total) * 100;
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
      location: 'yes',
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
      toolbarposition: 'bottom',
      toolbarcolor: "#49158c"
    });

    browser.on('loadstart').subscribe(async event => {
      console.log("event url", event.url)

      // browser.close();

      if (event.url.includes(responseUrl)) {
        browser.close();
        //https://demoewc.tech/payu_response_url.php?id=110687-1618580707-65217&env=test
        const id = event.url.replace(responseUrl + "?", "").split("&")
          .find(d => d.includes("id=")).replace("id=", "");
        console.log("event url Id", id)
        this.searchTransaction(urlToFind, id)
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

  keyUp() {
    this.error = false;
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
          if (coupon.type_value_id == 40) {
            if (Number(coupon.value) <= this.quotation.total) {
              this.quotation.total = this.quotation.total - Number(coupon.value);
            } else {
              this.quotation.total = 0;
            }
          } else {
            this.quotation.total = this.quotation.total - (this.quotation.total * (Number(coupon.value) / 100));
          }
          this.quotation.couponRedimi = true;
          this.quotation.coupon = coupon;
          localStorage.setItem("quotation", JSON.stringify(this.quotation))
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

}
