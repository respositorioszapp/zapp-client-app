import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { ErrorResponseService } from 'src/app/services/error-response.service';
import { RealtimeService } from 'src/app/services/realtime.service';
import { AuthService } from 'src/app/services/auth.service';
const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-transport-type',
  templateUrl: './transport-type.page.html',
  styleUrls: ['./transport-type.page.scss'],
})
export class TransportTypePage implements OnInit {
  transport_array: any[] = [];
  step = 1;
  quotation: any = {
    service_type: 'Recogida y entrega',
    service_type_id: '1',
    transport_type: 'Motorizado',
    transport_type_id: '4',
    city: 'Bogotá',
    city_id: '1',
    zapp_tool: 'Maleta de alimentos',
    accessory_id: '8',
    diligence: false,
    latitude: '',
    longitude: '',
    round_trip: false,
    address_arr: [],
    distance: '',
    duration: '',
    cargo_price: '50.000',
    dimension: '',
    branch_office_id : 1
  };

  constructor(private request: RequestService,
    private ui: UiService,
    private router: Router,
    private error: ErrorResponseService,
    private realtime: RealtimeService, private auth: AuthService) { }

  ionViewDidEnter() {
    this.hideCart()
  }

  async ionViewWillEnter() {

   
    this.quotation.city_id=this.auth.person.city_id;
    localStorage.removeItem("quotation");
    this.loadData()
    this.hideCart()
    localStorage.setItem('step', '1');
    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));
    }
  }

  async loadData() {
    this.transport_array = []
    const loader = await this.ui.loading("Por favor espere...")
    this.request.get("list/attributes?parameter_id=2")
      .subscribe(async (res: any) => {
        (await loader).dismiss();
        this.transport_array = res.data;
      }, async err => {
        (await loader).dismiss();
        const y = () => {
          this.loadData()
        }
        this.error.response(err, {
          methodReload: y
        })
        // await this.ui.presentAlert({
        //   mode: 'ios',
        //   header: 'No se ha podido cargar la información ',
        //   message: 'Por favor, revise su conexión',
        //   buttons: [
        //     {
        //       text: 'Intentar de nuevo',
        //       cssClass: 'secondary',
        //       handler: (blah) => {
        //         this.loadData()

        //       }
        //     },
        //   ]
        // })
      })

  }

  async ngOnInit() {
    localStorage.setItem('step', '1');

  }

  selectChange(e) {
    console.log(e);
  }

  hideCart() {

    this.auth.person.hide_cart = true;
    this.auth.setPerson(this.auth.person);
  }

  next(id) {
    this.quotation.transport_type_id = id;
    let obj = this.transport_array.find(
      (item) => item.id == this.quotation.transport_type_id
    );
    console.log("Obj", obj)
    this.quotation.transport_type = obj.name;
    localStorage.setItem('quotation', JSON.stringify(this.quotation));
    this.router.navigate(['/tabs/service-type']);
  }

}
