import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { MapPage } from 'src/app/dialogs/map/map.page';
import { IonContent } from '@ionic/angular';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorResponse } from 'src/app/interfaces/ErrorResponse';
import { ErrorResponseService } from 'src/app/services/error-response.service';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.page.html',
  styleUrls: ['./select-address.page.scss'],
})
export class SelectAddressPage implements OnInit, AfterViewInit {
  @ViewChild(IonContent, { read: IonContent, static: false }) myContent: IonContent;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  quotation: any = {};
  address_arr: any[] = [
    {
      index: 1,
      address: '',
      description: '',
      contact_name: '',
      contact_phone: '',
      latitude: '',
      longitude: '',
      hover: false,
    },
    {
      index: 2,
      address: '',
      description: '',
      contact_name: '',
      contact_phone: '',
      latitude: '',
      longitude: '',
      hover: false,
    },
  ];
  az_arr = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  bottom_reached = false
  constructor(private ui: UiService, private router: Router, 
    private auth: AuthService, 
    private request : RequestService, 
    private error :ErrorResponseService) { }




  ngOnInit() {
    localStorage.setItem('step', '4');
    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));
      if (this.quotation.address_arr.length > 0) {
        this.address_arr = this.quotation.address_arr;
      }
    }
  }

  ionViewDidEnter() {
    localStorage.setItem('step', '4');
    this.address_arr = [
      {
        index: 1,
        address: '',
        description: '',
        contact_name: '',
        contact_phone: '',
        latitude: '',
        longitude: '',
        office: false,
        hover: false,
      },
      {
        index: 2,
        address: '',
        description: '',
        contact_name: '',
        contact_phone: '',
        latitude: '',
        longitude: '',
        office: false,
        hover: false,
      },
    ]
    console.log("Did enter")
    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));
      if (this.quotation.address_arr.length > 0) {
        if (this.quotation.service_type_id == 1) {
          this.address_arr = [];

          const array = this.quotation.address_arr.filter((a, i) => {
            console.log("Este es el i", i)
            return i == 0 || i == 1
          });
          console.log("Quotaion array", this.quotation.address_arr)
          console.log("Array", array)
          array.forEach(ad => {
            this.address_arr.push(ad);
          })
          // this.address_arr = this.quotation.address_arr;
        } else {
          this.address_arr = this.quotation.address_arr;
        }
      }
    }
  }



  keyUp(item, key) {
    item[key + "_invalid"] = false;
  }

  change(item) {
    console.log("Item", item)
  }

  ngAfterViewInit(): void {
    // this.scrollToBottom()
  }

  async logScrolling($event) {
    // only send the event once




    if ($event.target.localName != "ion-content") {
      // not sure if this is required, just playing it safe
      return;
    }

    const scrollElement = await $event.target.getScrollElement();


    // minus clientHeight because trigger is scrollTop
    // otherwise you hit the bottom of the page before 
    // the top screen can get to 80% total document height
    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;


    const currentScrollDepth = $event.detail.scrollTop;


    const targetPercent = 80;

    let triggerDepth = ((scrollHeight / 100) * targetPercent);


    if (currentScrollDepth > triggerDepth) {
      console.log(`Scrolled to ${targetPercent}%`);
      this.bottom_reached = true;
      // this ensures that the event only triggers once

      // do your analytics tracking here
    } else {
      this.bottom_reached = false;
    }
  }

  ionViewWillEnter() {
    this.hideCart()
    localStorage.setItem('step', '4');
    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));
      if (this.quotation.address_arr.length > 0) {
        this.address_arr = this.quotation.address_arr;
      }
    }
  }


  async scrollToBottom(): Promise<void> {
    try {
      this.myContent.scrollToBottom(300);
    } catch (err) { }
  }

  async saveFavoriteAddress(item) {
    if (item) {
      if (item.address && item.latitude && item.longitude) {
        await this.ui.presentAlert({
          mode: 'ios',
          header: 'Seleccionar esta dirección como favorita ',
          inputs: [
            {
              name: 'name_shorcut',
              id: 'name_shorcut',
              type: 'text',
              placeholder: 'Nombre de alias',
              mode: 'ios'
            },
            {
              name: 'description',
              id: 'description',
              type: 'textarea',
              placeholder: 'Descripción',
              mode: 'ios'
            },
          ],
          buttons: [
            {
              text: 'Registar',
              cssClass: 'secondary',
              handler: async (blah) => {
                const obj = {
                  customer_id: this.auth.user.id,
                  address: item.address,
                  latitude: item.latitude,
                  longitude: item.longitude,
                  name_shortcut:blah.name_shorcut,
                  description: blah.description
                }
                const loader = await this.ui.loading("Por favor espere...");

                this.request.post('customer/add_favourite_address', obj)
                .subscribe(async (res : any) => {
                  (await loader).dismiss()
                  console.log("Res ", res)
                  item.favorite = true;
                  
                  if (!this.auth.user.customer_addresses) {
                    this.auth.user.customer_addresses = []
                    // this.auth.user.user.customer_addresses = []
                  }
                  this.auth.user.customer_addresses.push(obj);
                  this.auth.setUser(this.auth.user);
                } ,async (err : any) => {
                  console.log("Err ", err);
                  (await loader).dismiss()
                  this.error.response(err)
                })

              }
            },
          ]
        })
      } else {
        if (!item.address) {
          await this.ui.presentAlert({
            mode: 'ios',
            header: 'Seleccione una dirección',
            buttons: [
              {
                text: 'Aceptar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {

                }
              },
            ]
          })
        }

      }

    }

  }

  next() {
    let address_validate = this.address_arr.find((item) => item.address == '');
    //let description_validate = this.address_arr.find(item=> item.description == '');
    let description_validate = false;

    let contact_name_validate = false;
    let contact_phone_validate = false;
    let valid = true
    for (let i = 0; i < this.address_arr.length; i++) {
      Object.keys(this.address_arr[i]).map(a => {
        if (!a.includes("invalid") && a != 'hover' && a != 'office' && a != "favorite") {
          if (this.address_arr[i][a] == null || this.address_arr[i][a] == '') {
            this.address_arr[i][a + "_invalid"] = true;
            valid = false;
          }
        }
      })
    }
    console.log("Address_array", this.address_arr)
    if (valid) {
      this.quotation.address_arr = this.address_arr;
      localStorage.setItem('quotation', JSON.stringify(this.quotation));
      this.router.navigate(['/tabs/trip']);

    } else {
      this.ui.showToast('Debe llenar todos los campos');
    }
  }

  hideCart(){
    
    this.auth.person.hide_cart = true;
    this.auth.setPerson(this.auth.person);
  }

  add() {
    const index = this.address_arr[this.address_arr.length - 1].index + 1;
    let address_item = {
      index,
      address: '',
      description: '',
      contact_name: '',
      contact_phone: '',
      latitude: '',
      longitude: '',
      office: false,
      hover: false,
    };
    this.address_arr.push(address_item);
    this.address_arr.forEach((a, i) => {
      a.index = (i + 1);
    })
    this.scrollToBottom()
  }
  rm(index) {
    if (this.address_arr.length > 2) {
      this.address_arr.splice(index, 1);
      this.address_arr.forEach((a, i) => {
        a.index = (i + 1);
      })
    }
  }

  async openDialog(item, i) {
    let icon = this.az_arr[i] + '.png';
    let data = {
      city: this.quotation.city,
      latitude: this.address_arr[i].latitude ? this.address_arr[i].latitude : this.quotation.latitude,
      longitude: this.address_arr[i].longitude ? this.address_arr[i].longitude : this.quotation.longitude,
      icon: icon,
      address: this.address_arr[i].address
    };
    const modal = await this.ui.presentModal(MapPage, data, ['custom-modal'])
    modal.onDidDismiss().then(() => {
      if (localStorage.getItem('address_item')) {
        let address_item = JSON.parse(localStorage.getItem('address_item'));
        this.address_arr[i].address = address_item.address;
        this.address_arr[i].latitude = address_item.lat;
        this.address_arr[i].longitude = address_item.lng;
        item.selected = true;
        item.favorite = address_item.favorite;
        item.address_invalid = false
        localStorage.removeItem('address_item');
      }
    })
  }

}
