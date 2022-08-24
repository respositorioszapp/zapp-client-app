import { Component, QueryList, ViewChildren } from '@angular/core';

import { IonRouterOutlet, Platform } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { Capacitor } from '@capacitor/core';
import { ConnectionStatus } from '@capacitor/network';

//const {StatusBar} = Plugins
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { FcmService } from './services/fcm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from './services/ui.service';
import { Location } from '@angular/common';
import ModalOptions from './interfaces/ModalOptions';
import { CloseShopPage } from './dialogs/close-shop/close-shop.page';
import { Deeplinks } from '@awesome-cordova-plugins/deeplinks/ngx';
import { ProductPage } from './dialogs/product/product.page';
import { AuthService } from './services/auth.service';
import { RequestService } from './services/request.service';
import { App, URLOpenListenerEvent } from '@capacitor/app';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  networkStatus: ConnectionStatus
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,

    private fcm: FcmService,
    private location: Location,
    private router: Router,
    private ui: UiService,
    private statusBar: StatusBar,
    private deeplinks: Deeplinks,
    private auth: AuthService,
    private request: RequestService,
    private route: ActivatedRoute
  ) {
    this.backButtonEvent()
    this.initializeApp();
  }

  ngOnInit() {
    console.log('####ngOnInit');

    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      console.log('####event', event);
      let url = event.url.toString();
      if (url.includes('products/')) {
        let valueMatch = url.split('products/');
        if (valueMatch.length > 1) {
          let match = valueMatch[valueMatch.length - 1];
          console.log(match);
          this.getDetailProduct(match);
        }
      }
    });

    this.deeplinks.route({
      '/products/:productId': ProductPage
    }).subscribe(match => {
      // match.$route - the route we matched, which is the matched entry from the arguments to route()
      // match.$args - the args passed in the link
      // match.$link - the full link data
      console.log('Successfully matched route', match);
      console.log('Successfully matched route', match.$args);
      let productId = match.$args.productId;
      this.getDetailProduct(productId);
    }, nomatch => {
      // nomatch.$link - the full link data
      console.error('Got a deeplink that didn\'t match', nomatch);
    });
  }

  getDetailProduct(productId) {
    let user = this.auth.user;
    console.log('user',user);
    if(!user){
      return;
    }
    
    this.request.get("/?product_id=" + productId + "&option=detail_products_id", true)
      .subscribe((res: any) => {
        console.log("Detalle Producto", res);
        const array: any[] = res.data;
        if (array) {
          let e = array[0];
          this.showProduct(e);
        }
      })
  }

  initializeApp() {

    this.platform.ready().then(() => {

      this.statusBar.overlaysWebView(false);

      //      this.statusBar.backgroundColorByHexString("transparent");
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm.initPush();
    });
  }

  backButtonEvent() {
    //This subscription is for the native back button works correctly
    App.addListener('backButton', ({ canGoBack }) => {
      if (!this.router.url.includes('tabs/home')) {
        // await this.router.navigate(['/']);
        window.history.back();
      } else if (this.router.url.includes('tabs/home')) {
        if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
          this.lastTimeBackPress = new Date().getTime();
          this.presentAlertConfirm();
        } else {
          App.exitApp();
        }
      }
    });
  }

  async presentAlertConfirm() {
    const obj: ModalOptions = {
      // image: 'assets/imgs/location-animation.gif',
      message: "Está seguro de cerrar la aplicación?",
      color_message: "#000000",
      color_title: "#000000",
      affirmativeText: "Cerrar",
      negativeText: "Cancelar",
      modalWithButtons: true,
      affirmativeMethod: () => {
        App.exitApp();
      }
    }
    const modal = await this.ui.presentModal(CloseShopPage, obj, ["modal-xxs", "box-shadow-modal"])
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


