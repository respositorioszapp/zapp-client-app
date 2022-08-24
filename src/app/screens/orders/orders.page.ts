import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { UiService } from 'src/app/services/ui.service';
import { AuthService } from 'src/app/services/auth.service';
import { ViewOrderPage } from 'src/app/dialogs/view-order/view-order.page';
import { DriverPopoverComponent } from 'src/app/components/driver-popover/driver-popover.component';
import { Router } from '@angular/router';
import { RealtimeService } from 'src/app/services/realtime.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {
  orders: any[] = []
  subscription: Subscription
  constructor(private request: RequestService,
    private ui: UiService,
    private auth: AuthService,
    private router: Router,
    private realtime: RealtimeService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.hideCart()
    this.loadData();
    if(this.subscription){
      this.subscription.unsubscribe()
    }
    this.subscription = this.realtime
      .getFirebaseCollectionList("status_order_mobile/" + this.auth.person.city_id + "/" + this.auth.user.id)
      
      .subscribe((res: any[]) => {
        if (res != null && res.length > 0) {
          if (this.orders.length > 0) {
            res.map(or => {
              const order = this.orders.find(o => o.id == or.order_id);
              if (order) {
                if(or.drivers && or.drivers.length > 0){
                  order.drivers = or.drivers;
                }
                order.status_order = or.status_order;
                order.color = 'button-red';
                order.state_order = 'No asignada';
                if (order.status_order == '23') {
                  order.color = 'button-orange';
                  order.state_order = 'Asignada';
                } else if (order.status_order == '24') {
                  order.color = 'button-yellow';
                  order.state_order = 'En proceso';
                } else if (order.status_order == '25') {
                  order.color = 'button-green';
                  order.state_order = 'Finalizado';
                  this.ui.showToast("La orden #" + or.order_id + " Ha sido finalizada, ahora puede verla en su historial", () => {
                    this.orders = this.orders.filter(o => o.status_order >= 22 && o.status_order < 25);
                  })
                } else if (order.status_order == '36') {
                  order.color = 'button-gray';
                  order.state_order = 'Cancelada Msj';
                } else if (order.status_order == '31') {
                  order.color = 'button-cancel';
                  order.state_order = 'Cancelada';
                }
              }
            })

          }
        }
      })
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave")
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }

  hideCart(){
    
    this.auth.person.hide_cart = true;
    this.auth.setPerson(this.auth.person);
  }

  viewMore(item){
    item.view_more = item.view_more ? 0 : 1;
  }

  filterFirstTwo(address_array :any[]){
    return address_array.filter((a,i) => i>=0 && i<=1 )
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
                    const obj ={
                      description : res.why
                    }
                    const loader = await this.ui.loading("Por favor espere...");
                    this.request.put('order/cancel_an_order/'+ order.id, obj).subscribe(async res => {
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


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  async loadData() {
    this.orders = []
    const loader = await this.ui.loading("Por favor espere...");
    this.request.get("order?customer_id=" + this.auth.user.id + "&per_page=25").subscribe(async (res: any) => {
      (await loader).dismiss()
      console.log("res", res.data.data)
      this.orders = res.data.data;
      this.orders = this.orders.filter(o => o.status_order >= 22 && o.status_order < 25)
      this.orders.forEach((element) => {
        element.color = 'button-red';
        element.state_order = 'No asignada';
        if (element.status_order == '23') {
          element.color = 'button-orange';
          element.state_order = 'Asignada';
        } else if (element.status_order == '24') {
          element.color = 'button-yellow';
          element.state_order = 'En proceso';
        } else if (element.status_order == '25') {
          element.color = 'button-green';
          element.state_order = 'Finalizado';
        } else if (element.status_order == '36') {
          element.color = 'button-gray';
          element.state_order = 'Cancelada Msj';
        } else if (element.status_order == '31') {
          element.color = 'button-cancel';
          element.state_order = 'Cancelada';
        }
      });
    }, async (err) => {
      (await loader).dismiss()
    })
  }


  goToTransportType() {
    localStorage.setItem('step', '1');
    this.router.navigate(['tabs/transport-type'])
  }


  async view_order(order) {
    const modal = await this.ui.presentModal(ViewOrderPage, { order }, ['custom-modal'])
    modal.onDidDismiss().then(r => {
      this.orders = this.orders.filter(o => o.status_order >= 22 && o.status_order < 25)
    });
  }

  view_driver(order) {
    const driver = order.drivers
    this.ui.presentPopover(DriverPopoverComponent, { driver })
  }

}
