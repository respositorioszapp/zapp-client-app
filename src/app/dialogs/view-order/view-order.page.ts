import { Component, OnInit, Input, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { RealtimeService } from 'src/app/services/realtime.service';
import { Geolocation } from '@capacitor/geolocation';
import { take } from 'rxjs/operators';
import { SelectDriverPage } from '../select-driver/select-driver.page';
import { EventsPage } from '../events/events.page';
import { QualificationPage } from '../qualification/qualification.page';
import { OrderDetailTimelinePage } from '../order-detail-timeline/order-detail-timeline.page';
import { CloseShopPage } from '../close-shop/close-shop.page';
import ModalOptions from 'src/app/interfaces/ModalOptions';
import { AnimationOptions, BMRenderFrameErrorEvent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
declare var google: any;
@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.page.html',
  styleUrls: ['./view-order.page.scss'],
})
export class ViewOrderPage implements OnInit, OnDestroy {
  @Input() order: any;
  @Input() orders: any;
  @Input() fromHistory: boolean=false;
  az_arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  markers = []
  map: any
  distance = ""
  duration = 0
  duration_text = ""
  details = []
  positionTracking: any;
  firstTime = true
  subscription: Subscription
  equal_or_greater_than_a_kilometer = true
  minimum_distance
  latitude: any
  longitude: any
  id: string
  markerPoints: any[] = []
  directionsService: any
  directionsDisplay: any
  view_more = true
  proximity: number = 1
  orderSubscription: Subscription
  current_state = 52
  store_status = {
    52: {
      message: "Tu orden ha sido recibida y pronto será confirmada.",
      json: "/assets/lottie-files/1-confirmed.json",

      state: 52
    },
    53: {
      message: "Tu orden ha sido confirmada y se está preparando.",
      json: "/assets/lottie-files/2-order-packed.json",
      state: 53,
      icon: "order-inproccess"
    },
    54: {
      message: "El mensajero va en camino a tu ubicación. ",
      json: "/assets/lottie-files/3-delivery-riding.json",
      state: 54,
      icon: "deliverygo"
    },
    55: {
      message: "¡El mensajero ha llegado! Recibe tu pedido. ",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 55,
      icon: "delivery-location"
    },
    57: {
      message: "La orden ha sido finalizada",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 57,
      icon: "delivery-location"
    },
    58: {
      message: "La orden fue cancelada",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 58,
      icon: "delivery-location"
    },
    59: {
      message: "Ubicando el repartidor más cercano...",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 58,
      icon: "delivery-location"
    },
    22:{
      message:"No Asignada",
      state:22,
      class:"danger"
    },
    24:{
      message:"En proceso",
      state:24,
      class:"in-proccess"
    },
    25:{
      message: "completado",
      state: 25,
      class:"success"
    },
    31:{
      message: "Cancelada",
      
      state: 31,
     class:"warning"
    },
    36:{
      message: "Cancelada por mensajero",
     
      state: 36,
      class:"danger"
    },
    48:{
      message: "No efectiva",
      
      state: 48,
      color:"dark",
      class:'not-effective'
     
    }
  }
  store_states = {
    52: {
      message: "Tu orden ha sido recibida y pronto será confirmada.",
      json: "/assets/lottie-files/1-confirmed.json",
      state: 52,
      image: "/assets/imgs/1-confirmed.gif",

    },
    53: {
      message: "Tu orden ha sido confirmada y se está preparando.",
      json: "/assets/lottie-files/2-order-packed.json",
      state: 53,
      image: "/assets/imgs/2-order-packed.gif",
      icon: "order-inproccess"
    },
    54: {
      message: "El mensajero va en camino a tu ubicación. ",
      json: "/assets/lottie-files/3-delivery-riding.json",
      state: 54,
      image: "/assets/imgs/3-delivery-riding.gif",
      icon: "deliverygo"
    },
    55: {
      message: "¡El mensajero ha llegado! Recibe tu pedido. ",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 55,
      image: "/assets/imgs/4-food-delivery.gif",
      icon: "delivery-location"
    },
    57: {
      message: "La orden ha sido finalizada",
      json: "/assets/-food-delivery.json",
      state: 57,
      icon: "delivery-location"
    },
    58: {
      message: "La orden fue cancelada",
      json: "/assets/4-food-delivery.json",
      state: 58,
      icon: "delivery-location"
    },
    59: {
      message: "Ubicando el repartidor más cercano...",
      json: "/assets/4-food-delivery.json",
      state: 58,
      icon: "delivery-location"
    },
    

  }
  store_states_ = {
    52: {
      message: "Tu orden ha sido recibida y pronto será confirmada.",
      json: "/assets/lottie-files/1-confirmed.json",

      state: 52
    },
    53: {
      message: "Tu orden ha sido confirmada y se está preparando.",
      json: "/assets/lottie-files/2-order-packed.json",
      state: 53,
      icon: "order-inproccess"
    },
    54: {
      message: "El mensajero va en camino a tu ubicación. ",
      json: "/assets/lottie-files/3-delivery-riding.json",
      state: 54,
      icon: "deliverygo"
    },
    55: {
      message: "¡El mensajero ha llegado! Recibe tu pedido. ",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 55,
      icon: "delivery-location"
    },
    57: {
      message: "La orden ha sido finalizada",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 57,
      icon: "delivery-location"
    },
    58: {
      message: "La orden fue cancelada",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 58,
      icon: "delivery-location"
    },
    59: {
      message: "Ubicando el repartidor más cercano...",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 58,
      icon: "delivery-location"
    },
    25:{
      message: "FINALIZADO",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 58,
      icon: "delivery-location",
      class:'status-success'
    },
    22:{
      message: "SIN ASIGNAR",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 58,
      icon: "delivery-location",
      class:'status-success'
    },
    23:{
      message: "ASIGNADA",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 58,
      icon: "delivery-location",
      class:'status-success'
    },
    24:{
      message: "EN PROCESO",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 58,
      icon: "delivery-location",
      class:'status-in-process'
    },
    48:{
      message:'NO EFECTIVA',
      class:'status-not-effective'
    },
    31:{
      message:'CANCELADA',
      class:'status-completed'
    },
    36:{
      message:'CANCELADA POR MENSAJERO',
      class:'status-completed'
    },
   
    

  }
  markers_numbers = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
  ];
  show_shop = false
  constructor(private ui: UiService,
    private request: RequestService,
    private auth: AuthService,
    private realtime: RealtimeService,
    private zone: NgZone) { }

  ngOnInit() {
    //status_order_mobile/4

  }

  showShop() {
    this.show_shop = !this.show_shop;
  }

  getOptions(key:string):AnimationOptions {
    
    return {
      path: this.store_states[key].json,
      autoplay:true,
      loop:true
    }
  }

  getStoreState(item) {
    return this.store_states[item]
  }

  animationCreated(animationItem: AnimationItem): void {
    //console.log("Animation",animationItem);
  }

  onError(item:BMRenderFrameErrorEvent){
    console.log("Error animation", item);
  }


  async showQualification(order, drivers) {
    console.log("Qualification")
    if (this.order.score_service) {
      return;
    } else {
      if (this.order.score_service > 0) {
        return;
      }
    }
    console.log("Pass")
    const driver = drivers[0]
    this.dismiss()
    const modal = await this.ui.presentModal(QualificationPage, { order, driver },[],'QualificationPage');

    modal.onDidDismiss().then(obj => {

    })

  }

  convertTorray(object: any) {
    return Object.keys(object).filter(key => Number(key) < 57);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  async ionViewWillEnter() {
    this.order.order_total=this.order.order_total? this.order.order_total:this.order.total;
    console.log("Order", this.order)
    if (this.order.zapp_store_order == 1) {
      let city_id = 0;
      if (this.auth.person.city_selected) {
        city_id = this.auth.person.city_selected.id;
      } else {
        city_id = this.auth.person.city_id;
      }
      console.log("Url", `status_order_mobile/${this.order.city_id}/${this.auth.user.id}/${this.order.id}`)
      if (this.order.status_order != 48) {
        this.realtime.getFirebaseCollectionObject(`status_order_mobile/${this.order.city_id}/${this.auth.user.id}/${this.order.id}`)
          .subscribe((res: any) => {
            if (res == null) {

            } else {
              console.log("Res Subscription status order", res)
              if (res.drivers && res.drivers.length > 0) {
                res.drivers = res.drivers;
                this.order.drivers= res.drivers;
                console.log("Order Drivers", )
              }
              console.log("Status Order Firebase", res.status_order)
              if (!this.store_states[res.status_order]) {
                switch (res.status_order) {
                  case 0:
                    res.status_order = 52;
                    break;
                  case 1:
                    res.status_order = 53;
                    break;
                  case 2:
                    res.status_order = 54;
                    break;
                  case 3:
                    res.status_order = 55;
                    break;
                }
              }
              if (res.status_order == 25) {
                this.showQualification(res.order, res.drivers);
                this.current_state = 57;
                return
              }
              if (res.status_order == 31) {
                this.current_state = 58;
                return
              }
              if (res.status_order == 36) {
                this.current_state = 59;
                return
              }
              if (res.status_order == 48) {
                this.current_state = 48;
                this.dismiss()
                this.ui.presentAlert({
                  mode: 'ios',
                  header: 'Advertencia',
                  message: 'La orden ha sido no efectiva no atendiste el servicio',
                  buttons: [
                    {
                      text: 'Aceptar',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: (blah) => {

                      }
                    }
                  ]
                })
                return
              }
              this.current_state = res.status_order;
            }
          })
      }

    }else{
      this.listenToStatusOrder();
      
    }

    this.markerPoints = [];
    this.markers = [];
    clearInterval(this.positionTracking);
    console.log("Proximity", this.proximity);
    
    // this.changeAvailability()
    console.log("Order", this.order)

    if (this.order.details) {
      this.order.details.map(d => {
        this.details.push({
          id: d.id,
          latitude: d.latitude,
          longitude: d.longitude,
          title: d.title,
          description: d.description,
          contact_name: d.contact_name,
          contact_phone: d.contact_phone,
          people_id: d.people_id,
          ...d
        })
      })
    } else {
      this.order.detail.map(d => {
        this.details.push({
          id: d.id,

          address: d.address,
          title: d.title,
          description: d.description,
          latitude: parseFloat(d.latitude),
          longitude: parseFloat(d.longitude),
          contact_name: d.contact_name,
          contact_phone: d.contact_phone,
          people_id: d.people_id,
          ...d
        })
      })
    }
    if (this.order.service_type_id == 3) {
      const title_array = [];
      console.log("Tiempooooo")

      this.details.forEach(element => {
        console.log("Element", element)
        if (!title_array.find(t => t.title == element.title)) {
          title_array.push({
            id: element.id,
            title: element.title,
            driver_id: element.people_id
          })
        }
      });
      // this.details = []
      console.log("Titles", title_array)
      
      const array = title_array.map((a,index) => {
        let address_array = this.details.filter(as => as.title == a.title);
        address_array = address_array.map((l, i) => {
          console.log("Order details Address", l)
          return {
            id: l.id,
            index: (i + 1),
            title: l.title,
            address: l.address,
            description: l.description,
            latitude: parseFloat(l.latitude),
            longitude: parseFloat(l.longitude),
            contact_name: l.contact_name,
            contact_phone: l.contact_phone,
            driver_id:a.driver_id,
            ...l
          }
        })
        const driver_o = this.order.drivers.find(d => d.driver_id == a.driver_id);
        return {
          id: a.driver_id,
          detail_id: a.id,
          index:index+1,
          driver: a.title,
          address_array,
          driver_o,
          ...address_array[0]
        };
      });
      console.log("Array", array)
      console.log("Address Array", this.details)
      this.details = array;
      this.details.map(a => {
        if (!a.km) {
          a.km = Math.round(this.order.distance / this.details.length);
        }
        if (!a.time) {
          a.time = Math.round(this.order.duration / this.details.length);
        }
      })
    } else {
      this.loadMap(true);
    }

    this.realtime.getFirebaseCollectionList(`order_detail_report/${this.order.id}`)
      .subscribe((res:any[])=>{
        if(res!=null){
          
          if(res.length>0){
            res.forEach(detail=>{
              
              let detailOrder= this.details.findIndex(d=> {
                console.log("Order Details detail", d, detail)
                return d.detail_id== detail.id || d.id== detail.id
              });
              if(detailOrder!=-1){
                if(this.order.service_type_id!=3){
                  const wait_time = detail.timer? detail.timer.minutes:0;
                  const surplus_money = detail.total_charge ? Number(detail.total_charge):0;
                  this.details[detailOrder]={...detail, wait_time,surplus_money };
                  
                  this.order.total=Number(this.order.order_total);
                  this.details.forEach(d=>{
                    this.order.total+=Number(d.surplus_money);
                  })
                }else{
                  this.details[detailOrder]={...this.details[detailOrder], detail}
                }
               
                console.log("Order Details", this.order.details)
              }else{
                console.log("Order Details No encontrado")
              }
            })
            
          }else{
            console.log("Array vacío")
          }
        }
      })
    this.markers_numbers.map((ab, i) => {
      //  
      this.markers.push("/assets/imgs/markers_numbers/" + (i + 1) + '.png')
    });




  }

  

  listenToStatusOrder(){
     this.realtime
    .getFirebaseCollectionObject("status_order_mobile/" + this.order.city_id + "/" + this.auth.user.id+"/"+this.order.id)
    
    .subscribe((res: any) => {
      console.log("Res Subscription status", res)

      if (res != null ) {
        if(res.drivers && res.drivers.length > 0){
          this.order.drivers= res.drivers;
          console.log("Order Drivers", this.order.drivers,this.details);
          
          
        }
        const order= res.order;
        this.order.status_order =order.status_order 
        console.log("Subscription 1", res)
       if(this.order.status_order==25){
         if(!this.fromHistory){
          this.showQualification(this.order, this.order.drivers);
         }
       }
        
      }
    })
  }

  changeState() {
    this.current_state++;
  }

  get detailActive() {

    return this.details.find(d => d.status != 25 && d.status != 36 && d.status != 48)
  }

  createIcon(options) {
    options = options || {};
    const rImg = options.img || new Image();
    rImg.src = rImg.src || options.url || '';
    options.width = options.width || rImg.width || 52;
    options.height = options.height || rImg.height || 60;
    var canvas = document.createElement("canvas");
    canvas.width = options.width;
    canvas.height = options.height;

    const context = canvas.getContext("2d");
    return { canvas, context, image: rImg };
  }

  get orderActive(){
    return this.order.status_order!=31&& this.order.status_order!=48 && this.order.status_order!=25&& this.order.status_order!=36;
  }

  setRotation(icon, options) {
    var canvas = icon.context,
      angle = options.deg ? options.deg * Math.PI / 180 :
        options.rad,
      centerX = options.width / 2,
      centerY = options.height / 2;

    canvas.clearRect(0, 0, options.width, options.height);
    canvas.save();
    canvas.translate(centerX, centerY);
    canvas.rotate(angle);
    canvas.translate(-centerX, -centerY);
    console.log("Image", icon.image)
    canvas.drawImage(icon.image, 0, 0);
    canvas.restore();
    // options.canvas= c
    return icon.canvas;
  }

  getUrl(canvas) {
    return canvas.toDataURL('image/png');
  }

  async cancel() {
    await this.ui.presentAlert({
      mode: 'ios',
      header: '¿Estás seguro que quieres cancelar la orden?',

      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        },
        {
          text: 'Sí',
          handler: async (blah) => {
            await this.ui.presentAlert({
              mode: 'ios',
              header: '¿Por qué desea cancelarla?',
              inputs: [
                {
                  name: 'why',
                  id: 'paragraph',
                  type: 'textarea',
                  placeholder: 'Razón',
                  mode: 'ios'
                },
              ],
              buttons: [
                {
                  text: 'Enviar',
                  handler: async (res) => {

                    const data = new FormData();
                    data.append("description", res.why);
                    const obj = {
                      description: res.why
                    }
                    const loader = await this.ui.loading("Por favor espere...");
                    this.request.put('order/cancel_an_order/' + this.order.id, obj).subscribe(async res => {
                      (await loader).dismiss();
                      this.order.status_order = 25;
                      if (this.order.zapp_store_order == 1) {
                        const obj_update = {
                          data: {
                            status: "cancelled"
                          }
                        }
                        this.request
                          .post(`/?option=update_order&id=${this.order.wc_order_id}`, obj_update, true)
                          .subscribe((res: any) => {
                            console.log("Res", res)
                          }, err => {
                            if (err.status == 400) {
                              this.ui.showToast(err.error.message)
                            }
                          })
                      }
                      localStorage.removeItem("current_order");
                      this.dismiss();
                    }, async err => {
                      (await loader).dismiss();

                      await this.ui.presentAlert({
                        mode: 'ios',
                        header: 'No se ha podido cancelar la orden',
                        buttons: [{
                          text: "Aceptar",
                          role: 'cancel',
                          handler: () => {

                          }
                        }]
                      })
                    })
                  }
                },
              ]
            })
          }
        },
      ]
    })
  }


  async openDialog(driver: any) {
    console.log("Driver", driver)
    // let icon = this.az_arr[i] + '.png';
    let data = {
      driver,
      disable: true,
      order: this.order
    };
    const modal = await this.ui.presentModal(SelectDriverPage, data, ['custom-modal'])
    modal.onDidDismiss().then(() => {

    })
  }

  getDrivers() {
    let icon = "";
    clearInterval(this.positionTracking)

    switch (this.order.transport_type_id) {
      case 4:
        icon = "assets/imgs/moto-new.svg"
        break;
      case 5:
        icon = "assets/imgs/carrysegui.png"
        break;
      case 6:
        icon = "assets/imgs/autosegui.png"
        break;
    }
    var marker_icon = {
      url: icon, // url
      scaledSize: new google.maps.Size(35, 30), // size
      // origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor 
    };

    let driver_markers = []

    this.subscription = this.realtime.getFirebaseCollectionList("order_gps/" + this.order.id)
      .subscribe((res: any[]) => {

        console.log("Drivers", res)

        if (res && res.length > 0) {
          console.log("Drivers 2", res)
          if (driver_markers.length == 0) {
            res.map(d => {
              let latlng = {
                lat: parseFloat(d.lat),
                lng: parseFloat(d.lng)
              };
              let marker = new google.maps.Marker({
                position: latlng,
                map: this.map,
                icon: marker_icon,
              })


              driver_markers.push(marker);
              const old_latitude = parseFloat(res[0].oldLat);
              const old_longitude = parseFloat(res[0].oldLng);
              const latitude = parseFloat(res[0].lat);
              const longitude = parseFloat(res[0].lng);
              //Getting old and location to compute angle to rotate the marker
              const old_marker_position = new google.maps.LatLng(old_latitude, old_longitude);
              const new_marker_position = new google.maps.LatLng(latitude, longitude);
              const angle = res[0].angle;
              this.rotateMarker(icon, old_marker_position, new_marker_position, angle)

              marker.setPosition(new_marker_position);
            })
          } else {
            driver_markers.forEach(dm => {
              const old_latitude = parseFloat(res[0].oldLat);
              const old_longitude = parseFloat(res[0].oldLng);
              const latitude = parseFloat(res[0].lat);
              const longitude = parseFloat(res[0].lng);
              //Getting old and location to compute angle to rotate the marker
              const old_marker_position = new google.maps.LatLng(old_latitude, old_longitude);
              const new_marker_position = new google.maps.LatLng(latitude, longitude);
              const angle = res[0].angle;
              this.rotateMarker(icon, old_marker_position, new_marker_position, angle)

              dm.setPosition(new_marker_position);
            })
          }
        }
      }, err => {

      })

  }



  async loadMap(firstTime = false) {
    //obtener usos de la API
    const loader = await this.ui.loading("Por favor espere...");
    try {
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
      //puntos de referencia para agregar
      var waypts = [];
      var markers = [];
      var infos = [];
      //coordenadas de los puntos de ruta
      for (let i = 0; i < this.details.length; i++) {

        let latlng = {
          lat: parseFloat(this.details[i].latitude),
          lng: parseFloat(this.details[i].longitude)
        };
        waypts.push({ location: latlng, stopover: true });
      }
      //creo mapa

      var map = new google.maps.Map(document.getElementById('mapViewOrder'), {
        zoom: 2,
        // center: { lat: waypts[0].location.lat, lng: waypts[0].location.lng },
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
      });
      this.map = map;
      //muestro el mapa
      directionsDisplay.setMap(map);

      //ventanas de informacion
      var infoWindow = new google.maps.InfoWindow();
      let origin, destination, return_pt;
      let n = (this.details.length - 1);

      if (this.order && this.order.round_trip == 1) {
        console.log("Round trip")
        origin = { lat: waypts[0].location.lat, lng: waypts[0].location.lng };
        destination = { lat: waypts[0].location.lat, lng: waypts[0].location.lng };
        return_pt = { lat: waypts[n].location.lat, lng: waypts[n].location.lng };
        //punto de retorno en km y min
        if (this.order.status_order != 25) {
          this.getDistanceMatrix(return_pt, origin);
        }
      } else {
        origin = { lat: waypts[0].location.lat, lng: waypts[0].location.lng };
        destination = { lat: waypts[n].location.lat, lng: waypts[n].location.lng };
        if (this.order.status_order != 25) {
          this.getDistanceMatrix(origin, destination);
        }
      }
      if (this.details.length >= 25) {
        //DIVIDIMOS EL DRIVER NEAR ADDRRES EN PARTES DE 25, EL CUAL ES EL LIMITE POR SOLICITUD
        for (var i = 0, parts_driver_address = [], max = 23 - 1; i < this.details.length; i = i + max + 1)
          parts_driver_address.push(this.details.slice(i, i + max + 1));


        for (var i = 0, parts = [], max = 23; i < waypts.length; i = i + max)
          parts.push(waypts.slice(i, i + max));
        //


        console.log('PARTES DEL WPTS', parts);

        // AQUI RECOORO EL ARR PARTS Y HAGO LAS DISITINTAS SOLICITUDES


        /*  **************************************************************************************** */
        /*   *********************INICIO DEL RECORRIDO DE CADA PARTE ***************************** */
        /*  **************************************************************************************** */
        //Aqui definio el numero desde donde empezara el recorrido de marcadore
        let marker_origin_number;
        //

        let array_routed_addresses: any = [];

        for (var i = 0; i < parts.length; i++) {

          // CALCULAR LA DIRECCION MAS LEJANA DE LA PARTE ACTUAL 

          //

          let origin_por_recorrido;
          if (i == 0) {
            origin_por_recorrido = origin;
            console.log('SEGUNDA PARTE', origin_por_recorrido)
          } else {

            origin_por_recorrido = {
              lat: Number(array_routed_addresses[array_routed_addresses.length - 1].latitude),
              lng: Number(array_routed_addresses[array_routed_addresses.length - 1].longitude)
            }
            console.log('SEGUNDA PARTE', origin_por_recorrido)

            marker_origin_number = parts[i - 1].length;

            //
          }
          console.log('marker_origin_number', marker_origin_number)

          var waypoints = [];
          for (var j = 0; j < parts[i].length; j++) {
            waypoints.push(parts[i][j]);
            console.log('I', i, 'J', j);
          }

          let services_options = {
            origin: origin_por_recorrido,
            destination: destination,
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.DRIVING,
            // drivingOptions: {
            //   departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
            //   trafficModel: 'optimistic',

            // },
            // optimizeWaypoints: true,
            // avoidTolls : true
          };
          await this.printDirections(services_options, this.map);

          array_routed_addresses = array_routed_addresses.concat(parts_driver_address[i]);
          // array_routed_addresses = await this.directionServiceFunction(services_options, driver,map,parts_driver_near_address[i]);
          console.log('ESTE ES EL ARRAY ENRUTADO INICIAL LDM', array_routed_addresses)
          this.getDrivers();

        }

        for (let i = 0; i < this.details.length; i++) {

          let latlng = {
            lat: parseFloat(this.details[i].latitude),
            lng: parseFloat(this.details[i].longitude)
          };

          console.log("Marker Url", this.markers[i])
          //Adding icon to the marker
          let icon_image = {
            url: this.markers[i], // url
            scaledSize: i == 0 ? new google.maps.Size(50, 50) : new google.maps.Size(35, 50), // size
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 32), // anchor 
          };


          var marker_icon = icon_image;

          let marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: marker_icon,

          })


          this.markerPoints.push(marker);
          // agrego la informacion de la dirección
          console.log("Detail", this.details[i])
          const order_details = this.order.details ? this.order.details : this.order.detail
          const df = order_details.find(d => d.id == this.details[i].id);
          console.log("Df", df);
          if (df) {
            infos.push(df.address);
          }

          if (i != 0) {
            const y = this;

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
              return function () {

                const df = order_details.find(d => d.id == y.details[i].id);
                console.log("Detail", df)
                infoWindow.setContent(df.address);
                infoWindow.open(map, marker);
              }
            })(marker, i));
          }

        }
        (await loader).dismiss()
      }
      //coordenadas markers personalizados con ventana de información
      if (this.details.length < 25) {
        for (let i = 0; i < this.details.length; i++) {

          let latlng = {
            lat: parseFloat(this.details[i].latitude),
            lng: parseFloat(this.details[i].longitude)
          };

          let icon_house = "assets/imgs/house.png";
          let icon_shop = "assets/imgs/store.png"
          var marker_icon_house = {
            url: icon_house, // url
            scaledSize: new google.maps.Size(50, 50), // size
            // origin: new google.maps.Point(0, 0), // origin
            // anchor: new google.maps.Point(0, 0) // anchor 
          };
          var marker_icon_shop = {
            url: icon_shop, // url
            scaledSize: new google.maps.Size(50, 50), // size
            // origin: new google.maps.Point(0, 0), // origin
            // anchor: new google.maps.Point(0, 0) // anchor 
          };
          let icons = [marker_icon_shop, marker_icon_house]


          let marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: this.order.zapp_store_order == 1 ? icons[i] : this.markers[i],

          })


          this.markerPoints.push(marker);
          // agrego la informacion de la dirección
          console.log("Detail", this.details[i])
          const df = this.order.detail.find(d => d.id == this.details[i].id);
          console.log("Df", df);
          if (df) {
            infos.push(df.address);
          }

          const y = this;

          google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {

              const df = y.order.detail.find(d => d.id == y.details[i].id);
              console.log("Detail", df)
              infoWindow.setContent(df.address);
              infoWindow.open(map, marker);
            }
          })(marker, i));



        }
        const _this = this;
        directionsService.route({
          origin: origin,
          destination: destination,
          waypoints: waypts,
          travelMode: google.maps.TravelMode.DRIVING
        }, async function (response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            if (_this.order.status_order != 31) {
              _this.getDrivers();
            }
            (await loader).dismiss()
          } else {
            (await loader).dismiss();
            localStorage.removeItem("current_order");
            await _this.ui.presentAlert({
              mode: 'ios',
              header: 'No se ha podido mostrar el mapa',
              buttons: [
                {
                  text: 'Aceptar',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {
                    _this.dismiss()
                  }
                },
              ]
            })
            console.log('Ha fallat la comunicació amb el mapa a causa de: ' + status);
          }
        });
      }


      // pregunto si es ida y vuelta el servicio

      // pinto la ruta


      //calcular distancia
      for (let i = 0; i < waypts.length; i++) {
        let a = null,
          b = null;
        if (i < waypts.length - 1) {
          a = { lat: waypts[i].location.lat, lng: waypts[i].location.lng };
        }
        let j = i + 1;
        if (j <= waypts.length - 1) {
          b = { lat: waypts[j].location.lat, lng: waypts[j].location.lng };
        }
        if (a != null && b != null) {
          this.getDistanceMatrix(a, b);
        }
      }
    } catch (e) {
      (await loader).dismiss()
    }

  }

  printDirections(service_options, map) {
    const _this = this;
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    directionsDisplay.setMap(map);
    return new Promise((resolve, reject) => {
      directionsService.route(service_options, async function (response, status) {
        // (await loader).dismiss()
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          resolve({})
          // console.log("center", center)
          // _this.map.setCenter(center)
          if (_this.order.status_order != 25 && _this.order.status_order != 31) {
            // _this.changeAvailability(true);
          }


        } else {

          resolve({})


          console.log('Ha fallat la comunicació amb el mapa a causa de: ' + status);
        }
      });
    })

  }

  viewMore() {

    this.view_more = !this.view_more;
    if (!this.view_more) {
      clearInterval(this.positionTracking);
    } else {
      if (this.order.status_order != 25) {
        // this.changeAvailability();
      }
    }
  }

  rotateMarker(url_image, prev_position, position, angle_rotate?) {
    const url = `img[src='${url_image}']`;
    console.log("Url", url)
    const y: any = document.querySelectorAll(url);
    const marker_div: any = document.querySelector(url)
    console.log("img", marker_div)
    if (y[0]) { // when it hasn't loaded, it's null
      console.log("Encontrado Marker")
      let angle = 0;
      let actual_angle = 0
      if (typeof angle_rotate == 'undefined') {
        angle = google.maps.geometry.spherical.computeHeading(prev_position, position)
        actual_angle = angle
      } else {
        actual_angle = angle_rotate
      }
      console.log("Angle", actual_angle)
      y[0].style.transform = `rotate(${actual_angle}deg)`
      y[0].style.bottom = 0;
      y[0].style.top = 'unset !important';
    }
  }

  async viewEvent(order) {
    clearInterval(this.positionTracking)
    const modal = await this.ui.presentModal(EventsPage, {
      order,

    })
    const m = await modal.onDidDismiss();

  }

  async viewDetails(order) {
    clearInterval(this.positionTracking)
    const modal = await this.ui.presentModal(OrderDetailTimelinePage, {
      order,

    })
    console.log("Order After", this.order)
    const m = await modal.onDidDismiss();

  }

  viewImage(photo) {
    this.ui.viewImage(photo);
  }

  getDistanceMatrix(origin, destination, loader?) {
    var service = new google.maps.DistanceMatrixService();
    var _this = this;

    //calculo distancia
    service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    },
      async function (response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
          await _this.ui.presentAlert({
            mode: 'ios',
            header: 'No se pudo mostrar el mapa, verifique su conexión y reintentelo de nuevo',
            buttons: [
              {
                text: 'Aceptar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                  _this.dismiss()
                }
              }
            ]
          })
          console.log("Error was: " + status);
        } else {
          try {
            const { distance, duration: dur } = response.rows[0].elements[0];
            console.log("Response", response.rows[0].elements[0])
            let distance_text = response.rows[0].elements[0].distance.text;
            console.log("Distance Text", distance_text)
            let duration = dur.value;
            //_this.getCalculateDistance(distance_text, duration);

          } catch (e) {
            console.log("error", e)
          }

        }
      });
  }

  getCalculateDistance(distance, duration) {
    this.distance = distance;
    // this.duration = 0;
    const y = Number(duration);
    this.duration += duration;
    let hour;
    let minutes;
    if (this.duration >= 3600) {
      hour = (this.duration / 3600).toFixed(0);
      if ((this.duration - 3600) >= 60) {
        minutes = ((this.duration - 3600) / 60).toFixed(0);
      } else {
        minutes = (1).toFixed(0);
      }
    } else {
      minutes = (this.duration / 60).toFixed(0)
    }
    const hour_unit = Number(hour) == 1 ? ' hora' : this.duration < 3600 ? '' : ' horas';
    const min_unit = Number(minutes) == 1 ? ' minuto' : ' minutos';
    hour = hour ? hour : ''
    this.duration_text = hour + hour_unit + " " + minutes + min_unit;

  }

  callANumber(number) {
    clearInterval(this.positionTracking)
    console.log("Phone", number);
    this.ui.call(number);
  }

  

  findLetter() {
    const index = this.order.details.findIndex(d => d.id == this.detailActive.id)
    return this.az_arr[index];
  }

  dismiss() {
    clearInterval(this.positionTracking);
    this.ui.dismiss()
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave")
    clearInterval(this.positionTracking);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }


  }

  ionViewDidLeave() {
    console.log("ionViewDidLeave")
    clearInterval(this.positionTracking);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
    Geolocation.clearWatch({ id: this.id });

  }



}
