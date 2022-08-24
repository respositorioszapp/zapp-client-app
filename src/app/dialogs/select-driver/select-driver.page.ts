import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { MapPage } from '../map/map.page';
import { Driver } from 'src/app/interfaces/Driver';
import { IonContent } from '@ionic/angular';
import { RealtimeService } from 'src/app/services/realtime.service';
import { EventsPage } from '../events/events.page';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { ErrorResponseService } from 'src/app/services/error-response.service';
import { format, add } from 'date-fns'
import { DatePipe } from '@angular/common';
import { DateFormatHourPipe } from 'src/app/pipes/date-format-hour.pipe';
import { DaysService } from 'src/app/services/days.service';
import { DatetimeInputPage } from '../datetime-input/datetime-input.page';
declare var google: any;
@Component({
  selector: 'app-select-driver',
  templateUrl: './select-driver.page.html',
  styleUrls: ['./select-driver.page.scss'],
})
export class SelectDriverPage implements OnInit, OnDestroy {
  @ViewChild(IonContent, { read: IonContent, static: false }) myContent: IonContent;
  quotation: any = {};
  @Input() driver: any
  @Input() order: any
  @Input() disable: boolean
  subscription: Subscription
  view_more = true

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

  time = {
    start_time: this.formatDated(new Date()),
    departure_time: this.formatDated(add(new Date(), {
      hours: 1
    })),
    start_time_military_format: this.formatDated(new Date()),
    departure_time_military_format: this.formatDated(add(new Date(), {
      hours: 1
    }))
  }
  difference = 1
  price_per_transport_type = {}
  store_states = {
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
    25: {
      message: "FINALIZADO",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 58,
      icon: "delivery-location",
      class: 'completed'
    },
    24: {
      message: "EN PROCESO",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 58,
      icon: "delivery-location",
      class: 'in-process'
    },

    48: {
      message: 'NO EFECTIVA',
      class: 'not-effective'
    },
    31: {
      message: 'CANCELADA',
      class: 'completed'
    },
    36: {
      message: 'CANCELADA POR MENSAJERO',
      class: 'completed'
    },
    23: {
      message: "ASIGNADA",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 58,
      icon: "delivery-location",
      class: 'in-process'
    },

  }

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
    22: {
      message: "No Asignada",
      state: 22,
      class: "danger"
    },
    24: {
      message: "En proceso",
      state: 24,
      class: "in-proccess"
    },
    25: {
      message: "completado",
      state: 25,
      class: "success"
    },
    31: {
      message: "Cancelada",

      state: 31,
      class: "warning"
    },
    36: {
      message: "Cancelada por mensajero",

      state: 36,
      class: "danger"
    },
    48: {
      message: "No efectiva",

      state: 48,
      color: "dark",
      class: 'not-effective'

    }
  }
  map: any
  i = 0
  indexDriverEncontrado=0
  constructor(private ui: UiService, private realtime: RealtimeService, private auth: AuthService,
    private request: RequestService,
    private error: ErrorResponseService,
    private date: DatePipe,
    private date_format: DateFormatHourPipe,
    private days: DaysService) { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  async changeHour() {

    console.log("Start time", this.time.start_time_military_format);
    console.log("Formateada", this.date_format.transform(this.time.start_time_military_format, true))

    console.log("Departure time", this.time.departure_time_military_format)
    console.log("Formateada Departure", this.date_format.transform(this.time.departure_time_military_format, true))
    const format_start_time = this.date_format.transform(this.time.start_time_military_format, false);
    const format_departure_time = this.date_format.transform(this.time.departure_time_military_format, false);
    this.driver.start_time_military_format = format_start_time;
    this.driver.departure_time_military_format = format_departure_time;
    this.driver.start_time = this.date_format.transform(this.time.start_time_military_format, true);
    this.driver.departure_time = this.date_format.transform(this.time.departure_time_military_format, true);
    const difference = this.days.getHourDiff(format_start_time, format_departure_time, 'hh:mm A');
    if (difference < 0) {
      await this.ui.presentAlert({
        mode: 'ios',
        header: 'La diferencia de horas no debe ser negativa',
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
    } else {
      if (difference % 1 == 0) {
        this.driver.number_hours = difference;
        console.log("Difference", difference)
        this.difference = difference;
      } else {
        await this.ui.presentAlert({
          mode: 'ios',
          header: 'La diferencia de horas debe ser exacta',
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


  async ngOnInit() {



  }

  async ionViewWillEnter() {
    if (!this.disable) {
      this.disable = false;
    }
    this.indexDriverEncontrado=0
    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));
    }
    this.view_more=true;
    if (!this.disable) {
      const loader = await this.ui.loading("Por favor espere...");
      this.request.get("list/attributes?parameter_id=2")
        .subscribe(async (res: any) => {
          (await loader).dismiss();
          res.data.map(transport_type => {
            this.price_per_transport_type[transport_type.name] = transport_type.value;
          })
        }, async (err: any) => {
          (await loader).dismiss();
        })
      this.time = {
        start_time: this.formatDated(new Date()),
        departure_time: this.formatDated(add(new Date(), {
          hours: 1
        })),
        start_time_military_format: this.formatDated(new Date()),
        departure_time_military_format: this.formatDated(add(new Date(), {
          hours: 1
        }))
      }
      console.log("Value Time", this.time);
      if (this.driver.start_time_military_format) {
        console.log("Driver Start time", this.driver.start_time_military_format)
        console.log("Date Test", new Date("10:10"))
        const splitStart_time_military_format: any[] = this.driver.start_time_military_format.split(" ");
        let start_time_military_format: string = splitStart_time_military_format[splitStart_time_military_format.length - 1];

        const date = this.formatDateNow() + " " + start_time_military_format;
        console.log("Date Start", date)
        this.time.start_time_military_format = this.formatDated(date);
        console.log("Start", this.time.start_time_military_format)
      } else {
        this.driver.start_time_military_format = this.time.start_time_military_format;

      }

      if (this.driver.departure_time_military_format) {
        const splitDeparture_time_military_format: any[] = this.driver.departure_time_military_format.split(" ");
        let departure_time_military_format: string = splitDeparture_time_military_format[splitDeparture_time_military_format.length - 1];
        const date = this.formatDateNow() + " " + departure_time_military_format;
        this.time.departure_time_military_format = this.formatDated(date);
        console.log("End", this.time.departure_time_military_format)
      } else {
        this.driver.departure_time_military_format = this.time.departure_time_military_format;
      }
      console.log("VAlue After Time ", this.time)
      if (this.driver.number_hours) {
        this.difference = this.driver.number_hours;
      }
      if (!this.driver.start_time) {
        this.driver.start_time = this.date_format.transform(this.time.start_time_military_format, true);
      }
      if (!this.driver.departure_time) {
        this.driver.departure_time = this.date_format.transform(this.time.departure_time_military_format, true);
      }
    } else {
      console.log("Viendo los drivers")
      this.loadMap()
      this.listenToStatusOrder();
      this.realtime.getFirebaseCollectionObject(`order_detail_report/${this.order.id}/${this.driver.detail_id}`)
        .subscribe((res: any) => {
          if (res != null) {
            console.log("Driver Details", this.driver, res)
            this.driver = { ...this.driver, ...res };
            if (res.length > 0) {


            } else {
              console.log("Array vacío")
            }
          }
        })
      this.getDrivers()
    }
  }

  get driverOb() {
    
    if (this.order.drivers) {
      if (this.order.details) {

        const driver = this.order.drivers.find(dri => (dri.driver_id==this.driver.people_id) || (dri.driver_id==this.driver.id));
        if (this.i == 0) {
          console.log("Driver Encontrado", driver, this.order.drivers, this.order.detail, this.driver);
        }
        this.i++;
        if(driver){
          if(this.indexDriverEncontrado==0){
            this.getDrivers();
            this.indexDriverEncontrado++
          }
        }
        return driver;
      } else {
        const driver = this.order.drivers.find(dri => (dri.driver_id==this.driver.people_id) || (dri.driver_id==this.driver.id));
        if (this.i == 0) {
          console.log("Driver Encontrado", driver, this.order.drivers, this.order.detail, this.driver);
        }
        if(driver){

          if(this.indexDriverEncontrado==0){
            console.log("Driver Encontrado 1", driver)
            this.getDrivers();
            this.indexDriverEncontrado++
          }
        }
        this.i++;

        return driver;
      }
    }
    
    return null;
  }


  get details() {

    return this.order.details.find(d => d.status != 25 && d.status != 36 && d.status != 48)
  }

  formatDated(date) {
    let d = new Date(date),
      day = '' + d.getDate(),
      month = '' + (d.getMonth() + 1),
      year = '' + d.getFullYear(),
      minutes='' + d.getMinutes(),
      hours='' + d.getHours();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    console.log("Fecha", [year, month, day].join('-'))
    return [year, month, day].join('-') + "T" + hours + ":" + minutes;
    return d.getHours() + ":" + d.getMinutes();
    //return new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' }).format(date)
  }

  async changeTime(date,input){
    const modal = await this.ui.presentModal(DatetimeInputPage, { inputType:'time', value:(date) }, ['modal-xs','height-time']);
    modal.onDidDismiss().then((data:any)=>{
      console.log("Date ", date,data)
      if(data){
        if(data.data.value){
          this.time[input]=data.data.value;
          this.changeHour()
        }
      }
    })
  }

  formatDateNow() {
    let d = new Date(),
      day = '' + d.getDate(),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    console.log("Fecha", [year, month, day].join('-'))
    return [year, month, day].join('-');
  }

  getTotal() {
    if (Object.keys(this.price_per_transport_type).length > 0) {
      const { transport_type } = this.quotation;
      const price = this.price_per_transport_type[transport_type];
      const total = Number(this.difference) * price;
      this.driver.total = total;
      return Number(this.difference) * price;
    }
    return 0;

  }

  callANumber(number) {

    console.log("Phone", number);
    this.ui.call(number);
  }

  async scrollToBottom(): Promise<void> {
    try {
      this.myContent.scrollToBottom();
    } catch (err) { }
  }

  viewImage(photo) {
    this.ui.viewImage(photo);
  }

  async loadMap() {
    console.log("mapaaaaa");
    if (google) {
      const loader = await this.ui.loading("Por favor espere...");
      //obtener usos de la API
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
      //puntos de referencia para agregar
      var waypts = [];
      var markers = [];
      var infos = [];
      //coordenadas de los puntos de ruta
      for (let i = 0; i < this.driver.address_array.length; i++) {

        let latlng = {
          lat: Number(this.driver.address_array[i].latitude),
          lng: Number(this.driver.address_array[i].longitude)
        };
        waypts.push({ location: latlng, stopover: true });
      }
      //creo mapa
      var lat = Number(waypts[0].location.lat);
      var long = Number(waypts[0].location.lng);

      var map = new google.maps.Map(document.getElementById("mapDriver"), {
        zoom: 15,
        center: new google.maps.LatLng(lat, long),
        rotateControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: false,
      });
      this.map = map
      //muestro el mapa
      directionsDisplay.setMap(map);
      //ventanas de informacion
      var infoWindow = new google.maps.InfoWindow();
      //coordenadas markers personalizados con ventana de información
      for (let i = 0; i < this.driver.address_array.length; i++) {

        let latlng = {
          lat: Number(this.driver.address_array[i].latitude),
          lng: Number(this.driver.address_array[i].longitude)
        };

        let marker = new google.maps.Marker({
          position: latlng,
          map: map,
          icon: '../../../assets/imgs/markers/' + this.az_arr[i] + '.png'
        })
        markers.push(marker);
        // agrego la informacion de la dirección
        infos.push(this.driver.address_array[i].address);

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {

            infoWindow.setContent(infos[i]);
            infoWindow.open(map, marker);
          }
        })(marker, i));
      }

      // pregunto si es ida y vuelta el servicio
      let origin, destination, return_pt;
      let n = (this.driver.address_array.length - 1);
      if (this.driver.round_trip === true) {
        origin = { lat, lng: long };
        destination = { lat, lng: long };
        return_pt = { lat, lng: long };
        //punto de retorno en km y min
        if (!this.disable) {
          this.getDistanceMatrix(return_pt, origin);
        }

      } else {
        origin = { lat, lng: long };
        destination = { lat: Number(waypts[n].location.lat), lng: Number(waypts[n].location.lng) };
      }
      // pinto la ruta
      const drivers_filter = this.driver.address_array.filter(a => a.address != "" && a.latitude != "" && a.longitude != "")
      var _this = this;
      if (drivers_filter.length >= 2) {
        directionsService.route({
          origin: origin,
          destination: destination,
          waypoints: waypts,
          travelMode: google.maps.TravelMode.DRIVING
        }, async function (response, status) {
          (await loader).dismiss()
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            if (_this.disable) {
              _this.getDrivers()
            }
          } else {
            console.log('Ha fallat la comunicació amb el mapa a causa de: ' + status);
            await _this.ui.presentAlert({
              mode: 'ios',
              header: 'No se ha podido mostrar las dirreciones, por favor intentelo de nuevo',
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
          }
        });
        if (!this.disable) {
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
        }
      } else {
        (await loader).dismiss()
      }

      // for (let i = 0; i < waypts.length; i++) {
      //   let a = null,
      //     b = null;
      //   if (i < waypts.length - 1) {
      //     a = { lat: waypts[i].location.lat, lng: waypts[i].location.lng };
      //   }
      //   let j = i + 1;
      //   if (j <= waypts.length - 1) {
      //     b = { lat: waypts[j].location.lat, lng: waypts[j].location.lng };
      //   }
      //   if (a != null && b != null) {
      //     this.getDistanceMatrix(a, b);


      //   }
      // }
    }

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
                  name_shortcut: blah.name_shorcut,
                  description: blah.description
                }
                const loader = await this.ui.loading("Por favor espere...");

                this.request.post('customer/add_favourite_address', obj)
                  .subscribe(async (res: any) => {
                    (await loader).dismiss()
                    console.log("Res ", res)
                    item.favorite = true;

                    if (!this.auth.user.customer_addresses) {
                      this.auth.user.customer_addresses = []
                      // this.auth.user.user.customer_addresses = []
                    }
                    this.auth.user.customer_addresses.push(obj);
                    this.auth.setUser(this.auth.user);
                  }, async (err: any) => {
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


  getDistanceMatrix(origin, destination, driver?: Driver) {
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
      function (response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
          console.log("Error was: " + status);
        } else {
          console.log("Distance matrix")
          if (response.rows[0].elements[0].distance) {
            let distance_text = response.rows[0].elements[0].distance.text;
            let distance = distance_text.substring(0, distance_text.length - 3).replace(",", ".");
            let duration_text = response.rows[0].elements[0].duration.text;
            let duration = duration_text.substring(0, distance_text.length - 4);
            this.distance += Math.round(Number(distance));
            // if(this.quotation.round_trip == true){
            //   this.distance *=2;
            // }
            // this.duration = 0;
            const { duration: dur } = response.rows[0].elements[0];
            _this.driver.km = Math.round(_this.driver.km + Number(distance));
            _this.driver.time = _this.driver.time + Number(dur.value);
            let hour;
            let minutes;
            if (_this.driver.time >= 3600) {
              hour = (_this.driver.time / 3600).toFixed(0);
              if ((_this.driver.time - 3600) >= 60) {
                minutes = ((_this.driver.time - 3600) / 60).toFixed(0);
              } else {
                minutes = (1).toFixed(0);
              }
            } else {
              minutes = (_this.driver.time / 60).toFixed(0)
            }
            console.log("Time", _this.driver.time)
            const hour_unit = Number(hour) == 1 ? ' hora' : _this.driver.time < 3600 ? '' : ' horas';
            const min_unit = Number(minutes) == 1 ? ' minuto' : ' minutos';
            hour = hour ? hour : ''
            _this.driver.time_text = hour + hour_unit + " " + minutes + min_unit;
          }

        }
      });
  }

  add() {
    const index = this.driver.address_array[this.driver.address_array.length - 1].index + 1;
    let address_item = { index, address: "", description: "", contact_name: '', contact_phone: '', latitude: "", longitude: "", hover: false };
    this.driver.address_array.push(address_item);
    this.scrollToBottom()
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
       
      
       
     }
   })
 }

  viewMore() {

    this.view_more = !this.view_more;
    console.log("View More", this.view_more)
    if (!this.view_more) {

    } else {
      if (this.order.status_order != 25) {
        // this.changeAvailability();
      }
    }
  }

  getDrivers(driver_id?: number) {
    let icon = "";
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
      scaledSize: new google.maps.Size(50, 50), // size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor 
    };

    let driver_markers

    const driver = driver_id ? driver_id : this.driver.id;
    this.subscription = this.realtime.getFirebaseCollectionObject("order_gps/" + this.order.id)
      .subscribe((res: any) => {

        console.log("Order Gps Driver Array", res)

        if (res) {
          if (this.driverOb) {
            const objArray = Object.keys(res);
            objArray.forEach(key => {
              console.log("Order Gps Keys", key,this.driverOb.driver_id)
              if (Number(key) == this.driverOb.driver_id) {
                const driverFirebase = res[key];
                if (driverFirebase) {
                  if (driver_markers) {
                    driver_markers.setMap(null)
                    driver_markers = undefined
                  }
                  let latlng = {
                    lat: parseFloat(driverFirebase.lat),
                    lng: parseFloat(driverFirebase.lng)
                  };
                  let marker = new google.maps.Marker({
                    position: latlng,
                    map: this.map,
                    icon: marker_icon,
                  })
                  driver_markers = marker;
                }
              }

            })




          }


        }
      }, err => {

      })


  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave")
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }

  save() {
    let valid = true;
    this.driver.address_array.forEach(item => {
      let address_validate = item.address == ''
      let description_validate = item.description == '';
      let contact_name_validate = item.contact_name == '';
      let contact_phone_validate = item.contact_phone == '';

      if (address_validate || description_validate ||
        contact_name_validate || contact_phone_validate) {
        valid = false;
      }
    })

    if (valid) {
      this.driver.address_array[0].start_time_military_format = this.driver.start_time_military_format;
      this.driver.address_array[0].departure_time_military_format = this.driver.departure_time_military_format;
      this.driver.address_array[0].start_time = this.driver.start_time;
      this.driver.address_array[0].departure_time = this.driver.departure_time
      this.driver.number_hours=this.difference;
      this.driver.address_array[0].number_of_hours = this.driver.number_hours;
      this.driver.address_array[0].total = this.driver.total;
      this.ui.showToast("Guardado " + this.driver.driver);
      this.dismiss()
    } else {
      this.ui.showToast("Debe llenar todos los campos");
    }
  }

  dismiss() {
    this.ui.dismiss()
  }

  // addDriver(){

  //     this.driver_count_array.push({
  //       driver: (this.transport_type + " " + (this.driver_count_array.length+1)),
  //       address_array: [
  //         { address: "", description: "", contact_name: '', contact_phone: '', latitude: "", longitude: "", hover: false },
  //         { address: "", description: "", contact_name: '', contact_phone: '', latitude: "", longitude: "", hover: false }
  //       ], km: 0, time: 0
  //     });
  //     this.driver_count=this.driver_count+1;


  // }

  rm(index) {
    if (this.driver.address_array.length > 2) {
      this.driver.address_array.splice(index, 1);
      this.driver.address_array.forEach((a, i) => {
        a.index = (i + 1)
      })
      // const index_driver = this.driver_count_array.findIndex(d => d.driver == d.driver);
      // this.loadMap(driver, "map"+index_driver)

    }

  }

  async viewEvent(order) {
    order.driver_assigned = this.driver.driver_o
    const modal = await this.ui.presentModal(EventsPage, {
      order,
    })
    const m = await modal.onDidDismiss();

  }

  // rmDriver(index, driver) {
  //   console.log("", )
  //   if (this.driver_count_array.length > this.quotation.driver_count) {
  //     this.driver_count_array.splice(index, 1);
  //     this.driver_count=this.driver_count-1;
  //     this.duration -= driver.time;
  //     this.distance -= driver.km;

  //   }

  // }

  async openDialog(item, i) {
    console.log("ddg")
    let icon = this.az_arr[i] + '.png';
    console.log("Quotation", this.quotation)
    let data = {
      city: this.disable ? this.order.city : this.quotation.city,
      latitude: this.driver.address_array[i].latitude ? this.driver.address_array[i].latitude : this.quotation.latitude,
      longitude: this.driver.address_array[i].longitude ? this.driver.address_array[i].longitude : this.quotation.longitude,
      icon: icon,
      address: this.driver.address_array[i].address,
      disable: Object.keys(this.quotation).length == 0
    };
    const modal = await this.ui.presentModal(MapPage, data, ['custom-modal'])
    modal.onDidDismiss().then(() => {
      if (!this.disable) {
        if (localStorage.getItem('address_item')) {
          let address_item = JSON.parse(localStorage.getItem('address_item'));
          this.driver.address_array[i].address = address_item.address;
          this.driver.address_array[i].latitude = address_item.lat;
          this.driver.address_array[i].longitude = address_item.lng;
          item.selected = true;
          item.favorite = address_item.favorite;
          // const drivers_filter = this.driver.address_array.filter(a => a.address != "" && a.latitude != "" && a.longitude != "")
          // if (drivers_filter.length >= 1) {
          //   this.loadMap()
          // }
          localStorage.removeItem('address_item');
        }
      }

    })
  }

}
