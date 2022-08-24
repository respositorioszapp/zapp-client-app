import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { ImagePage } from 'src/app/dialogs/image/image.page';

@Component({
  selector: 'app-driver-popover',
  templateUrl: './driver-popover.component.html',
  styleUrls: ['./driver-popover.component.scss'],
})
export class DriverPopoverComponent implements OnInit {
  driver : any[] 
  photo :string = "assets/imgs/avatar.svg"
  order:any
  constructor(private ui: UiService) { }

  ngOnInit() {
    if(this.driver.length> 0){
      this.photo = this.driver[0].photo_driver;
    }
  }

  callANumber(number) {
    console.log("Phone", number);
    this.ui.call(number);
  }

  viewImage(photo){
    this.ui.viewImage(photo);
  }

}
