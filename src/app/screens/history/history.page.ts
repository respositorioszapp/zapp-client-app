import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { UiService } from 'src/app/services/ui.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ViewOrderPage } from 'src/app/dialogs/view-order/view-order.page';
import { DriverPopoverComponent } from 'src/app/components/driver-popover/driver-popover.component';
import { format, add } from 'date-fns'
import { RealtimeService } from 'src/app/services/realtime.service';
import { Subscription } from 'rxjs';
import { ErrorResponseService } from 'src/app/services/error-response.service';
import { QualificationPage } from 'src/app/dialogs/qualification/qualification.page';
import { element } from 'protractor';
import { DatetimeInputPage } from 'src/app/dialogs/datetime-input/datetime-input.page';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  orders: any[] = []
  dataParams: any = {
    total: 0,
    per_page: 5,
    page: 1,
    filters: [],
  };
  state = 0
  max

  min_date
  max_date
  subcription: Subscription
  store_states = {
    52: {
      message: "Tu orden ha sido recibida y pronto será confirmada.",
      json: "/assets/lottie-files/1-confirmed.json",
      state: 52,
      image: "/assets/imgs/1-confirmed.gif"
    },
    53: {
      message: "Tu orden ha sido confirmada y se está preparando.",
      json: "/assets/lottie-files/2-order-packed.json",
      state: 53,
      image: "/assets/imgs/2-order-packed.gif"
    },
    54: {
      message: "El mensajero va en camino a tu ubicación. ",
      json: "/assets/lottie-files/3-delivery-riding.json",
      state: 54,
      image: "/assets/imgs/3-delivery-riding.gif"
    },
    55: {
      message: "¡El mensajero ha llegado! Recibe tu pedido. ",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 55,
      image: "/assets/imgs/4-food-delivery.gif"
    },
    25: {
      message: "Finalizada",
      json: "/assets/lottie-files/5-ended.json",
      state: 55,
      image: "/assets/imgs/6-order_success.gif"
    },
    31: {
      message: "Cancelada",
      json: "/assets/lottie-files/5-ended.json",
      state: 55,
      image: "/assets/imgs/6-cancelled.gif"
    },
    36: {
      message: "Cancelada por mensajero",
      json: "/assets/lottie-files/5-ended.json",
      state: 55,
      image: "/assets/imgs/7-order-cancelled-delivery.gif"
    },
    48: {
      message: "Orden no efectiva",
      json: "/assets/lottie-files/5-ended.json",
      state: 48,
      image: "/assets/imgs/order_no_effective.gif"
    }

  }
  constructor(private request: RequestService,
    private ui: UiService,
    private auth: AuthService,
    private router: Router,
    private realtime: RealtimeService,
    private error: ErrorResponseService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.state = 0;
    this.dataParams.page = 1;
    const y = new Date();
    const maxf = add(y, {
      days: 1
    })
    this.min_date = this.formatDated(y);
    console.log("Fecha min", this.min_date)

    this.max_date = this.formatDated(maxf);
    console.log("Fecha max", this.max_date)

    const day = y.getDate();
    const month = y.getMonth() + 1;
    const year = y.getFullYear();
    console.log("Fecha max max")
    this.max = this.formatDated(this.max_date);
    this.orders = []

    this.loadData(true);
  }

  async changeTime(date,input){
    const modal = await this.ui.presentModal(DatetimeInputPage, {
       inputType:'date', 
    value:(date),
    title: 'Seleccione la fecha '
  }, ['modal-xs','height-date']);
    modal.onDidDismiss().then((data:any)=>{
      console.log("Date ", date,data)
      if(data){
        if(data.data.value){
          if(input=='min_date'){
            this.min_date=data.data.value;
            this.filterOrders(1);
          }else{
            this.max_date=data.data.value;
            this.filterOrders(2)
          }
        }
      }
    })
  }

  getTypeOf(item) {
    return typeof item;
  }

  getStoreState(item) {
    if (item.id == 1149) {
      console.log("Order", item.id, "Item Status", item.status_order)
      console.log("Status", this.store_states[item.status_order])
    }

    return this.store_states[item.status_order]
  }

  viewMore(item) {
    item.view_more = item.view_more ? 0 : 1;
  }

  filterFirstTwo(address_array: any[]) {
    return address_array.filter((a, i) => i >= 0 && i <= 1)
  }


  async cancel(order) {
    await this.ui.presentAlert({
      mode: 'ios',
      header: '¿Estás seguro que quieres cancelar la orden?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        },
        {
          text: 'Sí',
          handler: async (blah) => {
            await this.ui.presentAlert({
              mode: 'ios',
              header: '¿Por qué desea cancelarla?',
              inputs: [
                {
                  name: 'why',
                  id: 'paragraph',
                  type: 'textarea',
                  placeholder: 'Razón',
                  mode: 'ios'
                },
              ],
              buttons: [
                {
                  text: 'Enviar',
                  handler: async (res) => {

                    const data = new FormData();
                    data.append("description", res.why);
                    const obj = {
                      description: res.why
                    }
                    const loader = await this.ui.loading("Por favor espere...");
                    this.request.put('order/cancel_an_order/' + order.id, obj).subscribe(async res => {
                      (await loader).dismiss();
                      this.orders = this.orders.filter(o => o.status_order >= 22 && o.status_order < 25)
                    }, async err => {
                      (await loader).dismiss();

                      await this.ui.presentAlert({
                        mode: 'ios',
                        header: 'No se ha podido cancelar la orden',
                        buttons: [{
                          text: "Aceptar",
                          role: 'cancel',
                          handler: () => {

                          }
                        }]
                      })
                    })
                  }
                },
              ]
            })
          }
        },
      ]
    })
  }



  changeState(state) {
    this.orders = []
    this.state = state;
    this.dataParams.page = 1;

    this.loadData(true)
  }

  async loadData(starting, event?) {
    if (!starting) {
      this.dataParams.page++;
    }

    // this.orders = []
    let loader
    if (!event) {
      loader = await this.ui.loading("Por favor espere...");
    }
    if (this.subcription) {
      this.subcription.unsubscribe();
    }



    this.request.get(this.getUrl())
      .subscribe(async (res: any) => {
        if (!event) {
          (await loader).dismiss()
        }
        console.log("Orders", res.data.data)

        // res.data.data = res.data.data.filter(o => o.status_order == 25);
        res.data.data.map(o => {
          const details = o.detail ? o.detail : o.details;
          o.order_total = Number(o.total);
          o.total = Number(o.total)
          details.forEach(d => {
            o.total += Number(d.surplus_money);
          })
          this.orders.push(o);
        });
        this.orders.forEach((element) => {
          element.color = 'text-red';
          element.state_order = 'No asignada';
          if (element.status_order == '23') {
            element.color = 'text-orange';
            element.state_order = 'Asignada';
          } else if (element.status_order == '24') {
            element.color = 'text-yellow';
            element.state_order = 'En proceso';
          } else if (element.status_order == '25') {
            element.color = 'text-green';
            element.state_order = 'Finalizado';
          } else if (element.status_order == '36') {
            element.color = 'button-gray';
            element.state_order = 'Cancelada Msj';
          } else if (element.status_order == '31') {
            element.color = 'button-cancel';
            element.state_order = 'Cancelada';
          } else if (element.status_order == '48') {
          element.color = 'button-cancel';
          element.state_order = 'No efectiva';
        }

        });
        if (event) {
          event.target.complete();
        }
        this.realtime
          .getFirebaseCollectionObject("order_detail_report/")
          .subscribe((res: any) => {
            console.log("Res Detail Report", res);
            const objectArray = Object.keys(res);
            if (objectArray.length > 0) {
              objectArray.forEach(key => {
                console.log("Res Detail Report key ", key)
                const order = this.orders.find(o => o.id == Number(key));
                if (order) {
                  console.log("Res Detail Report Orden encontrada", order.id);
                  if (order.diligence == 1) {
                    const objectArrayKey = Object.keys(res[key]);
                    order.total = Number(order.order_total);
                    order.total_time=0;
                    objectArrayKey.forEach(keyObject => {
                      const detail = res[key][keyObject];
                      console.log("Res Detail Report Orden detalle", detail)
                      const money = detail.total_charge ? detail.total_charge : 0;
                      const timer = detail.timer;
                      order.total_time+= timer?timer.minutes:0;
                      order.total += Number(money);
                    })
                  }
                }
              })
            }
          })
        console.log("Url Subscribtion", "status_order_mobile/" + this.auth.person.city_id + "/" + this.auth.user.id)
        this.subcription = this.realtime
          .getFirebaseCollectionList("status_order_mobile/" + this.auth.person.city_id + "/" + this.auth.user.id)
          
          .subscribe((res: any[]) => {
            console.log("Res Subscription", res)

            if (res != null && res.length > 0) {
              console.log("Subscription 1")
              if (this.state == 0) {
                console.log("State 0")
                res.map(or => {
                  const order = this.orders.find(o => o.id == or.order_id);
                  if (order) {
                    console.log(or.order_id, "Find")
                    console.log("Find", or.order_id, or.order)
                    if (or.drivers && or.drivers.length > 0) {
                      order.drivers = or.drivers;
                    }
                    if (or.order.zapp_store_order == 0) {
                      console.log("Not Store")
                      order.status_order = or.status_order;
                      order.color = 'text-red';
                      order.state_order = 'No asignada';
                      if (order.status_order == '23') {
                        order.color = 'text-orange';
                        order.state_order = 'Asignada';
                      } else if (order.status_order == '24') {
                        order.color = 'text-yellow';
                        order.state_order = 'En proceso';
                      } else if (order.status_order == '25') {
                        order.color = 'text-green';
                        order.state_order = 'Finalizado';
                        this.showQualification(order);

                        // this.ui.showToast("La orden #" + or.order_id + " Ha sido finalizada, ahora puede verla en su historial", () => {
                        //   this.orders = this.orders.filter(o => o.status_order >= 22 && o.status_order < 25);
                        //   this.showQualification(order);
                        // })

                      } else if (order.status_order == '36') {
                        order.color = 'button-gray';
                        order.state_order = 'Cancelada Msj';
                      } else if (order.status_order == '31') {
                        order.color = 'button-cancel';
                        order.state_order = 'Cancelada';
                      } else if (order.status_order == '48') {
                        order.color = 'button-cancel';
                        order.state_order = 'No efectiva';
                      }
                    } else {
                      console.log(" Store", or)
                      if (!or.status_order) {
                        or.status_order = 52
                      }
                      order.status_order = or.status_order;
                      const order_index = this.orders.findIndex(o => o.id == or.order_id);
                      if (order_index != -1) {
                        this.orders[order_index].status_order = order.status_order;
                      }
                      console.log("Orders", this.orders)
                      console.log("Store Order", order)
                      order.color = 'text-red';
                    }

                  } else {
                    // if(this.dataParams.page==1){
                    //   this.orders.unshift(or.order)
                    // }
                    // console.log(or.order_id,"No encontrado")
                  }
                })
              } else {
                console.log("State not 0")
                console.log("Aquíiiii")
                res.map(or => {
                  const order = this.orders.find(o => o.id == or.order_id);
                  if (order) {
                    if (or.drivers && or.drivers.length > 0) {
                      order.drivers = or.drivers;
                    }
                    let message = "Su orden #" + order.id;
                    if (order.status_order != or.status_order) {
                      order.status_order = or.status_order;
                      order.color = 'text-red';
                      order.state_order = 'No asignada';

                      if (order.status_order == '23') {
                        order.color = 'text-orange';
                        order.state_order = 'Asignada';
                        message += " ha sido asignada";
                      } else if (order.status_order == '24') {
                        order.color = 'text-yellow';
                        order.state_order = 'En proceso';
                        message += " está en proceso";
                      } else if (order.status_order == '25') {
                        order.color = 'text-green';
                        message += "ha sido finalizada";
                        order.state_order = 'Finalizado';
                        this.showQualification(order);

                      } else if (order.status_order == '36') {
                        order.color = 'button-gray';
                        order.state_order = 'Cancelada Msj';
                      } else if (order.status_order == '31') {
                        order.color = 'button-cancel';
                        order.state_order = 'Cancelada';
                      }
                      if (order.status_order != '31') {
                        this.ui.showToast(message, () => {
                          this.orders = this.orders.filter(o => o.status_order == this.state)
                        });
                      } else {
                        this.orders = this.orders.filter(o => o.status_order == this.state)
                      }
                    }
                  }
                })

              }
            }
          })
      }, async (err) => {

        if (event && err.status && err.status == 400) {
          event.target.complete();
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

  formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return year + "-" + month + "-" + day;
  }

  format(date) {
    console.log("Date", date)
    var result = format(new Date(date), 'yyyy/MM/DD')
    return result
  }

  getUrl() {

    const start_date = this.min_date;
    const end_date = this.max_date;
    console.log("Data Params", this.dataParams);

    const url = "customer/orders_completed?customer_id=" + this.auth.user.id
      + "&start_date=" + start_date
      + "&end_date=" + end_date
      + "&per_page=10&page=" + this.dataParams.page
      + "&status_order=" + this.state
      + "&request_form='app-customer'"
    console.log("Url", url)
    return url

  }

  formatDated(date) {
    let d = new Date(date),
      day = '' + d.getDate(),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    console.log("Fecha", [year, month, day].join('-'))
    return [year, month, day].join('-');
  }

  showQualification(order) {
    console.log("Qualification")
    if (order.score_service) {
      return;
    } else {
      if (order.score_service > 0) {
        return;
      }
    }
    console.log("Pass")
    const driver = order.drivers[0]
    this.ui.presentModal(QualificationPage, { order, driver })

  }

  async filterOrders(index) {
    const date_1 = new Date(this.min_date);
    const date_2 = new Date(this.max_date);
    if (date_1 <= date_2) {
      this.dataParams.page = 1;
      this.orders = []
      const loader = await this.ui.loading("Por favor espere...");
      this.request.get(this.getUrl())
        .subscribe(async (res: any) => {
          (await loader).dismiss()
          console.log("res", res.data.data)
          // res.data.data = res.data.data.filter(o => o.status_order == 25);
          res.data.data.map(o => {
            const details = o.detail ? o.detail : o.details;
            o.order_total = Number(o.total);
            o.total = Number(o.total);
            details.forEach(d => {
              o.total += Number(d.surplus_money);
            })
            this.orders.push(o);
          });
          console.log("res", res.data.data)
          this.orders.forEach((element) => {
            element.color = 'text-red';
            element.state_order = 'No asignada';
            if (element.status_order == '23') {
              element.color = 'text-orange';
              element.state_order = 'Asignada';
            } else if (element.status_order == '24') {
              element.color = 'text-yellow';
              element.state_order = 'En proceso';
            } else if (element.status_order == '25') {
              element.color = 'text-green';
              element.state_order = 'Finalizado';
            } else if (element.status_order == '36') {
              element.color = 'button-gray';
              element.state_order = 'Cancelada Msj';
            } else if (element.status_order == '31') {
              element.color = 'button-cancel';
              element.state_order = 'Cancelada';
            } else if (element.status_order == '48') {
              element.color = 'button-cancel';
              element.state_order = 'No efectiva';
            }
          });
          this.realtime
            .getFirebaseCollectionObject("order_detail_report/")
            .subscribe((res: any) => {
              console.log("Res Detail Report", res);
              const objectArray = Object.keys(res);
              if (objectArray.length > 0) {
                objectArray.forEach(key => {
                  console.log("Res Detail Report key ", key)
                  const order = this.orders.find(o => o.id == Number(key));
                  if (order) {
                    console.log("Res Detail Report Orden encontrada", order.id);
                    if (order.diligence == 1) {
                      const objectArrayKey = Object.keys(res[key]);
                      order.total = Number(order.order_total);
                      order.total_time=0;
                      objectArrayKey.forEach(keyObject => {
                        const detail = res[key][keyObject];
                        console.log("Detail", detail)
                        const money = detail.total_charge ? detail.total_charge : 0;
                        order.total += Number(money);
                      })
                    }

                  }
                })
              }
            })
        }, async (err) => {
          (await loader).dismiss()


        })
    } else {
      await this.ui.presentAlert({
        mode: 'ios',
        header: 'Advertencia',
        message: 'La fecha de inicio debe ser menor a la fecha final',
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


  goToTransportType() {
    localStorage.setItem('step', '1');
    this.router.navigate(['tabs/transport-type'])
  }


  async view_order(order) {
    const modal = await this.ui.presentModal(ViewOrderPage, { order,fromHistory:true  }, ['custom-modal'])
    modal.onDidDismiss().then(r => {
      // this.loadData();
    });
  }

  view_driver(order) {
    console.log("R")
    const driver = order.drivers
    this.ui.presentPopover(DriverPopoverComponent, { driver, order })
  }

}
