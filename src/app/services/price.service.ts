import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { UiService } from './ui.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  taxes: any = {}
  constructor(private request: RequestService, private ui: UiService,
    private auth: AuthService) {


  }

  async calculate_price(km, transport_type, neighboring, diligence, transport_type_id) {
    return this.getTotal(km, transport_type, neighboring, diligence, transport_type_id);
  }

  async getTotalStore(km, transport_type, neighboring, diligence, transport_type_id) :Promise<number>{
    // const loader = await this.ui.loading("Por favor espere...");
    let price = 0;
    return new Promise((resolve, reject) => {
      this.request.get("get_pricing_for_order")
      .subscribe(async (res: any) => {
        // (await loader).dismiss()
        console.log("Res", res)
        const configuration_data = res.data.find(t => t.transport_type_id == transport_type_id);
        let rate_base = configuration_data.rate_base ? Number(configuration_data.rate_base) : Number(configuration_data.rate_base);
        let km_base = configuration_data.minimal_distance ? Number(configuration_data.minimal_distance) : Number(configuration_data.km_base);
        let km_unit_value = configuration_data.value_per_distance ? Number(configuration_data.value_per_distance) : Number(configuration_data.km_unit_value);
        let neighboring_base = configuration_data.peripheries ? Number(configuration_data.peripheries) : Number(configuration_data.neighboring_base);
        console.log("Taxes", this.auth.user.taxes)
        var kmrecorrido = 0;
        if (transport_type == 'Motorizado' || transport_type == 'Carry') {
          if (km > km_base) {
            kmrecorrido = Math.abs(km - km_base);
            price = rate_base + kmrecorrido * km_unit_value;
            console.log("Price Carry", price)
          } else {
            price = rate_base;
          }


          if (neighboring == 1) {
            price = price + neighboring_base;
          }
        } else if (transport_type == 'Automóvil') {
          if (km > km_base) {
            kmrecorrido = Math.abs(km - km_base);
            const distance_charge = (km_unit_value * kmrecorrido + kmrecorrido * (km_unit_value * 0.25));
            console.log("Distance chage price", distance_charge)
            price = rate_base + distance_charge;
            price = Math.round(price);
          } else {
            price = rate_base;
          }
          if (neighboring == 1) {
            price = price + neighboring_base;
          }
          // price = price + (price * 0.20);
        }
        console.log("Price Distance", km)
        console.log('price es :' + price + ' rate ' + km_unit_value);
        // price = diligence ? price + 12000 : price;
        resolve(price);
      }, async err => {
        resolve(price);
      })
    })
    
  }

  getTotal(km, transport_type, neighboring, diligence, transport_type_id) {
    var price = 0;
    let configuration_data = this.auth.user.configuration_data.find(c => c.transport_type_id == transport_type_id);
    if (!configuration_data) {
      if (localStorage.getItem("configuration_data")) {
        configuration_data = JSON.parse(localStorage.getItem("configuration_data"))
      }
    }
    let rate_base = configuration_data.rate_base ? Number(configuration_data.rate_base) : Number(configuration_data.rate_base);
    let km_base = configuration_data.minimal_distance ? Number(configuration_data.minimal_distance) : Number(configuration_data.km_base);
    let km_unit_value = configuration_data.value_per_distance ? Number(configuration_data.value_per_distance) : Number(configuration_data.km_unit_value);
    let neighboring_base = configuration_data.peripheries ? Number(configuration_data.peripheries) : Number(configuration_data.neighboring_base);
    console.log("Taxes", this.auth.user.taxes)
    var kmrecorrido = 0;
    if (transport_type == 'Motorizado' || transport_type == 'Carry') {
      if (km > km_base) {
        kmrecorrido = Math.abs(km - km_base);
        price = rate_base + kmrecorrido * km_unit_value;
        console.log("Price Carry", price)
      } else {
        price = rate_base;
      }


      if (neighboring == 1) {
        price = price + neighboring_base;
      }
    } else if (transport_type == 'Automóvil') {
      if (km > km_base) {
        kmrecorrido = Math.abs(km - km_base);
        const distance_charge = (km_unit_value * kmrecorrido + kmrecorrido * (km_unit_value * 0.25));
        console.log("Distance chage price", distance_charge)
        price = rate_base + distance_charge;
        price = Math.round(price);
      } else {
        price = rate_base;
      }
      if (neighboring == 1) {
        price = price + neighboring_base;
      }
      // price = price + (price * 0.20);
    }

    console.log('price es :' + price + ' rate ' + km_unit_value);
    // price = diligence ? price + 12000 : price;
    return price;
  }
}
