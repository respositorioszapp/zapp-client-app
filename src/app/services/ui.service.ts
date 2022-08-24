import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController, ModalController, ActionSheetController, PopoverController } from '@ionic/angular';
import { Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/filesystem';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { ImagePage } from '../dialogs/image/image.page';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private loader;
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController,
    private callNumber: CallNumber,
    private actionSheetCtrl: ActionSheetController,
    private popoverController : PopoverController
  ) { }

  async presentPopover(component,properties? ) {
    const popover = await this.popoverController.create({
      component,
      mode: 'ios',
      cssClass: 'my-custom-class',
      translucent: true,
      componentProps: properties
    });
    return await popover.present();
  }

  viewImage(photo) {
    const image = photo;
    const modal = this.presentModal(ImagePage, { image });
  }

  async loading(message) {
    this.loader = await this.loadingController.create({
      mode: 'ios',
      message
    });
    await this.loader.present();
    return this.loader;
  }

  async loadingDissmiss() {
    (await this.loader).dismiss();
  }

  call(number: string) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(async err => {
        await this.presentAlert({
          mode: 'ios',
          header: 'No se ha podido iniciar la llamada',
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
      });
  }

  async presentActionSheet(header, buttons) {


    // Only allow file selection inside a browser


    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'ios',
      header,
      buttons
    });

    await actionSheet.present();
    return actionSheet;
  }

  async presentAlert(opttion: any) {
    const alert = await this.alertController.create(opttion);

    await alert.present();
    return alert;
  }

  async presentModal(component, properties?, cssClass = ['my-custom-class'], id='') {
    const topComponent=await this.modalController.getTop();
    console.log("Top Component", topComponent)
    const modal = await this.modalController.create({
      component,
      cssClass,
      id,
      componentProps: properties
    });
    await modal.present();
    return modal;
  }



  dismiss(obj?,id='') {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    if(id){
      this.modalController.dismiss(
        obj,
        '',
        id
      );
    }else{
      this.modalController.dismiss(
        obj
      );
    }
    
  }

  async showToast(message, action?) {
    const toast = await this.toastController.create({ message, duration: 3000, position: 'bottom', },);
    toast.present();
    if (action) {
      toast.onDidDismiss().then(() => {
        action()
      })
    }
  }

  async fileRead() {
    let contents = await Filesystem.readFile({
      path: 'secrets/text.txt',
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });
    console.log(contents);
  }

}
