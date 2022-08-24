import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UiService } from 'src/app/services/ui.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FcmService } from 'src/app/services/fcm.service';
import { RequestService } from 'src/app/services/request.service';
import { environment } from 'src/environments/environment';
import { Facebook, FacebookLoginResponse } from '@awesome-cordova-plugins/facebook/ngx';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  view = false

  loginData: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
  });
  constructor(
    private ui: UiService,
    private auth: AuthService,
    private router: Router,
    private fcm: FcmService,
    private request: RequestService,
    private fb: Facebook,
    private googlePlus: GooglePlus
  ) { }


  setView() {
    this.view = !this.view;
  }

  ngOnInit() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("data");
    localStorage.removeItem("current_order")
    localStorage.removeItem("current_status")
    localStorage.removeItem("current_status")
    localStorage.removeItem("currentDocuments")
    localStorage.removeItem("longitude")
    localStorage.removeItem("latitude")
    localStorage.removeItem("watchPositionId")

  }

  ionViewDidEnter() {
    GoogleAuth.init();
  }

  get controls() {
    return this.loginData.controls;
  }


  async signinInvited() {

    const loadier = this.ui.loading('Por favor espere...');

    this.auth.login("invitado@zapplogistica.com", "123456789")
      .subscribe(
        async (res: any) => {
          (await loadier).dismiss()

          console.log("Version", res.data.code_version)
          if (res.data.role.id == 3 || res.data.role.id == 4) {
            console.log("Rol id", res.data);
            localStorage.setItem('isLoggedIn', 'si');
            localStorage.setItem('data', JSON.stringify(res.data));
            this.auth.setData();
            this.sendToken();
            this.auth.user.last_login_date = Date.now();
            this.auth.setUser(this.auth.user)
            this.router.navigate([`/tabs/`]);
          } else {
            this.ui.showToast("El usuario existe, pero  no tiene acceso a esta aplicación")
          }
        },
        async (err: any) => {
          (await loadier).dismiss()
          if (err.error.messages) {
            this.ui.showToast(err.error.messages[0]);
          } else {
            this.ui.showToast("Ocurrió un error de conexión");
          }

        }
      );

  }

  async send() {
    if (this.loginData.valid) {
      let { email, password } = this.loginData.value;

      const loadier = this.ui.loading('Por favor espere...');
      email = email.replace(/\s/g, "")
      password = password.replace(/\s/g, "")
      this.auth.login(email, password)
        .subscribe(
          async (res: any) => {
            (await loadier).dismiss()

            console.log("Version", res.data.code_version)
            if (res.data.role.id == 3 || res.data.role.id == 4) {
              console.log("Rol id", res.data);
              localStorage.setItem('isLoggedIn', 'si');
              localStorage.setItem('data', JSON.stringify(res.data));
              this.auth.setData();
              this.sendToken();
              this.auth.user.last_login_date = Date.now();
              this.auth.setUser(this.auth.user)
              this.router.navigate([`/tabs/`]);
            } else {
              this.ui.showToast("El usuario existe, pero  no tiene acceso a esta aplicación")
            }
          },
          async (err: any) => {
            (await loadier).dismiss()
            if (err.error.messages) {
              this.ui.showToast(err.error.messages[0]);
            } else {
              this.ui.showToast("Ocurrió un error de conexión");
            }

          }
        );

    }
  }

  sendToken() {
    if (localStorage.getItem('fcmId')) {

      const obj = {
        user_id: this.auth.user.id,
        token: localStorage.getItem('fcmId'),
        platform: "mobile"
      }
      this.request.post("get_token", obj).subscribe(res => {

      }, err => {

      })

    } else {

    }
  }

  loginFacebook() {
    this.fb.login(['public_profile', 'email'])
      .then((res: any) => {
        console.log('Logged into Facebook!', res);
        let id = res.authResponse.userID;
        console.log(id);
        this.getUserDetail(id);

      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserDetail(userid: any) {
    this.fb.api('/' + userid + '/?fields=id,email', ['public_profile'])
      .then(res => {
        console.log(res);
        let id = res.id;
        console.log(id);
        let email = res.email;
        console.log(email);

        const loadier = this.ui.loading('Por favor espere...');

        this.auth.loginNetwork(email, id, 'facebook')
          .subscribe(
            async (res: any) => {
              (await loadier).dismiss()

              console.log("Version", res.data.code_version)
              if (res.data.role.id == 3 || res.data.role.id == 4) {
                console.log("Rol id", res.data);
                localStorage.setItem('isLoggedIn', 'si');
                localStorage.setItem('data', JSON.stringify(res.data));
                this.auth.setData();
                this.sendToken();
                this.auth.user.last_login_date = Date.now();
                this.auth.setUser(this.auth.user)
                this.router.navigate([`/tabs/`]);
              } else {
                this.ui.showToast("El usuario existe, pero  no tiene acceso a esta aplicación")
              }
            },
            async (err: any) => {
              (await loadier).dismiss()
              if (err.error.messages) {
                this.ui.showToast(err.error.messages[0]);
              } else {
                this.ui.showToast("Ocurrió un error de conexión");
              }

            }
          );
      })
      .catch(e => {
        alert("Error getUserDetail");
      });
  }

  async loginGoogle() {
    console.log('loginGoogle');
 
    this.googlePlus.login({
      'scopes': 'profile email',
      'webClientId': '109401557615-0u5mvavjg3apsdmidr5hkkaccgrkmqn7.apps.googleusercontent.com',
      'offline': true,
    })
      .then(res => {
        console.log('res', res);

        console.log('user', res);

        let id = res.userId;
        console.log(id);
        let email = res.email;
        console.log(email);
  
        const loadier = this.ui.loading('Por favor espere...');
  
        this.auth.loginNetwork(email, id, 'google')
          .subscribe(
            async (res: any) => {
              (await loadier).dismiss()
  
              console.log("Version", res.data.code_version)
              if (res.data.role.id == 3 || res.data.role.id == 4) {
                console.log("Rol id", res.data);
                localStorage.setItem('isLoggedIn', 'si');
                localStorage.setItem('data', JSON.stringify(res.data));
                this.auth.setData();
                this.sendToken();
                this.auth.user.last_login_date = Date.now();
                this.auth.setUser(this.auth.user)
                this.router.navigate([`/tabs/`]);
              } else {
                this.ui.showToast("El usuario existe, pero  no tiene acceso a esta aplicación")
              }
            },
            async (err: any) => {
              (await loadier).dismiss()
              if (err.error.messages) {
                this.ui.showToast(err.error.messages[0]);
              } else {
                this.ui.showToast("Ocurrió un error de conexión");
              }
  
            }
          );
      })
      .catch(err => {
        console.error('err', err);
      });
  }

}
