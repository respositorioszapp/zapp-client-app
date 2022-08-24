import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { ProductPage } from 'src/app/dialogs/product/product.page';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.page.html',
  styleUrls: ['./trending.page.scss'],
})
export class TrendingPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 3
  };
  slideOpts2 = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 4
  };
  array2: any[] = [
    {
      image: "assets/imgs/icono-promocion.png",
      text: "Promociones",
      type: "image",
      route: "tabs/offers"
    },
    {
      image: "assets/imgs/icono-moto.png",
      text: "Zapp",
      type: "image",
      route: "tabs/transport-type"
    },
    {
      image: "assets/imgs/icon-tendencias.png",
      text: "Tendencias",
      type: "image"
    },
    {
      image: "assets/imgs/icon-notificaciones.png",
      text: "Lo nuevo",
      type: "image"
    }
  ]
  array3: any[] = [
    {
      id: 1,
      image: "assets/imgs/mccombo.jpg",
      business: "McDonalds",
      product: "Hamburguesa",
      time: "40-45 min",
      calification: "4.7",
      price: 20000,
      description: "Sin descripción"
    },
    {
      id: 2,
      image: "assets/imgs/mccombo.jpg",
      business: "McDonalds",
      product: "Hamburguesa",
      time: "40-45 min",
      calification: "4.7",
      price: 20000,
      description: "Sin descripción"
    },
    {
      id: 3,
      image: "assets/imgs/mccombo.jpg",
      business: "McDonalds",
      product: "Hamburguesa",
      time: "40-45 min",
      calification: "4.7",
      price: 20000,
      description: "Sin descripción"
    },
    {
      id: 4,
      image: "assets/imgs/mccombo.jpg",
      business: "McDonalds",
      product: "Hamburguesa",
      time: "40-45 min",
      calification: "4.7",
      price: 20000,
      description: "Sin descripción"
    }
  ]
  constructor(private ui: UiService, private auth: AuthService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {

  }

  async showProduct(product) {

    const modal = await this.ui.presentModal(ProductPage, { product })
    modal.onDidDismiss().then((obj: any) => {
      if (!obj.cancel) {
        this.auth.person.total = 0;
        if (this.auth.person.cart_items && this.auth.person.cart_items.length > 0) {
          this.auth.person.cart_items.map(p => {
            this.auth.person.total += p.quantity * p.price
            this.auth.setPerson(this.auth.person)
          })
        }
      }

    })

  }

}
