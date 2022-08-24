import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ImagePage } from '../image/image.page';
import { UiService } from 'src/app/services/ui.service';
import { PhotoService } from 'src/app/services/photo.service';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  @Input() order: any
  @ViewChild(IonContent, { read: IonContent, static: false }) myContent: IonContent;
  @Input() longitude: any
  @Input() latitude: any
  personal_information = this.fb.group({
    comment: ['', Validators.required],
  },
  );
  image: any = {
    url: "assets/imgs/img-default.jpg",
    format: "",

  }

  driver: any = {
    driver_name : "No asignada"
  }

  events: any[] = []
  constructor(private ui: UiService,
    private photo: PhotoService,
    private auth: AuthService,
    private request: RequestService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  get controls() {
    return this.personal_information.controls;
  }

  async ionViewWillEnter() {
    console.log("Order", this.order)
    const loader = await this.ui.loading("Por favor espere...");
    if (this.order.service_type_id != 3) {
      if (this.order.drivers.length > 0) {
        this.driver = this.order.drivers[0];
      } else {
        this.driver = {
          driver_name: "No asignada"
        }
      }
      if(this.order.status_order < 24){
        (await loader).dismiss()
        return;
      }

      this.request
        .get(`driver/events_in_order/${this.order.id}`)
        .subscribe(async (res: any) => {
          (await loader).dismiss();
          this.events = res.data;
          this.events = this.events.map(e => {
            return { ...e, sending: true }
          })

          this.scrollToBottom();
        }, async (err: any) => {
          (await loader).dismiss();
          await this.ui.presentAlert({
            mode: 'ios',
            header: 'No se ha podido cargar las eventualidades',
            buttons: [
              {
                text: 'Aceptar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  this.dismiss()
                }
              },
            ]
          })
          console.log("Error", err)
        }
        )
    } else {
      if (this.order.driver_assigned) {
        this.driver = this.order.driver_assigned;
        if (this.driver) {
          this.request
            .get(`driver/events_per_driver/${this.order.id}/${this.driver.driver_id}`)
            .subscribe(async (res: any) => {
              (await loader).dismiss();
              this.events = res.data;
              this.events = this.events.map(e => {
                return { ...e, sending: true }
              })
              console.log("Events", res.data);
              this.scrollToBottom();
            }, async (err: any) => {
              (await loader).dismiss();
              await this.ui.presentAlert({
                mode: 'ios',
                header: 'No se ha podido cargar las eventualidades',
                buttons: [
                  {
                    text: 'Aceptar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                      this.dismiss()
                    }
                  },
                ]
              })
              console.log("Error", err)
            }
            )
        }
      }else{
        (await loader).dismiss()
      }


    }

  }

  

  ngOnInit() {

  }

  // ngAfterViewChecked() {
  //   this.scrollToBottom();
  // }

  async scrollToBottom(): Promise<void> {
    try {
      console.log("Scrolling...")
      await this.myContent.scrollToBottom(100);
    } catch (err) { }
  }

  // viewMap(detail) {
  //   const modal = this.ui.presentModal(MapPage, { detail });
  // }

  viewImage(image) {
    const modal = this.ui.presentModal(ImagePage, { image });
  }

  dismiss() {
    this.ui.dismiss()
  }








}
