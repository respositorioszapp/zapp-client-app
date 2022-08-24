import { Component, OnInit } from '@angular/core';
import { Driver } from '../../interfaces/Driver';
import { SelectDriverPage } from '../../dialogs/select-driver/select-driver.page';
import { UiService } from '../../services/ui.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPage implements OnInit {
  quotation: any = {};
  panelOpenState = false;
  
  az_arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  distance = 0;
  duration = 0;
  duration_text = "0 min"
  driver_count;
  transport_type;
  adress_arr: any = [];
  adress_item: any = { driver: "", address: "", description: "", latitude: "", longitude: "" };
  driver_count_array: Driver[] = [];
  driver : Driver
  count = 0
  total =0
  constructor(private ui: UiService, private router: Router, private auth : AuthService) { }

  

  ngOnInit() {

   
    localStorage.setItem("step", "5");
    this.driver_count = JSON.parse(localStorage.getItem("quotation")).driver_count;
    this.transport_type = JSON.parse(localStorage.getItem("quotation")).transport_type;
    console.log(this.driver_count_array);

    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));
    }
  }

  calculateDriverPrices(){
    // this.duration = 0;
    this.total = 0;
    this.driver_count_array.map(d => {
      // this.duration += d.time;
      this.total += d.total
    })
    // let hour;
    // let minutes;
    // if (this.duration >= 3600) {
    //   hour = (this.duration / 3600).toFixed(0);
    //   if ((this.duration - 3600) >= 60) {
    //     minutes = ((this.duration - 3600) / 60).toFixed(0);
    //   } else {
    //     minutes = (1).toFixed(0);
    //   }
    // } else {
    //   minutes = (this.duration / 60).toFixed(0)
    // }
    // const hour_unit = Number(hour) == 1 ? ' hora' : this.duration < 3600 ? '' : ' horas';
    // const min_unit = Number(minutes) == 1 ? ' minuto' : ' minutos';
    // hour = hour ? hour : ''
    // this.duration_text = hour + hour_unit + " " + minutes + min_unit; 
  }

  hideCart(){
    
    this.auth.person.hide_cart = true;
    this.auth.setPerson(this.auth.person);
  }

  ionViewWillEnter(){
    
    localStorage.setItem("step", "5");
    this.driver_count_array = []
    this.driver_count = JSON.parse(localStorage.getItem("quotation")).driver_count;
    this.count = this.driver_count;
    this.transport_type = JSON.parse(localStorage.getItem("quotation")).transport_type;
    
    

    console.log(this.driver_count_array);

    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'))
      
      if(this.quotation.driver_count_array && this.quotation.driver_count_array.length > 0){
        this.driver_count_array = this.quotation.driver_count_array;
        this.calculateDriverPrices()
      }else{
        for (let index = 0; index < this.driver_count; index++) {
          this.driver_count_array.push({
            driver: (this.transport_type + " " + (index + 1)),
            address_array: [
              { index: 1 ,address: "", description: "", contact_name: '', contact_phone: '', latitude: "", longitude: "", hover: false },
            ], km: 0, time: 0, time_text : "0 min"
          });
        }
      }
      
    }
  }

  getTime() {
    const { number_hour, driver_count } = this.quotation;
    
    let time = 0;
    this.driver_count_array.map(d => {
      d.address_array.map(a => {
        time +=a.number_of_hours ? a.number_of_hours : 0
      })
    })
    this.duration = time;
    return time;
  }

  rmDriver(index, driver) {
    console.log("", )
    if (this.driver_count_array.length > this.quotation.driver_count) {
      this.driver_count_array.splice(index, 1);
      this.driver_count=this.driver_count-1;
      this.duration -= driver.time;
      this.distance -= driver.km;
      this.total -= driver.total;
      this.calculateDriverPrices();
      this.driver_count_array.forEach((d,i)=> {
        d.driver = (this.transport_type + " " + (i+1))
      })
    }

  }

  addDriver(){
    
      this.driver_count_array.push({
        driver: (this.transport_type + " " + (this.driver_count_array.length+1)),
        address_array: [
          { index: 1, address: "", description: "", contact_name: '', contact_phone: '', latitude: "", longitude: "", hover: false },
        ], km: 0, time: 0, time_text : "0 min"
      });
      this.driver_count=this.driver_count+1;
    

  }

  async openDialog(driver: Driver) {
    // let icon = this.az_arr[i] + '.png';
    let data = {
      driver
    };
    const modal = await this.ui.presentModal(SelectDriverPage, data, ['custom-modal'])
    modal.onDidDismiss().then(() => {
      this.calculateDriverPrices()
    })
  }



  next() {
    let valid = true;
    for (let i = 0; i < this.driver_count_array.length; i++) {
      let address_validate = this.driver_count_array[i].address_array.find(item => item.address == '');
      let description_validate = this.driver_count_array[i].address_array.find(item => item.description == '');
      let contact_name_validate = this.driver_count_array[i].address_array.find(item => item.contact_name == '');
      let contact_phone_validate = this.driver_count_array[i].address_array.find(item => item.contact_phone == '');
      if (address_validate != undefined || description_validate != undefined ||
        contact_name_validate != undefined || contact_phone_validate != undefined) {
        valid = false;
      }
    }
    if (valid) {
      // if (this.duration >= 3600) {
      //   this.duration = Number((this.duration / 3600).toFixed(0));
      // } else {
      //   this.duration = Number((this.duration / 60).toFixed(0))
      // }
      this.quotation.distance = this.distance;
      this.quotation.duration = this.duration;
      this.quotation.number_hour = this.duration;
      this.quotation.duration_text = this.duration + " HORAS";
      this.quotation.driver_count_array = this.driver_count_array;
      this.quotation.driver_count=this.driver_count;
      this.quotation.total = this.total;
      localStorage.setItem("quotation", JSON.stringify(this.quotation));
      this.router.navigate(['/tabs/select-time']);
    } else {
      this.ui.showToast("Debe llenar todos los campos");
    }
  }

}
