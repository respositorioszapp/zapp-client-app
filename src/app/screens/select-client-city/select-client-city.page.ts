import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/interfaces/City';
import { UiService } from 'src/app/services/ui.service';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-client-city',
  templateUrl: './select-client-city.page.html',
  styleUrls: ['./select-client-city.page.scss'],
})
export class SelectClientCityPage implements OnInit {
  customAlertOptions: any = {
    header: 'Seleccione una ciudad',
    cssClass: 'custom-alert'
  };
  quotation:any ={};
  loading = false;
  cities_array:City[] = [];
  city : City = {
    name: "Bogotá DC"
  }
  city_id : string = "2"
  constructor(private ui: UiService, private request : RequestService, private auth : AuthService,private router : Router) { }

  async ionViewDidEnter(){
    
    this.loadData();
    
  }

  async loadData(){
    this.cities_array =[];
    const loader = await this.ui.loading("Por favor espere...")
    this.request.get("indexcities")
      .subscribe(async (res: any) => {
        (await loader).dismiss();
        this.cities_array = res.data;
        if(this.auth.person.city_selected){
          this.city_id = this.auth.person.city_selected.id.toString();
          this.city = this.cities_array.find(c => c.id == this.auth.person.city_selected.id);
        }else{
          this.city_id = this.auth.person.city_id.toString();
          this.city = this.cities_array.find(c => c.id == this.auth.person.city_id);
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

  changeCity(){
    this.city = this.cities_array.find(c => c.id.toString() == this.city_id);
  }

  save(){
    if(this.auth.person.city_selected){
      if(this.city.id != this.auth.person.city_selected.id){
        this.auth.person.city_selected = this.city;
        this.auth.setPerson(this.auth.person);
        this.router.navigate(['tabs/home'])
      }
    }else{
      if(this.city.id != this.auth.person.city_id){
        this.auth.person.city_selected = this.city;
        this.auth.setPerson(this.auth.person);
        this.router.navigate(['tabs/home'])
      }
    }
    
  }
  

  ngOnInit() {
  }

}
