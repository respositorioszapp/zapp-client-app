import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-little-alert',
  templateUrl: './little-alert.page.html',
  styleUrls: ['./little-alert.page.scss'],
})
export class LittleAlertPage implements OnInit {
  @Input() image : string
  @Input() imageClass : string=""
  @Input() message : string

  @Input() imageDivClass : string
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
