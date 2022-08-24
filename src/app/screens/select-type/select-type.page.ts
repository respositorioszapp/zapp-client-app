import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-type',
  templateUrl: './select-type.page.html',
  styleUrls: ['./select-type.page.scss'],
})
export class SelectTypePage implements OnInit {
  route : string
  constructor(private router:Router) { }

  ngOnInit() {
    console.log()
  }

  ionViewWillEnter(){
    this.route = this.router.url;
  }

}
