import { Component, OnInit, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Geolocation } from '@capacitor/geolocation';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorResponseService } from 'src/app/services/error-response.service';
import { RequestService } from 'src/app/services/request.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map_data: FormGroup = new FormGroup({
    address: new FormControl('', [Validators.required, Validators.email]),
  });
  @Input() city: any
  az_arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  distance = ""
  duration = ""
  details = []
  @Input() latitude: any
  @Input() longitude: any
  @Input() index: string
  @Input() icon: string
  @Input() disable: boolean
  title = '';
  map: any;
  marker: any;
  googleAutocomplete: any;
  lat = null;
  lng = null;
  @Input() address: string
  info_window: any
  searchText = ""
  results: any[] = []
  quotation: any = {}
  address_selected: any = {}
  inputFocus:boolean=false
  constructor(private ui: UiService, private auth: AuthService,
    private error: ErrorResponseService,
    private request: RequestService) {

     
     }

  ngOnInit() {
    
    if (!this.disable) {
      this.disable = false;
    }
    console.log("Disable", this.disable)
    if (localStorage.getItem('quotation')) {
      this.quotation = JSON.parse(localStorage.getItem('quotation'));
      console.log("Quotation", this.quotation)
    }
    this.loadMap()

  }

  ionViewWillEnter(){
    this.inputFocus=true;
  }

  focus(){
    console.log("Focus")
    this.inputFocus=true;
  }

  blur(){
    console.log("Blur")
    //this.inputFocus=false;
  }

  async loadMap() {
    const loader = await this.ui.loading("Por favor espere...");
    //1. coordenadas del mapa
    let latLng = new google.maps.LatLng(this.latitude, this.longitude);
    var infoWindow = new google.maps.InfoWindow();
    this.map = new google.maps.Map(document.getElementById('mapMap'), {
      zoom: 16,
      center: latLng,
      rotateControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: false,
    });
    var _this = this;
    _this.marker = new google.maps.Marker({
      map: _this.map,
      position: latLng,
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: 'assets/imgs/markers/' + _this.icon
    });
    //4. mostrar el mapa
    _this.marker.setMap(_this.map);
    //5. obtener dirección al mover el marker

    if (!this.disable) {
      _this.marker.addListener('dragend', (event) => {
        _this.lat = this.marker.getPosition().lat();
        _this.lng = this.marker.getPosition().lng();
        console.log(this.lat, this.lng);
        //busca la direccion
        _this.findPlace(new google.maps.LatLng(this.lat, this.lng), true);
      });
      //6. input de direcciones
      var searchbar = document.getElementById('searchbar');
      //buscar solo en  colombia
      var options = {
        // types: ['geocode'],
        componentRestrictions: { country: 'CO' }
      };

    }

    this.info_window = new google.maps.InfoWindow();
    let info = "Escriba una dirección o mueva el marcador";
    if (this.address) {
      info = this.address;
    }

    this.info_window.setContent(info);
    this.info_window.open(this.map, this.marker);

    //3. marcador 
    this.map.addListener('idle', async function (e) {
      (await loader).dismiss();

      //3. marcador 

    });
  }

  async selectMyLocation() {
    try {

      const position = await Geolocation.getCurrentPosition();
      console.log("Position", position.coords)
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      console.log("Latitude", this.lat);
      console.log("Longitude", this.lng);
      const lat_lng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.marker.setMap(null);
      this.map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      this.marker = new google.maps.Marker({
        map: this.map,
        position: lat_lng,
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: 'assets/imgs/markers/' + this.icon
      });
      //4. mostrar el mapa
      this.marker.setMap(this.map);
      this.findPlace(new google.maps.LatLng(position.coords.latitude, position.coords.longitude), false);
    } catch (e) {

    }

  }

  search() {
    const address= this.map_data.value.address;
    if (address) {
      const service = new google.maps.places.AutocompleteService();
      var _this = this;
      service.getPlacePredictions({
        input: address,
        componentRestrictions: { country: 'CO' }
      }, (predictions: any, status: any) => {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          this.results = [{
            description: "No hay resultados"
          }]
          return;
        }

        // console.log("Predictions", predictions);
        if (this.auth.user != undefined) {
          if (!this.auth.user.customer_addresses) {
            this.auth.user.customer_addresses = []
            // this.auth.user.user.customer_addresses = []
          }
          let favorite_address = this.auth.user.customer_addresses.filter((a, i) => {
            return a.address.toLowerCase().includes(this.address.toLowerCase()) ||
              a.name_shortcut.toLowerCase().includes(this.address.toLowerCase())
          }

          );
          console.log("Direcciones favoritas", favorite_address)
          for (let i = 0; i < favorite_address.length; i++) {
            predictions.unshift({
              description: favorite_address[i].address,
              latitude: favorite_address[i].latitude,
              longitude: favorite_address[i].longitude,
              favorite: true

            })

          }
        }

        console.log("Predictions", predictions)

        _this.results = predictions
        // console.log('miren aqui', predictions);
      });
    } else {
      this.results = []
    }
  }


  async selectAddress(item) {
    this.searchText = item.description;
    this.address=item.description;
    this.address_selected = item;
    this.results = []
   

    this.findAddress(item.description)
    this.inputFocus=false;
  }

  async findAddressFavorite(address) {
    const loader = await this.ui.loading("Por favor espere...");
    let geocoder = new google.maps.Geocoder();
    return new Promise(resolve => {
      geocoder.geocode({ address }, async (results, status) => {
        (await loader).dismiss()
        if (status == google.maps.GeocoderStatus.OK) {
          console.log("Address results", results[0]);
          const latitude = results[0].geometry.location.lat();
          const longitude = results[0].geometry.location.lng();
          resolve({
            latitude,
            longitude
          })
          return;
        }
        resolve({})
      });
    })



  }

  async findAddress(address) {
    const loader = await this.ui.loading("Por favor espere...");
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, async (results, status) => {
      (await loader).dismiss()
      if (status == google.maps.GeocoderStatus.OK) {
        console.log("Address results", results[0]);
        this.lat = results[0].geometry.location.lat();
        this.lng = results[0].geometry.location.lng();
        console.log(this.lat, this.lng);
        //desplaza el mapa a las coordenadas
        const position = new google.maps.LatLng(this.lat, this.lng);
        this.map.panTo(position);
        this.marker.setMap(null);
        this.marker = new google.maps.Marker({
          map: this.map,
          position,
          draggable: true,
          animation: google.maps.Animation.DROP,
          icon: 'assets/imgs/markers/' + this.icon
        });
        this.marker.setMap(this.map);
        this.info_window.setContent(results[0]['formatted_address']);
        this.info_window.open(this.map, this.marker);
        this.address = results[0]['formatted_address'];
        this.map_data.patchValue({
          address:results[0]['formatted_address']
        })
        //dragable
        this.marker.addListener('dragend', (event) => {
          this.lat = this.marker.getPosition().lat();
          this.lng = this.marker.getPosition().lng();
          console.log(this.lat, this.lng);
          //busca la direccion
          this.findPlace(new google.maps.LatLng(this.lat, this.lng), false);
        });

      }
    });


  }

  async findPlace(latLng, input) {
    let geocoder = new google.maps.Geocoder();
    //cuando usamos el buscador
    if (input) {
      this.marker.setMap(null);
      this.marker = new google.maps.Marker({
        map: this.map,
        position: latLng,
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: 'assets/imgs/markers/' + this.icon
      });
      this.marker.setMap(this.map);
      //dragable
      this.marker.addListener('dragend', (event) => {
        this.lat = this.marker.getPosition().lat();
        this.lng = this.marker.getPosition().lng();
        console.log(this.lat, this.lng);
        //busca la direccion
        this.findPlace(new google.maps.LatLng(this.lat, this.lng), false);
      });
    }

    // const loader = await this.ui.loading("Por favor espere...");

    geocoder.geocode({ 'latLng': latLng }, async (results, status) => {
      // (await loader).dismiss()
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results[0]);
        console.log("Este es el find place")
        this.info_window.setContent(results[0]['formatted_address']);
        this.info_window.open(this.map, this.marker);
        this.map_data.patchValue({
          address:results[0]['formatted_address']
        })
        this.address = results[0]['formatted_address']

      } else {
        await this.ui.presentAlert({
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
      }
    });
  }


  save() {
    var searchbar: any = document.getElementById('searchbar');
    console.log(searchbar.value);
    if (this.aTrim(searchbar.value) != '' && this.lat && this.lng) {
      let address_item = {
        lat: this.lat,
        lng: this.lng,
        address: searchbar.value,
        favorite: this.address_selected.favorite
      }
      localStorage.setItem('address_item', JSON.stringify(address_item));
      this.dismiss();
    } else {
      this.ui.showToast("Introduzca una ubicación o mueva el marcador")

    }

  }

  async saveFavoriteAddress(item) {
    if (item && !item.favorite) {
      const objectLatLng:any= await this.findAddressFavorite(item.description);
      if(Object.keys(objectLatLng).length<=0){
        await this.ui.presentAlert({
          mode: 'ios',
          header: 'Lo sentimos',
          message:'No se encontró la ubicación',
          buttons: [
            {
              text: 'Aceptar',
              role:'cancel',
              cssClass: 'secondary',
              handler: async (blah) => {
                

              }
            },
          ]
        })
        return;
      }
      if (item.description && objectLatLng.latitude && objectLatLng.longitude) {
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
                  address: item.description,
                  latitude: objectLatLng.latitude,
                  longitude: objectLatLng.longitude,
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
        if (!item.description) {
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



  aTrim(string) {
    return string.replace(/\s/g, "");
  }

  dismiss() {
    this.ui.dismiss()
  }


}
