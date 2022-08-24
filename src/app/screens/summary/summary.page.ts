import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { PriceService } from 'src/app/services/price.service';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorResponseService } from 'src/app/services/error-response.service';
declare var google: any;
@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
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
  taxes: any = {};
  coupon
  total_discount = 0
  transport_type_id = 4
  configuration_data: any = {}
  constructor(private request: RequestService, private ui: UiService, private router: Router,
    private price: PriceService, private auth: AuthService, private errorS : ErrorResponseService) { }

  ngOnInit() {
    localStorage.setItem('step', '7');
  }

  hideCart() {

    this.auth.person.hide_cart = true;
    this.auth.setPerson(this.auth.person);
  }

  async ionViewDidEnter() {
    this.hideCart()
    localStorage.setItem('step', '7');
    const loader = await this.ui.loading("Por favor espere...");
    this.request.get("get_pricing_for_order")
      .subscribe(async (res: any) => {
        (await loader).dismiss();
        if (localStorage.getItem('quotation')) {
          this.quotation = JSON.parse(localStorage.getItem('quotation'));
          this.transport_type_id = this.quotation.transport_type_id;
          console.log("Configuration Data", this.auth.user.configuration_data)
          this.configuration_data = this.auth.user.configuration_data.find(c => c.transport_type_id == this.quotation.transport_type_id)
          if (!this.configuration_data) {
            this.configuration_data = res.data.find(c => c.transport_type_id == this.quotation.transport_type_id);
          }
          localStorage.setItem("configuration_data", JSON.stringify(this.configuration_data));
          let rate_base = this.configuration_data.rate_base ? Number(this.configuration_data.rate_base) : Number(this.configuration_data.rate_base);
          this.rate_base = rate_base;
          let km_base = this.configuration_data.minimal_distance ? Number(this.configuration_data.minimal_distance) : Number(this.configuration_data.km_base);
          let km_unit_value = this.configuration_data.value_per_distance ? Number(this.configuration_data.value_per_distance) : Number(this.configuration_data.km_unit_value);
          let neighboring_base = this.configuration_data.peripheries ? Number(this.configuration_data.peripheries) : Number(this.configuration_data.neighboring_base);
          this.rate_base = Number(this.configuration_data.rate_base);
          this.neighboring_base =neighboring_base;
          if (this.quotation.address_arr.length > 0) {
            this.address_arr = this.quotation.address_arr;
          }
          if (this.quotation.transport_type == 'Automóvil') {
            // this.rate_base = this.rate_base  + (this.rate_base * 0.30);
            //this.kmadd_base = this.kmadd_base + (this.kmadd_base * 0.30);
            //this.neighboring_base = this.neighboring_base + (this.neighboring_base * 0.30);
          }
          this.quotation.distance = Math.round(this.quotation.distance);
          console.log("Unity", this.quotation.unity.toLowerCase())
          const distance = this.quotation.unity && this.quotation.unity.toLowerCase()!="km" ? this.quotation.distance/1000:this.quotation.distance;  
          if (distance > km_base) {
            if (this.quotation.transport_type == 'Motorizado' || this.quotation.transport_type == 'Carry') {
              this.kmadd_base_total = Math.abs(distance - km_base) * km_unit_value
              this.kmadd_base_total = Math.round(this.kmadd_base_total);
            } else {
              if (this.quotation.transport_type == 'Automóvil') {
                this.kmadd_base_total =
                  km_unit_value * Math.abs(distance - km_base) + Math.abs(distance - km_base) * (km_unit_value * 0.25);
                this.kmadd_base_total = Math.round(this.kmadd_base_total)
                console.log("Distance charge", this.kmadd_base_total)
              }
            }
          } else {
            this.kmadd_base_total = 0;
          }
          if (this.quotation.address_arr.length > 0) {
            //comparo que esten las direcciones en la misma ciudad
            for (let i = 0; i < this.quotation.address_arr.length; i++) {
              let item = this.quotation.address_arr[i].address.split(',');
              const address:string = this.quotation.address_arr[i].address.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
              const city = this.quotation.city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(" d.c.", "");
              console.log("City address", address, "City", city, "Includes",!address.includes(city))
              if (!address.includes(city)) {
                this.neighboring = 1;
              }
            }
            console.log(
              this.quotation.distance,
              this.quotation.transport_type,
              this.neighboring,
              neighboring_base
            );

          }
          
          // this.loadMap();
          this.total = await this.price.calculate_price(
            distance,
            this.quotation.transport_type,
            this.neighboring,
            this.quotation.diligence,
            this.transport_type_id
          );
          if (this.quotation.couponRedimi) {
            this.coupon = this.quotation.coupon
            if (this.coupon) {
              let previous_total = 0;
              if (this.coupon.type_value_id == 40) {
                previous_total = this.quotation.total + Number(this.coupon.value);
              } else {
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

        }

      }, async err => {
        (await loader).dismiss();
        this.errorS.response(err);
      })
  }

  payment() {
    this.quotation.total = this.total;
    this.quotation.rate_base = this.rate_base;
    this.quotation.kmadd_base_total = this.kmadd_base_total;
    this.quotation.neighboring_base = this.neighboring? this.neighboring_base:0;
    localStorage.setItem('quotation', JSON.stringify(this.quotation));
    this.router.navigate(['/tabs/select-payment']);
  }




  transform(value: any) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

}
