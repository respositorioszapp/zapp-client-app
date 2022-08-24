import { Component, NgZone, ViewChild, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { AuthService } from '../services/auth.service';
import { UiService } from '../services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IonMenu, IonBackdrop, MenuController } from '@ionic/angular';
import { ImagePage } from '../dialogs/image/image.page';
import { RealtimeService } from '../services/realtime.service';
import { environment } from 'src/environments/environment.prod';
import { CartPage } from '../dialogs/cart/cart.page';
import { ConfigurationData } from '../interfaces/ConfigurationData';
import { take } from 'rxjs/operators';
import { MapLocationService } from '../services/map-location.service';
import { GeolocationService } from '../services/geolocation.service';
import ModalOptions from '../interfaces/ModalOptions';
import { CloseShopPage } from '../dialogs/close-shop/close-shop.page';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  @ViewChild(IonBackdrop, { read: IonBackdrop, static: false }) myBackdrop: IonBackdrop;
  @ViewChild('menu', { static: true }) menu: IonMenu

  user:any = {};
  constructor(public auth: AuthService,
    private ui: UiService,
    private zone: NgZone,
    private router: Router,
    private realtime: RealtimeService,
    private menuC: MenuController,
    private route: ActivatedRoute,
    private map_service: MapLocationService,
    private geolocation:GeolocationService) { }

  ngOnInit(): void {
    console.log("mENU", this.menu)
    
    this.menu.ionDidClose.subscribe(any => {
      this.showCart()
    })
    if (localStorage.getItem("address_selected")) {

    }
    

    // this.menu.ionWillClose.subscribe(any  =>{
    //   console.log("I will close")

    // })
    this.route.paramMap.pipe(take(1)).subscribe((data: any) => {
      console.log("Ruta", data)

    });
  }

 async openMenu(e) {
    console.log("Event",e)
    e.preventDefault()
    const menu =await this.menuC.enable(true, 'first');
    await menu.setOpen(true,true)
    await this.menu.setOpen(true,true);
    console.log("Open")
    this.auth.person.hide_cart = true;
  }

  showCart() {
    this.auth.person.hide_cart = false;
    this.auth.setPerson(this.auth.person);
  }

  ionViewDidEnter() {
    this.menuC.enable(true, 'first');
    // this.map_service.findAddress({
    //   address : "Calle 93 #7-39",
    //   city : "Barranquilla"
    // })

    // this.listenToVersionChange()
    this.geolocation.getCurrentPosition()
      .then(data => {
        this.auth.person.location = {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude
        };
        this.map_service.findPlace(this.auth.person.location)
          .then((data) => {
            if (data) {
              this.auth.setPerson(this.auth.person);
            }
          });
      })
  }

  ionViewWillEnter() {
    console.log("Backdrop", this.myBackdrop)
    console.log("Configuration Data", this.auth.user.configuration_data)
    this.listenToAdvancedConfiguration();
    this.listenToVersionChange();
    //validar opciones usuario invitado
    this.user = (JSON.parse(localStorage.getItem('data'))).user;
    console.log(this.user);
  }

  async logOut() {
    this.auth.removeBack();
    const obj: ModalOptions = {
      // image: 'assets/imgs/location-animation.gif',
      message:"Está seguro de cerrar sesión?",
      color_message: "#000000",
      color_title: "#000000",
      affirmativeText:"Cerrar Sesión",
      negativeText:"Cancelar",
      modalWithButtons:true,
      affirmativeMethod:()=>{
        this.auth.logOut()
      }
    }
    const modal = await this.ui.presentModal(CloseShopPage, obj, ["modal-xxs","box-shadow-modal"])
  }

  goToOrders() {
    this.auth.removeBack();
    this.router.navigate(['/tabs/home']);
    this.menu.close()
  }

  listenToAdvancedConfiguration() {
    // this.realtime.getFirebaseCollectionObject("advanced_configuration/"+ this.auth.user.id)
    // .subscribe((res : ConfigurationData) => {
    //   console.log
    //   if(res != null){
    //     this.auth.user.configuration_data.rate_base = res.rate_base; 
    //     this.auth.user.configuration_data.minimal_distance = res.minimal_distance; 
    //     this.auth.user.configuration_data.peripheries = res.peripheries; 
    //     this.auth.user.configuration_data.rate_per_minute = res.rate_per_minute; 
    //     this.auth.user.configuration_data.time_wait = res.time_wait; 
    //     this.auth.user.configuration_data.value_per_distance = res.value_per_distance; 
    //     this.auth.setUser(this.auth.user);
    //   }
    // })
  }

  viewImage() {
    const image = this.auth.person.photo;
    const modal = this.ui.presentModal(ImagePage, { image });
  }

  listenToVersionChange() {

    this.realtime.getFirebaseCollectionObject("code_version_mobile/3")
      .subscribe(async (res: any) => {
        console.log("Res version code", res)
        if (res != null) {
          console.log("Res version code", res, "Version local",environment.VERSION_NAME)
          console.log("Res version code environment", environment)
          if (res.code != environment.VERSION_NAME) {
            await this.ui.presentAlert({
              mode: 'ios',
              header: '¡Hay nueva versión disponible!',
              message: 'Por favor, descargala',
              buttons: [
                {
                  text: 'Aceptar',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {
                    this.auth.logOut()
                    location.href = environment.PLAY_STORE_URL
                  }
                },
              ]
            })
          }
        } else {
          
        }
      })
  }





  goToHistory() {
    this.auth.removeBack();
    this.router.navigate(['tabs/history']);
    this.menu.close()

  }

  goToSelectCity() {
    // this.auth.removeBack() ; 
    this.router.navigate(['tabs/select-client-city']);
    this.menu.close()

  }

  goToProfile() {
    this.auth.removeBack();
    this.router.navigate(['tabs/profile']);

    this.menu.close()
  }

  goToWishList() {
    localStorage.setItem("back_route", "tabs/home");
    this.router.navigate(['tabs/wish-list']).then(() => {
      this.menu.close()
    });


  }

  viewCart() {
    this.ui.presentModal(CartPage)
  }

}
