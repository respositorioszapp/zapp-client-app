import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-datetime-input',
  templateUrl: './datetime-input.page.html',
  styleUrls: ['./datetime-input.page.scss'],
})
export class DatetimeInputPage implements OnInit {
  @Input() inputType: string
  @Input() value: string
  @Input() title: string
  valueBefore:string
  constructor(private ui : UiService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.valueBefore=this.value;
    console.log("Value date", this.value)
  }

  confirm(){
    this.dismiss({value:this.value})
  }


  dismiss(obj?) {
    this.ui.dismiss(obj)
  }

}
