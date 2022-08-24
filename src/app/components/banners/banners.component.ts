import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersComponent implements OnInit {
  slideOpts4 = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoplay: {
      delay: 10000,
    },
  };
  @Input() banners :any[]
  @Input() banners_loading :boolean
  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit() {
    console.log("Banners Loading" ,this.banners_loading)
  }

  showProducts(item) {
    const id = item.id ? item.id : Number(item.seller_id)
    // localStorage.setItem("shop", JSON.stringify(item.store));

    if (id != 0) {
      localStorage.setItem("back_route", "tabs/home");
      this.auth.setBack(true);
      this.router.navigate(["tabs/show-products/" + id])
    }
  }

}
