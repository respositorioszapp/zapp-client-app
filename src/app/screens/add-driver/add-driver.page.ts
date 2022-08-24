import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.page.html',
  styleUrls: ['./add-driver.page.scss'],
})
export class AddDriverPage implements OnInit {
  quotation: any = {};
  total = 0;
  mobileQuery: MediaQueryList;
  price_per_transport_type: any = {

  }
  count = 1;
  loading = false;
  optionSelection =4;
  viewSelection = "";
  transport_type
  constructor(private request: RequestService, private ui: UiService, private router: Router, private auth : AuthService) { }

  ngOnInit() {
    localStorage.setItem('step', '4');
    this.transport_type = JSON.parse(localStorage.getItem("quotation")).transport_type;
    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));
    }
  }

  async ionViewWillEnter() {
    localStorage.setItem('step', '4');
    this.hideCart()
    this.transport_type = JSON.parse(localStorage.getItem("quotation")).transport_type;
    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));
    }
    const loader = await this.ui.loading("Por favor espere...")
    this.request.get("list/attributes?parameter_id=2")
      .subscribe(async (res: any) => {
        (await loader).dismiss();
        res.data.map(transport_type => {
          this.price_per_transport_type[transport_type.name] = transport_type.value;
        })
        this.total = this.getTotal(this.optionSelection, this.count);
      }, async err => {
        (await loader).dismiss();
      })

  }

  hideCart(){
    this.auth.person.hide_cart = true;
    this.auth.setPerson(this.auth.person);
  }

  next() {

    this.quotation.number_hour = this.optionSelection;
    this.quotation.driver_count = this.count;
    localStorage.setItem("quotation", JSON.stringify(this.quotation));
    this.router.navigate(['/tabs/drivers']);
  }

  getTotal(optionSelection, count) {
    const { transport_type } = this.quotation;
    const price = this.price_per_transport_type[transport_type];
    return Number(optionSelection) * price * count;
  }

  add() {
    this.count++;
  }

  minus() {
    if (this.count > 1) {
      this.count--;
    }
  }
  capture(e) {



    console.log(e);

  }



}
