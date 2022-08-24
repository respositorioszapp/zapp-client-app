import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Md5 } from 'ts-md5/dist/md5';
import { environment } from 'src/environments/environment';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
declare var google: any;
@Component({
  selector: 'app-select-payment',
  templateUrl: './select-payment.page.html',
  styleUrls: ['./select-payment.page.scss'],
})
export class SelectPaymentPage implements OnInit {
  loading = false;
  quotation: any = {};
  
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
  coupon
  total_discount = 0
  constructor(private ui: UiService,
    private auth: AuthService,
    private router: Router,
    private request: RequestService,
    private iab: InAppBrowser,) { }

  ngOnInit() {
    localStorage.setItem('step', '8');
    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));
      console.log("Quotation", this.quotation)
    }

  }

  hideCart(){
    
    this.auth.person.hide_cart = true;
    this.auth.setPerson(this.auth.person);
  }

  ionViewDidEnter() {
    localStorage.setItem('step', '8');
    this.hideCart()
    
    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));
      console.log("Quotation", this.quotation)
      if(this.quotation.couponRedimi){
        this.coupon = this.quotation.coupon
        if (this.coupon) {
          let previous_total = 0;
          if (this.coupon.type_value_id == 40) {
            previous_total = this.quotation.total + Number(this.coupon.value);
          }else{
            previous_total = this.quotation.total + (this.quotation.total * (Number(this.coupon.value) / 100));
          }
          if (this.coupon.type_value_id == 40) {
            if (Number(this.coupon.value) <= previous_total) {
              this.total_discount = Number(this.coupon.value);
              this.total = this.total - this.total_discount;
            } else {
              this.total_discount = this.total;
              this.total = 0;
              // this.quotation.total = 0;
            }
          } else {
            this.total_discount = (this.quotation.total * (Number(this.coupon.value) / 100));
          }
        }
      }
      // this.loadMap();
      
      

    }

  }

  selectPaymentMethod() {
    /**
     * {
        text: 'Pay U',
        icon: 'card-outline',
        handler: () => {
          this.payment_method = "Wompi";
          this.pay()
        }
      },
     */
   this.router.navigate(['tabs/payment-method'])
  }

  async createOrder() {

    const { user } = this.auth;
    console.log('User', user);
    const parameters = {
      customer_id: user.id,
      service_type_id: this.quotation.service_type_id,
      transport_type_id: this.quotation.transport_type_id,
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
      declared_value: this.quotation.declared_value
        ? this.quotation.declared_value
        : 0,
      total: this.quotation.total ? this.quotation.total : 0,
      zapp_tool: this.quotation.accessory_id ? this.quotation.accessory_id : '',
      payment_method: this.payment_method,
      address_arr:
        this.quotation.service_type_id == 3
          ? this.quotation.driver_count_array
          : this.quotation.address_arr,
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
          });
        }
      }
      parameters.address_arr = array;
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
        this.ui.showToast("Orden Creada", () => {
          localStorage.removeItem('quotation');
          this.router.navigate(['/tabs/orders']);
        })
      }, async (err: any) => {
        (await loader).dismiss();
        if(err.error.messages){
          this.ui.showToast(err.error.messages[0])
          return;
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
    if (this.payment_method != 'pa') {
      this.createOrder();
    } else {
      this.payment();
    }
    console.log('PAy', this.payment_method);
  }

  generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  payment() {
    //Extract credentials from environment

    let {
      accountId,
      merchantId,
      apiKey,
      responseUrl,
      confirmationUrl,
      postUrl
    } = environment.payUCredentials;
    let referenceCode = this.generateGuid();

    let currency = 'COP';
    //Concat variables to generate a hash MD5 for signature
    let conca = apiKey + '~' + merchantId + '~' + referenceCode + '~' + this.quotation.total + '~' + currency;
    console.log("Conca", conca)
    let signature = Md5.hashStr(conca);
    console.log("Signature", signature.toString())
    let email = this.auth.user.email;
    let names = this.auth.person.first_name + this.auth.person.last_name;
    let description = 'Order' + referenceCode;
    let total = this.quotation.total;
    let test = (environment.production ? 0 : 1);
    const paymentData = {
      accountId,
      merchantId,
      responseUrl,
      confirmationUrl,
      currency,
      referenceCode,
      tax: 0,
      taxReturnBase: 0,
      description,
      signature,
      buyerFullName: names,
      buyerEmail: email,
      test: (environment.production ? 0 : 1),
      amount: this.quotation.total
    }
    // localStorage.setItem("paymentData", JSON.stringify(paymentData));
    // this.router.navigate(['/pay-u']);
    let paymentString = `
            <html>
              <body>
                <form action="${postUrl}" method="post" id="payu_form">
                <input name="referenceCode"    type="hidden"  value="${referenceCode}"   >
                  <input name="merchantId"    type="hidden"  value="${merchantId}"   >
                  <input name="accountId"     type="hidden"  value="${accountId}" >
                  <input name="currency"      type="hidden"  value="${currency}">
                  <input name="tax"           type="hidden"  value="0"  >
                  <input name="taxReturnBase" type="hidden"  value="0" >

                  <input type="hidden" name="description" value="${description}"/>  
                  <input type="hidden" name="signature" value="${signature}"/>
                  <input type="hidden" name="buyerFullName" value="${names}"/>
                  <input type="hidden" name="buyerEmail" value="${email}"/>
                  <input name="test"          type="hidden"  value="0" >
                  <input type="hidden" name="amount" value="${total}"/>
                  <input name="responseUrl"    type="hidden"  value="${responseUrl}" >
                  <input name="confirmationUrl"    type="hidden"  value="${confirmationUrl}" >
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

    browser.on('loadstart').subscribe(event => {
      console.log("event", event)
      browser.close();
      //this.createOrder()
      // if (event.url === responseUrl) {
      //   browser.close();
        
      // }
    });



  }

  transform(value: any) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }


  

}
