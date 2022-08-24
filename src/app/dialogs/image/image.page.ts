import { Component, OnInit, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {

  @Input() image : string
  slideOpts = {
    zoom: {
      maxRatio: 5
    },
  };
  constructor(private ui: UiService) { }

  ngOnInit() {
  }

  dismiss() {
    this.ui.dismiss()
  }

}
