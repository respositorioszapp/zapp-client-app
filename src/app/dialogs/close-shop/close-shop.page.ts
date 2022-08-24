import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-close-shop',
  templateUrl: './close-shop.page.html',
  styleUrls: ['./close-shop.page.scss'],
})
export class CloseShopPage implements OnInit {
  @Input() image : string
  @Input() imageClass : string=""
  @Input() message : string
  @Input() color_message : string
  @Input() title : string
  @Input() color_title : string
  @Input() modalWithButtons : boolean
  @Input() affirmativeText : string
  @Input() negativeText : string
  @Input() affirmativeMethod : Function
  @Input() negativeMethod : Function
  constructor(private ui : UiService) { }

  ngOnInit() {
  }

  dismiss() {
    this.ui.dismiss()
  }

  affirmative(){
    if(this.affirmativeMethod){
      this.affirmativeMethod();
      this.dismiss()
    }
  }

}
