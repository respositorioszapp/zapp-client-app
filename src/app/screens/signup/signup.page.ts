import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Attribute } from 'src/app/interfaces/Attribute';
import { City } from 'src/app/interfaces/City';
import { Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { ComparePassword } from 'src/app/validators/passwod.validator';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  view = false
  view_confirm = false
  types: Attribute[] = []
  cities: City[] = []
  city: City = {
    name: 'Barranquilla'
  }
  type: Attribute = {
    name: "Cedula de Ciudadanía"
  }

  personal_information = this.fb.group({
    names: ['', Validators.required],
    lastnames: ['', Validators.required],
    address: ['', Validators.required],
    dni_type_id: [10/*, Validators.required*/],
    dni: [''/*, Validators.required*/],
    city: [4, Validators.required],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')],],
    email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{2,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    password_confirm: ['', Validators.required],
    terms: [false, Validators.requiredTrue],
  },
    {
      validators: ComparePassword("password", "password_confirm")
    }
  );
  route: string
  constructor(private request: RequestService,
    private fb: FormBuilder, private ui: UiService, private router: Router) { }


  async ionViewWillEnter() {
    console.log("Url", this.router.url)
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
          if (localStorage.getItem("personal_information")) {
            const person = JSON.parse(localStorage.getItem("personal_information"));
            this.type = this.types.find(t => t.id == person.dni_type_id)
          }
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
          if (localStorage.getItem("personal_information")) {
            const person = JSON.parse(localStorage.getItem("personal_information"));
            this.type = this.types.find(t => t.id == person.dni_type_id)
          }
          this.controls.dni_type_id.valueChanges.subscribe(res => {
            this.type = this.types.find(t => t.id == res)
          })
        }, async (err: any) => {
          (await loader).dismiss();
        })
      })
  }

  setView(){
    this.view = !this.view;
  }

  setViewConfirm(){
    this.view_confirm = !this.view_confirm;
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

  goToBusiness() {
    this.router.navigate(['select-type/business']);
  }


  async ngOnInit() {



  }

  async save(formDirective?: FormGroupDirective) {
    if (this.personal_information.valid) {
      const loader = await this.ui.loading("Por favor espere...");
      const information = { ...this.personal_information.value };
      console.log("Information", information)
      const parameters = {
        //dni_type_id: information.dni_type_id,
        dni_type_id: "10",
        //dni: information.dni,
        dni: "0000000000",
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
      this.request.post("signin/3", parameters).
        subscribe(async (res: any) => {
          (await loader).dismiss()

          this.ui.showToast("Usuario registrado exitosamente", () => {
            this.router.navigate(['/login']);
            formDirective.resetForm();
            this.personal_information.reset();
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
      // const personal_array = Object.keys(this.personalInformation.controls);
      // personal_array.map(key => {
      //   if(!this.personalInformation.get(key).valid){
      //     this.businessInformation.get(key).setErrors({
      //       invalid :true
      //     })
      //   }
      // })
    }
  }

  get controls() {
    return this.personal_information.controls;
  }

}
