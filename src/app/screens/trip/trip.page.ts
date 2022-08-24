import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
declare var google: any;
@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  loader;
  quotation: any = {};
  address_arr: any = [
    { address: '', description: '', contact_name: '', contact_phone: '', latitude: '', longitude: '', hover: false },
    { address: '', description: '', contact_name: '', contact_phone: '', latitude: '', longitude: '', hover: false },
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
  distance = 0;
  duration = 0;
  duration_text = ""
  distance_text = ""
  unity=""
  constructor(private ui: UiService, private router: Router, private auth : AuthService) { }

  ngOnInit() {
    localStorage.setItem('step', '5');
  }

  ionViewWillEnter() {
    
    this.hideCart()
    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));
      this.loadMap();
    }

  }

  hideCart(){
    
    this.auth.person.hide_cart = true;
    this.auth.setPerson(this.auth.person);
  }

  next() {
    if (this.duration >= 3600) {
      this.duration = Number((this.duration / 3600).toFixed(0));
    } else {
      this.duration = Number((this.duration / 60).toFixed(0))
    }
    this.quotation.distance = this.distance;
    this.quotation.duration = this.duration;
    this.quotation.duration_text = this.duration_text;
    this.quotation.distance_text = this.distance_text;
    this.quotation.unity = this.unity;

    localStorage.setItem('quotation', JSON.stringify(this.quotation));
    this.router.navigate(['/tabs/select-time']);

  }



  async loadMap() {
    this.distance = 0;
    this.duration = 0;
    this.duration_text = "0 min"
    this.distance_text = "0 km"
    this.loader = await this.ui.loading("Por favor espere...");
    //obtener usos de la API
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
    });
    //puntos de referencia para agregar
    var waypts = [];
    var markers = [];
    var infos = [];
    //coordenadas de los puntos de ruta
    for (let i = 0; i < this.quotation.address_arr.length; i++) {
      let latlng = {
        lat: this.quotation.address_arr[i].latitude,
        lng: this.quotation.address_arr[i].longitude,
      };
      waypts.push({ location: latlng, stopover: true });
    }
    //creo mapa
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: { lat: waypts[0].location.lat, lng: waypts[0].location.lng },
      rotateControl: false,
      mapTypeControl: false,
      streetViewControl: false,
    });
    //muestro el mapa
    directionsDisplay.setMap(map);
    //ventanas de informacion
    var infoWindow = new google.maps.InfoWindow();
    //coordenadas markers personalizados con ventana de información
    for (let i = 0; i < this.quotation.address_arr.length; i++) {
      let latlng = {
        lat: this.quotation.address_arr[i].latitude,
        lng: this.quotation.address_arr[i].longitude,
      };

      let marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: '../../../assets/imgs/markers/' + this.az_arr[i] + '.png',
      });
      markers.push(marker);
      // agrego la informacion de la dirección
      infos.push(this.quotation.address_arr[i].address);

      google.maps.event.addListener(
        marker,
        'click',
        (function (marker, i) {
          return function () {
            infoWindow.setContent(infos[i]);
            infoWindow.open(map, marker);
          };
        })(marker, i)
      );
    }

    // pregunto si es ida y vuelta el servicio
    let origin, destination, return_pt;
    let n = this.quotation.address_arr.length - 1;
    if (this.quotation.round_trip === true) {
      origin = { lat: waypts[0].location.lat, lng: waypts[0].location.lng };
      destination = {
        lat: waypts[0].location.lat,
        lng: waypts[0].location.lng,
      };
      return_pt = { lat: waypts[n].location.lat, lng: waypts[n].location.lng };
      //punto de retorno en km y min
      this.getDistanceMatrix(return_pt, origin);
    } else {
      origin = { lat: waypts[0].location.lat, lng: waypts[0].location.lng };
      destination = {
        lat: waypts[n].location.lat,
        lng: waypts[n].location.lng,
      };
    }
    //defino la referencia al componente
    var _this = this;
    // pinto la ruta
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypts,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      async function (response, status) {
        (await _this.loader).dismiss();
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          console.log(
            'Ha fallat la comunicació amb el mapa a causa de: ' + status
          );
          await _this.ui.presentAlert({
            mode: 'ios',
            header: 'No se ha podido mostrar las dirreciones, por favor intentelo de nuevo',
            buttons: [
              {
                text: 'Aceptar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  _this.router.navigate(['tabs/select-address'])
                }
              },
            ]
          })
        }
      }
    );

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
  }

  getDistanceMatrix(origin, destination, loader?) {
    var service = new google.maps.DistanceMatrixService();
    var _this = this;
    //calculo distancia
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      },
      async function (response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
          
          console.log('Error was: ' + status);
          await _this.ui.presentAlert({
            mode: 'ios',
            header: 'No se ha podido mostrar la información',
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
          
          try {
            const { distance, duration: dur } = response.rows[0].elements[0];
            console.log("Response", response.rows[0].elements[0])
            let distance_text = response.rows[0].elements[0].distance.text;
            let distance_value = response.rows[0].elements[0].distance.value;
            console.log("Distance Text", distance_text)
            let duration = dur.value;
            _this.distance_text= distance_text;
            //Added this to konow the distance unity
            _this.unity=distance_value>1000?'Km':'m'
            _this.getCalculateDistance(distance_value, duration);

          } catch (e) {
            console.log("error", e)
          }
        }
      }
    );
  }

  getCalculateDistance(distance, duration) {
    console.log("Duration", duration)
    //distance = distance.replace("km", "").replace("m", "").replace(",", "").trim();
    console.log("Distance", distance)
    if(distance>1000){
      this.distance += Math.round(Number(distance/1000));
    }else{
      this.distance += Math.round(Number(distance));
    }
    
    
    // if(this.quotation.round_trip == true){
    //   this.distance *=2;
    // }
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

}
