import { Component, OnInit, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-cart-select-payment',
  templateUrl: './cart-select-payment.page.html',
  styleUrls: ['./cart-select-payment.page.scss'],
})
export class CartSelectPaymentPage implements OnInit {
  @Input() payment_method : string
  constructor(private ui : UiService) { }

  ngOnInit() {
  }

  selectPaymentMethod(f){
    this.payment_method = f;
    if(f != "Transferencia bancaria"){
      this.dismiss({payment_method: f})
    }
    localStorage.setItem("payment_method", this.payment_method)
    
  }

  selectTranfer(){
    this.dismiss({payment_method: this.payment_method})
  }

  dismiss(obj, cancel?) {
    this.ui.dismiss({payment_method : obj.payment_method, cancel})
  }

}
