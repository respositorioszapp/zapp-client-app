import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IonBackdrop } from '@ionic/angular';
import { MapPage } from 'src/app/dialogs/map/map.page';
import { UiService } from 'src/app/services/ui.service';
import { CartPage } from 'src/app/dialogs/cart/cart.page';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DaysService } from 'src/app/services/days.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  back_button
  eventSubscription:Subscription
  @ViewChild(IonBackdrop, { read: IonBackdrop, static: false }) myBackdrop: IonBackdrop;
  constructor(private router: Router, 
    public auth: AuthService, private ui: UiService,
     private days: DaysService,
     private request:RequestService) { }

  ngOnInit() {
    //This event fire when the router navigation end 
    this.eventSubscription= this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event:NavigationEnd) => {
      
      // You only receive NavigationEnd events
      console.log("Event Navigation End", event)
      if(this.auth.user){
        const difference = this.days.getDifferencesInMinutes(Date.now(), this.auth.user.last_login_date)
        console.log("Minutes", difference)
        const differenceAbsolute = Math.abs(difference)
        if(differenceAbsolute > Number(this.auth.token_expires_in )){
          this.request.get("refreshToken").subscribe((res:any)=>{
            if(res.data){
              const {access_token,expires_in} = res.data;
              this.auth.token= access_token;
              this.auth.token_expires_in = Number(expires_in);
              this.auth.user.last_login_date=Date.now()
              this.auth.setUser(this.auth.user)
              this.auth.setToken({
                token: access_token,
                token_expires_in: expires_in
              })
            }
          }, (err: any)=>{
            if(err.status==500){
              console.log()
            }
          })
        }
      }else{
        
      }
    });
    if (this.router.url == "/tabs/personal-information") {
      this.back_button = true;
    } else {
      this.back_button = false;
    }
    console.log("Backdrop toolbar",this.myBackdrop)
  }

  hideCart(){
    this.auth.person.hide_cart = true;
    this.auth.setPerson(this.auth.person);
  }

  async showMap() {
    let icon = 'a.png';
    let data = {
      city: this.auth.person.city,
      latitude: this.auth.person.location.latitude,
      longitude: this.auth.person.location.longitude,
      icon: icon,
      address: this.auth.person.location.address
    };
    const modal = await this.ui.presentModal(MapPage, data, ['custom-modal'])
    modal.onDidDismiss().then(() => {
      if (localStorage.getItem('address_item')) {
        let address_item = JSON.parse(localStorage.getItem('address_item'));
        this.auth.person.location.address = address_item.address;
        this.auth.person.location.latitude = address_item.lat;
        this.auth.person.location.longitude = address_item.lng;
        this.auth.setPerson(this.auth.person);
        localStorage.setItem("address_selected", JSON.stringify(this.auth.person.location))
        // item.address_invalid = false
        localStorage.removeItem('address_item');
      }
    })
  }

  back() {
    //this.auth.back_button
    console.log("Back")
    if (localStorage.getItem("back") && localStorage.getItem("back") == "true") {
      console.log("Back")
      
      if(localStorage.getItem("back_route")){
        this.auth.removeBack();
        this.router.navigateByUrl(localStorage.getItem("back_route"));
        localStorage.removeItem("back_route")
      }
    }

  }

  goToOffers(){
    this.auth.setBack(true);
    localStorage.setItem("back_route", "tabs/home");
    this.router.navigate(['tabs/offers']).then(() => {
      // this.menu.close()
    });
  }

  viewCart() {
    this.ui.presentModal(CartPage)
  }

}
