import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { City } from 'src/app/interfaces/City';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.page.html',
  styleUrls: ['./select-city.page.scss'],
})
export class SelectCityPage implements OnInit {
  customAlertOptions: any = {
    header: 'Seleccione una ciudad',
    cssClass: 'custom-alert'
  };
  branches: any[] = []
  quotation: any = {};
  loading = false;
  cities_array: City[] = [];
  city: City = {
    id: 2,
    name: "Bogotá DC"
  }

  branch_office = {
    "id": 1,
    "customer_id": 1,
    "name": "",
    "address": "Cra. 30 #2837, Barranquilla, Atlántico, Colombia",
    "latitude": "10.968245080344",
    "longitude": "-74.77960338623",
    "description": "sede 1",
    "contact_name": "juan",
    "contact_phone": "55",
    "status": 1,
    "created_at": "2020-12-18T19:16:03.000000Z",
    "updated_at": "2020-12-18T19:16:03.000000Z",
    "city_id": 4,
    "city_name": "Barranquilla",
    "state_name": "Atlántico"
  }

  constructor(private request: RequestService, private ui: UiService, private router: Router, public auth: AuthService) { }

  async ngOnInit() {
    localStorage.setItem('step', '3');
    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));

    }

  }

  async ionViewDidEnter() {
    localStorage.setItem('step', '3');
    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));

    }
    this.loadData();

  }

  async loadData() {
    this.cities_array = [];
    this.branches = []
    const loader = await this.ui.loading("Por favor espere...")
    this.request.get("indexcities")
      .subscribe(async (res: any) => {
        (await loader).dismiss();
        this.cities_array = res.data;
        this.city = this.cities_array.find(c => c.id == this.quotation.city_id);
        if(this.auth.role.id == 4){
          console.log("customer/index_branch_office/"+this.auth.user.id+"?city_id="+ this.quotation.city_id)
          this.request
          .get("customer/index_branch_office/"+this.auth.user.id+"?city_id="+ this.quotation.city_id)
          .subscribe((res : any) => {
            console.log("Res", res)
            this.branches = res.data.data;
            const branch= this.branches.find(b => b.id == this.quotation.branch_office_id);
            if(branch){
              this.branch_office = branch;
            }else{
              this.branch_office = this.branches[0];
            }
          }, async err => {
            if(err.status != 400){
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
            }
            
          });
        }
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

  async changeCity() {
    this.city = this.cities_array.find(c => c.id == this.quotation.city_id);
    
    if(this.auth.role.id == 4){
      const loader = await this.ui.loading("Por favor espere...");
      console.log("customer/index_branch_office/"+this.auth.user.id+"?city_id="+ this.quotation.city_id)
      this.request
      .get("customer/index_branch_office/"+this.auth.user.id+"?city_id="+ this.quotation.city_id)
      .subscribe(async (res : any) => {
        (await loader).dismiss()
        console.log("Res", res)
        this.branches = res.data.data;
        const branch= this.branches.find(b => b.id == this.quotation.branch_office_id);
        if(branch){
          this.branch_office = branch;
          
          this.quotation.branch_office_id = this.branch_office.id;
        }else{
          this.branch_office = this.branches[0];
          this.quotation.branch_office_id = this.branch_office.id;
        }
        console.log("Branch Office Id",this.quotation.branch_office_id)
      }, async err => {
        (await loader).dismiss()
        if(err.status != 400){
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
        }
        
      });
    }
  }

  changeBranch(){
    console.log("Quotation Id", this.quotation.branch_office_id)
    this.branch_office = this.branches.find(b => b.id == this.quotation.branch_office_id);
  }

  next() {
    let url = '/tabs/select-address';
    let obj = this.cities_array.find(item => item.id == this.quotation.city_id);
    this.quotation.city = obj.name;
    this.quotation.latitude = obj.latitude;
    this.quotation.longitude = obj.longitude;
    console.log(this.quotation.service_type_id);
    if (this.quotation.service_type_id == '3') {
      url = '/tabs/add-driver';
    }
    
    localStorage.setItem("quotation", JSON.stringify(this.quotation));
    this.router.navigate([url]);
  }

}
