import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.page.html',
  styleUrls: ['./service-type.page.scss'],
})
export class ServiceTypePage implements OnInit {
  service_array: any[] = [];
  loading = false;
  quotation: any = {};
  constructor(private ui: UiService, private request: RequestService, private router: Router, private auth : AuthService) { }

  async ngOnInit() {
    localStorage.setItem('step', '2');
  }

  async ionViewWillEnter() {
    this.hideCart()
    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));
    }
    this.loadData()
    
  }

  hideCart(){
    
    this.auth.person.hide_cart = true;
    this.auth.setPerson(this.auth.person);
  }

  async loadData(){
    this.service_array = []
    const loader = await this.ui.loading("Por favor espere...")
    this.request.get("list/attributes?parameter_id=1")
      .subscribe(async (res: any) => {
        (await loader).dismiss();
        this.service_array = res.data;
      }, async err => {
        (await loader).dismiss();
        await this.ui.presentAlert({
          mode: 'ios',
          header: 'No se ha podido cargar la información ',
          message: 'Por favor, revise su conexión',
          buttons: [
            {
              text: 'Intentar de nuevo',
              cssClass: 'secondary',
              handler: (blah) => {
                this.loadData()
                
              }
            },
          ]
        })
      })
  }

  next() {
    let obj = this.service_array.find(item => item.id == this.quotation.service_type_id);
    this.quotation.service_type = obj.name;
    localStorage.setItem("quotation", JSON.stringify(this.quotation));
    this.router.navigate(['/tabs/select-city']);
  }

}
