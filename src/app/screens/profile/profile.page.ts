import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
import { PhotoService } from 'src/app/services/photo.service';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  image = "assets/imgs/avatar.svg"
  constructor(public auth: AuthService,
    private ui: UiService,
    private photo: PhotoService,
    private request: RequestService,
    private router: Router) {
    
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.auth.removeBack()
    if (this.auth.person.photo) {
      this.image = this.auth.person.photo;
    }
  }

  async takePhoto() {
    try {
      const image = await (await this.photo.selectImageSource())
      this.photo.imageSubject.subscribe(async (image) => {
        if (Object.keys(image).length > 0) {
          const current_photo = this.image == "assets/imgs/avatar.svg"
          const current_photo_url = this.image;
          this.image = image.dataUrl;
          const url = `upload_customer_photo/${this.auth.person.id}`;
          const dat = new Date().getTime();
          const name_file1 = `${dat}_${this.auth.user.id}.${image.format}`;
          const image_to_upload = this.photo.getFileImage(image.dataUrl, name_file1, image.format);
          let data = new FormData();
          data.append('photo', image_to_upload);
          console.log("Data", data)
          const loader = await this.ui.loading("Por favor espere...");
          this.request.post(url, data).subscribe(async (res: any) => {
            (await loader).dismiss();
            this.auth.person.photo = res.data.photo;
            // this.image = res.data.url;
            this.auth.setPerson(this.auth.person);
            console.log("Este es el res", res)
          },
            async (err: any) => {
              (await loader).dismiss();
              this.image = current_photo_url;
              this.ui.showToast("No se pudo subir la imagen")
              console.log("Error", err)
            })
        }
      })
    } catch (e) {
      console.log("Error", e)
    }
  }

  goToPersonalInformation() {
    this.auth.setBack(true)
    localStorage.setItem("back_route", "tabs/profile");
    this.router.navigate(["/tabs/personal-information"])
  }

  goToChangePassword(){
    this.auth.setBack(true)
    localStorage.setItem("back_route", "tabs/profile");
    this.router.navigate(["/tabs/change-password"])
  }

  goToAbout(){
    this.auth.setBack(true)
    localStorage.setItem("back_route", "tabs/profile");
    this.router.navigate(["/tabs/about"])
  }

}
