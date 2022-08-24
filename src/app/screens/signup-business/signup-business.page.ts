import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { Attribute } from 'src/app/interfaces/Attribute';
import { City } from 'src/app/interfaces/City';
import { UiService } from 'src/app/services/ui.service';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { ComparePassword } from 'src/app/validators/passwod.validator';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-signup-business',
  templateUrl: './signup-business.page.html',
  styleUrls: ['./signup-business.page.scss'],
})
export class SignupBusinessPage implements OnInit {
  types: Attribute[] = []
  cities: City[] = []
  city: City = {
    name: 'Barranquilla'
  }
  type: Attribute = {
    name: "Cedula de Ciudadanía"
  }
  view = false
  view_confirm = false
  route: string

  businessInformation = this.fb.group({
    names: ['', Validators.required],
    lastnames: ['', Validators.required],
    business_name: ['', Validators.required],
    nit: ['', /*Validators.required*/],
    city: [4, Validators.required],
    dni_type_id: [10, Validators.required],
    dni: [''/*, Validators.required*/],
    address: ['', Validators.required],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')],],
    email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{2,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    password_confirm: ['', Validators.required],
    position: ['', Validators.required],
    terms: [false, Validators.requiredTrue],
  },
    {
      validators: ComparePassword("password", "password_confirm")
    }
  );

  goToLogin(){
    this.router.navigate(['/login'])
  }


  get controls() {
    return this.businessInformation.controls;
  }


  constructor(private ui: UiService,
    private request: RequestService,
    private router: Router,
    private fb: FormBuilder) { }

    setView(){
      this.view = !this.view;
    }
  
    setViewConfirm(){
      this.view_confirm = !this.view_confirm;
    }


  async ionViewWillEnter() {
    console.log("Hash",uuidv4());

    this.route = this.router.url;
    const loader = await this.ui.loading("Por favor espere...");
    this.request.get('indexcities')
      .subscribe(async (res: any) => {

        this.cities = res.data;
        this.city = this.cities.find(c => c.id == this.controls.city.value);
        this.controls.city.valueChanges.subscribe((res => {
          console.log("Change city", res)
          this.city = this.cities.find(c => c.id == res);
          console.log("Change city", this.city)
        }))
        this.request.get('list/attributes?parameter_id=4').subscribe(async (res: any) => {

          (await loader).dismiss();
          this.types = res.data;
          this.type = this.types.find(t => t.id == 10)
          this.controls.dni_type_id.valueChanges.subscribe(res => {
            this.type = this.types.find(t => t.id == res)
          })
        }, async (err: any) => {
          (await loader).dismiss();
        })

      }, err => {
        this.request.get('list/attributes?parameter_id=4').subscribe(async (res: any) => {

          (await loader).dismiss();
          this.types = res.data;
          this.type = this.types.find(t => t.id == 10)
          this.controls.dni_type_id.valueChanges.subscribe(res => {
            this.type = this.types.find(t => t.id == res)
          })
        }, async (err: any) => {
          (await loader).dismiss();
        })
      })
  }

  goToClient(){
    this.router.navigate(['select-type/client'])
  }


  async ngOnInit() {

  }

  async save(formDirective?: FormGroupDirective) {

    if (this.businessInformation.valid) {
      const loader = await this.ui.loading("Por favor espere...");
      const information = { ...this.businessInformation.value };
      console.log("Information", information)
      const parameters = {
        dni_type_id: information.dni_type_id,
        dni: information.dni,
        business_name: information.business_name,
        nit: information.nit,
        position: information.position,
        first_name: information.names,
        last_name: information.lastnames,
        city: information.city,
        address: information.address,
        phone: information.phone,
        email: information.email,
        password: information.password,
        city_id: this.city.id,
        country: "CO",
        state_id: this.city.state_id,
        password_confirm: information.password_confirm
      };
      console.log("Parameters", parameters);
      this.request.post("signin/4", parameters).
        subscribe(async (res: any) => {
          (await loader).dismiss()
          this.ui.showToast("Usuario registrado exitosamente", () => {
            formDirective.resetForm();
            this.businessInformation.reset();
            this.router.navigate(['/login']);
          })

          // if (this.pageTo) {
          //   this.auth.login({ email: information.email, password: information.password })
          //     .subscribe((res: any) => {
          //       sessionStorage.setItem('isLoggedIn', 'si');
          //       sessionStorage.setItem('data', JSON.stringify(res.data));
          //       this.auth.user = JSON.parse(localStorage.getItem('data'));
          //       this.router.navigate([this.pageTo])
          //     })
          // } else { this.router.navigate(['/login']); }
          console.log(res.data);
        },
          async (err: any) => {
            (await loader).dismiss()
            console.log('errorrrr', err.error.messages[0]);
            this.ui.showToast(err.error.messages[0])
          })
    } else {
      const personal_array = Object.keys(this.businessInformation.controls);
      personal_array.map(key => {
        if (this.businessInformation.get(key).invalid) {
          console.log("This is invalid", key)
        }
      })
    }
  }
}
