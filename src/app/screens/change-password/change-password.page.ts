import { Component, OnInit } from '@angular/core';
import { ComparePassword } from 'src/app/validators/passwod.validator';
import { Validators, FormBuilder } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  password_information = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    password_confirm: ['', Validators.required],
  },
    {
      validators: ComparePassword("password", "password_confirm")
    }
  );
  view = false
  view_confirm = false
  constructor(private requestService: RequestService,
    private fb: FormBuilder, private router: Router, private ui: UiService,
    private auth: AuthService) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['/tabs/profile'])
  }


  get controls() {
    return this.password_information.controls;
  }

  async update() {
    if (this.password_information.valid) {
      const {
        password,
        password_confirm
      } = this.password_information.value
      const obj = {
        password,
        password_confirm,
        role_id: this.auth.role.id,
        user_id: this.auth.user.id
      }
      const loader = await this.ui.loading("Por favor espere...");
      this.requestService.post('changepassword', obj).subscribe(async (res) => {
        (await loader).dismiss()
        this.ui.showToast("Se ha cambiado la contraseña exitosamente", () => {
          this.router.navigate(['/tabs/profile'])
        })
      },
        async (err: any) => {
          (await loader).dismiss()
          console.log("Error", err)
          this.ui.showToast(err.errors.messages[0])
        })

    } else {
      this.ui.showToast("Rellene todos los campos")
    }

  }

  setView(){
    this.view = !this.view;
  }

  setViewConfirm(){
    this.view_confirm = !this.view_confirm;
  }

}
