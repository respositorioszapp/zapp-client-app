import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-select-time',
  templateUrl: './select-time.page.html',
  styleUrls: ['./select-time.page.scss'],
})
export class SelectTimePage implements OnInit {
  hour_values = []
  date = ""
  currentH;
  loading = false
  transport_type

  

  mobileQuery: MediaQueryList;
  quotation: any = {};
  hour = "";
  value = 0;
  accessory_array: any[] = [];
  min_date = new Date().toDateString()
  month_names: string 
  hour_arrayN: any = [
    "07:00 AM - 07:30 AM",
    "07:30 AM - 08:00 AM",
    "08:00 AM - 08:30 AM",
    "08:30 AM - 09:00 AM",
    "09:00 AM - 09:30 AM",
    "09:30 AM - 10:00 AM",
    "10:00 AM - 10:30 AM",
    "10:30 AM - 11:00 AM",
    "11:00 AM - 11:30 AM",
    "11:30 AM - 12:00 PM",
    "12:00 PM - 12:30 PM",
    "12:30 PM - 1:00 PM",
    "1:00 PM - 1:30 PM",
    "1:30 PM - 2:00 PM",
    "2:00 PM - 2:30 PM",
    "2:30 PM - 3:00 PM",
    "3:00 PM - 3:30 PM",
    "3:30 PM - 4:00 PM",
    "4:00 PM - 4:30 PM",
    "4:30 PM - 5:00 PM",
    "5:00 PM - 5:30 PM",
    "5:30 PM - 6:00 PM",
    "6:00 PM - 6:30 PM",
    "6:30 PM - 7:00 PM",
    "7:00 PM - 7:30 PM",
    "7:30 PM - 8:00 PM",
    "8:00 PM - 8:30 PM",
    "8:30 PM - 9:00 PM",
    "9:00 PM - 9:30 PM",
    "9:30 PM - 10:00 PM",
    "10:00 PM - 10:30 PM",
    "10:30 PM - 11:00 PM",
    "11:00 PM - 11:30 PM",
    "11:30 PM - 12:00 AM",
  ];
  interval
  accesory = {
    name : "Maleta de alimentos"
  }

  hour_array: any = [];
  constructor(private request : RequestService,
     private ui : UiService, private router: Router,private auth : AuthService) { }

  ngOnInit() {
    localStorage.setItem("step", "6");
  }

  dateHour() {

    const date = new Date();

    let minutos = date.getMinutes();
    let i = date.getHours();
    let u = i;
    while (i < 23) {
      this.getHour(i, minutos)
      if (minutos > 30) {
        i++
        minutos -= 30;
      } else {
        minutos = minutos + 30;
      }
    }
  }

  getCurrentHour() {


    const currentHour = new Date();
    let hourC = currentHour.getHours().toString();
    let minC = currentHour.getMinutes().toString();
    let ampmC;
    if (Number(hourC) >= 12) {
      hourC = (Number(hourC) - 12) + '';
      ampmC = 'PM'
    } else {
      ampmC = 'AM'
    }

    if (Number(hourC) == 0) {
      hourC = String(12);
    }

    hourC = Number(hourC) < 10 ? "0" + hourC : hourC;
    minC = Number(minC) < 10 ? "0" + minC : minC;

    this.currentH = hourC + ":" + minC + " " + ampmC


    /*  let h = this.currentH.getHours();
     let m = this.currentH.getMinutes();
 
     console.log('hora', h)
     console.log('minutos', m); */





  }
  getHour(hour, minute) {

    let hours = hour;
    let minutes = minute;
    let ampm = ""
    let ampmNext = ""
    if (minutes > 30) {
      hours = hours + 1;
      minutes = "0"
    } else {
      minutes = "30"
    }

    let nextHour = hours;
    let minutesNext = String(Number(minutes) + 30)
    if (Number(minutesNext) > 30) {
      nextHour++;
      minutesNext = "0"
    } else {
      minutesNext = "30"
    }
    if (hours >= 12) {
      hours = hours - 12;
      ampm = "PM"
    } else {
      ampm = "AM"
    }

    if (hours == 0) {
      hours = 12;
    }
    if (nextHour >= 12) {
      nextHour = nextHour - 12;
      ampmNext = "PM"
    } else {
      ampmNext = "AM"
    }

    if (nextHour == 0) {
      nextHour = 12;
    }


    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    nextHour = nextHour < 10 ? "0" + nextHour : nextHour;
    minutesNext = Number(minutesNext) < 10 ? "0" + minutesNext : minutesNext;
    this.hour_array.push(hours + ":" + minutes + " " + ampm + " - " + nextHour + " : " + minutesNext + " " + ampmNext);


  }

  hideCart(){
    
    this.auth.person.hide_cart = true;
    this.auth.setPerson(this.auth.person);
  }

  async ionViewWillEnter() {
    this.hideCart()
    this.min_date = this.dateFormat(new Date());
    if(this.interval){
      clearInterval(this.interval)
    }
    this.interval = setInterval(b => {
      this.getCurrentHour()
    }, 60000);
    this.month_names = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ].join(",")

    localStorage.setItem("step", "6");
    
    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));
      this.transport_type = JSON.parse(localStorage.getItem("quotation")).transport_type;
      this.date = this.dateFormat(new Date())
      this.dateHour()
      this.getCurrentHour();
      const loader = await this.ui.loading("Por favor espere...")
      this.request.get("list/attributes?parameter_id=3")
        .subscribe(async (res: any) => {
          (await loader).dismiss();
          if (this.transport_type != "Carry") {
            this.accessory_array = res.data;

            this.accesory = this.accessory_array.find(a => a.id == this.quotation.accessory_id);
          } else {
            this.loading = false;
            this.quotation.accessory_id = "7"
            this.accessory_array = res.data.filter(a => a.id == 7);
            this.accesory = this.accessory_array[0];
          }
          
        }, async err => {
          (await loader).dismiss();
          await this.ui.presentAlert({
            mode: 'ios',
            header: 'No se ha podido mostrar la información',
            buttons: [
              {
                text: 'Aceptar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  this.navigate()
                }
              },
            ]
          })
        })
    }

   

  }

  navigate(){
    if(this.quotation.service_type_id != 3){
      this.router.navigate(['/tabs/trip'])
    }else{
      this.router.navigate(['/tabs/drivers'])
    }
  }

  changeAccesory(){
    console.log("ddjdj", this.quotation.accessory_id)
    console.log("accesorys", this.accessory_array)
    this.accesory = this.accessory_array.find(a => a.id == this.quotation.accessory_id);
  }

  async next() {

    if ((this.hour == "" && this.quotation.service_type_id != 3) || this.quotation.cargo_price == "") {
      
      if(this.hour == ""){
        await this.ui.presentAlert({
          mode: 'ios',
          header: 'Debe seleccionar la hora',
          buttons: [
            {
              text: 'Aceptar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                // this.navigate()
              }
            },
          ]
        })
      }
      if(this.quotation.cargo_price == ""){
        await this.ui.presentAlert({
          mode: 'ios',
          header: 'Debe ecribir el valor declarado',
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
      


    } else {
      this.quotation.hour = this.hour;
      let f = this.date.split("-");
      f[2] = f[2][0]+f[2][1];
      if(f.length > 3){
        f = f.filter((a,i) => i < (f.length-1))
      }
      console.log("F",f)
      const date = f.join("-");
      console.log("Date", date);
      this.quotation.date = date;
      let obj = this.accessory_array.find(item => item.id == this.quotation.accessory_id);
      this.quotation.zapp_tool = obj.name;
      localStorage.setItem("quotation", JSON.stringify(this.quotation));
      const page = this.quotation.service_type_id == 3 ? '/tabs/time-summary' : '/tabs/summary'
      this.router.navigate([page]);
    }
  }

  onlyNumber(string) {
    var out = '';
    var filtro = '1234567890';//Caracteres validos
    //Recorrer el texto y verificar si el caracter se encuentra en la lista de validos
    for (var i = 0; i < string.length; i++)
      if (filtro.indexOf(string.charAt(i)) != -1)
        //Se añaden a la salida los caracteres validos
        out += string.charAt(i);
    this.quotation.cargo_price = out;
  }

  dateFormat(date) {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    //this.dateHour(date);
    return [year, month, day].join('-');
  }

  capture(e) {
    // console.log('aaaa',e);
    const h = new Date();
    let hoy = this.dateFormat(h);
    let fechaFormulario = this.date;
    console.log('fecha de hoy', hoy);
    console.log('fecha seleccionada', fechaFormulario);

    // Comparamos solo las fechas => no las horas!!
    ; // Lo iniciamos a 00:00 horas

    if (fechaFormulario > hoy) {
      console.log('fecha es mayor')
      //this.hour_array=this.hour_arrayN;
      this.value = 1;

    }
    else
      if (fechaFormulario == hoy) {
        console.log('fecha es igual');
        this.value = 0;
      }
      //this.dateHour();
      //this.mensaje();
      else
        if (fechaFormulario < hoy) {
          console.log('fecha es menor');
          this.value=2;

        }



  }

  

}
