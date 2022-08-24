import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UiService } from 'src/app/services/ui.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { ErrorResponseService } from 'src/app/services/error-response.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email_data: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(
    private ui: UiService,
    private auth: AuthService,
    private router: Router,
    private request: RequestService,
    private error :ErrorResponseService
  ) { }

  ngOnInit() {
  }

  async sendEMail() {
    if (this.email_data.valid) {
      const loader = await this.ui.loading("Por favor espere...");
      this.request.post('restore_password', this.email_data.value)
        .subscribe(async (res: any) => {
          (await loader).dismiss()
          this.ui.showToast("Contraseña restablecida. Verifique su correo", () => {
            this.router.navigate(['/password'])
          })
        }, async (error: any) => {
          (await loader).dismiss()
          this.error.response(error) 
          console.log(error)
        })
    }
  }

  get controls() {
    return this.email_data.controls;
  }

}
