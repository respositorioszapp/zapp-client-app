import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-time-summary',
  templateUrl: './time-summary.page.html',
  styleUrls: ['./time-summary.page.scss'],
})
export class TimeSummaryPage implements OnInit {
  loading = false;
  quotation: any = {total :0};
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
  items : any[] = [{
    index : 1,
    open : false
  },
  {
    index : 2,
    open : false
  },
  {
    index : 3,
    open : false
  }]
  constructor(private ui: UiService, private request: RequestService, private router: Router, private auth : AuthService) { }

  ngOnInit() {
    localStorage.setItem("step", "7");
  }

  hideCart(){
    
    this.auth.person.hide_cart = true;
    this.auth.setPerson(this.auth.person);
  }

  

  async ionViewWillEnter() {
    localStorage.setItem("step", "7");
    this.hideCart();
    const loader = await this.ui.loading("Por favor espere...");
    this.request.get("list/attributes?parameter_id=2")
      .subscribe(async (res: any) => {
        (await loader).dismiss();
        res.data.map(transport_type => {
          this.price_per_transport_type[transport_type.name] = transport_type.value;
        })
        this.openExpansion(this.items[0]);
      }, async (err: any) => {
        (await loader).dismiss();
      })
    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));
      

    }
  }

  payment() {
    // this.quotation.total = this.total;
    const { transport_type, number_hour, driver_count } = this.quotation;
    const price = this.price_per_transport_type[transport_type];
    this.quotation.rate_base = price;
    this.quotation.kmadd_base_total = 0;
    localStorage.setItem('quotation', JSON.stringify(this.quotation));
    this.router.navigate(['/tabs/select-payment']);
    
  }

  openExpansion(item){
    console.log("Open", item)
    this.items.forEach(i =>  {
      if(i.index != item.index){
        i.open= false;
      }
    })
    item.open = item.open ? false : true;
    
    
    
  }

  transform(value: any) {
    if(value){
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return 0 +'';
    
  }

  getTotal() {
    const { transport_type, number_hour, driver_count } = this.quotation;
    const price = this.price_per_transport_type[transport_type];
    return number_hour * price * driver_count;
  }

  getTime() {
    const { number_hour, driver_count } = this.quotation;
    return (number_hour * driver_count);
  }

}
