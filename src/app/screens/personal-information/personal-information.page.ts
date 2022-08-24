import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Attribute } from 'src/app/interfaces/Attribute';
import { City } from 'src/app/interfaces/City';
import { RequestService } from 'src/app/services/request.service';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {
  types: Attribute[] = []
  cities: City[] = []
  city: City = {
    name: 'Barranquilla'
  }
  type: Attribute = {
    name: "Cedula de Ciudadanía"
  }
  image = "assets/imgs/avatar.svg"
  personal_information = this.fb.group({
    names: ['', Validators.required],
    lastnames: ['', Validators.required],
    address: ['', Validators.required],
    dni_type_id: ['10', Validators.required],
    dni: ['', Validators.required],
    city: [4, Validators.required],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')],],
    email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{2,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
  }
  );
  business_information = this.fb.group({
    names: ['', Validators.required],
    lastnames: ['', Validators.required],
    address: ['', Validators.required],
    dni_type_id: ['10', Validators.required],
    dni: ['', Validators.required],
    city: [4, Validators.required],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')],],
    email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{2,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
    business_name: ['', [Validators.required]],
    nit: ['', [Validators.required]],
    position: ['', [Validators.required]],
  }
  );
  constructor(public auth: AuthService,
    private fb: FormBuilder,
    private request: RequestService,
    private ui: UiService,
    private router: Router) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.auth.setBack(true)
    console.log("Personal Information")
    if (this.auth.person.photo) {
      this.image = this.auth.person.photo;
    }

    if(this.auth.role.id == 3){
      this.personal_information.setValue({
        names: this.auth.person.first_name,
        lastnames: this.auth.person.last_name,
        address: this.auth.person.address,
        dni_type_id: this.auth.person.dni_type_id,
        dni: this.auth.person.dni,
        city: this.auth.person.city_id,
        phone: this.auth.person.phone,
        email: this.auth.person.email,
      })  
    }else{
      this.business_information.setValue({
        names: this.auth.person.first_name,
        lastnames: this.auth.person.last_name,
        address: this.auth.person.address,
        dni_type_id: this.auth.person.dni_type_id,
        dni: this.auth.person.dni,
        city: this.auth.person.city_id,
        phone: this.auth.person.phone,
        email: this.auth.person.email,
        business_name : this.auth.companies.business_name,
        position : this.auth.person.position,
        nit : String(this.auth.companies.nit),
      })
    }
    
    // if(this.auth.role.id == 4){
    //   this.personal_information.addControl("business_name", new FormControl(this.auth.companies.business_name, Validators.required))
    //   this.personal_information.addControl("nit", new FormControl(this.auth.companies.nit, Validators.required))
    //   this.personal_information.addControl("position", new FormControl(this.auth.companies.position, Validators.required))
    // }
    console.log("Rol", this.auth.role)
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

  async save() {
    if (this.auth.role.id == 3) {
      if (this.personal_information.valid) {
        const loader = await this.ui.loading("Por favor espere...");
        const information = { ...this.personal_information.value };
        console.log("Information", information)
        const parameters: any = {
          dni_type_id: information.dni_type_id,
          dni: information.dni,
          first_name: information.names,
          last_name: information.lastnames,
          city: information.city,
          address: information.address,
          phone: information.phone,
          email: information.email,
          city_id: this.city.id,
          country: "CO",
          state_id: this.city.state_id,
          user_id: this.auth.user.id,
          role_id: this.auth.role.id,
        };

        // if(this.auth.role.id == 4){
        //   parameters.business_name = information.business_name;
        //   parameters.nit = information.business_name;
        //   parameters.position = information.position;
        // }
        console.log("Parameters", parameters)
        this.request.post("update_client", parameters).
          subscribe(async (res: any) => {
            (await loader).dismiss()
            this.auth.removeBack()
            this.auth.person.email = parameters.email;
            this.auth.person.dni = parameters.dni;
            this.auth.person.dni_type_id = parameters.dni_type_id;
            this.auth.person.phone = parameters.phone;
            this.auth.person.address = parameters.address;
            this.auth.person.first_name = parameters.first_name;
            this.auth.person.last_name = parameters.last_name;
            this.auth.person.city = this.city.name;
            this.auth.person.city_id = this.city.id;
            this.auth.person.state_id = this.city.state_id;
            this.auth.setPerson(this.auth.person);
            this.auth.user.email = parameters.email;
            this.auth.setUser(this.auth.user)

            this.ui.showToast("Usuario Actualizado exitosamente", () => {
              this.router.navigate(['/tabs/profile']);
              localStorage.removeItem("back")
              // this.personal_information.reset();
            })


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
    } else {
      if (this.business_information.valid) {
        const loader = await this.ui.loading("Por favor espere...");
        const information = { ...this.business_information.value };
        console.log("Information", information)
        const parameters: any = {
          dni_type_id: information.dni_type_id,
          dni: information.dni,
          first_name: information.names,
          last_name: information.lastnames,
          city: information.city,
          address: information.address,
          phone: information.phone,
          email: information.email,
          business_name : information.business_name,
          nit : information.nit,
          position : information.position,
          city_id: this.city.id,
          country: "CO",
          state_id: this.city.state_id,
          user_id: this.auth.user.id,
          role_id: this.auth.role.id,
        };

        // if(this.auth.role.id == 4){
        //   parameters.business_name = information.business_name;
        //   parameters.nit = information.business_name;
        //   parameters.position = information.position;
        // }
        console.log("Parameters", parameters)
        this.request.post("update_client", parameters).
          subscribe(async (res: any) => {
            (await loader).dismiss()
            this.auth.removeBack()
            this.auth.person.email = parameters.email;
            this.auth.person.dni = parameters.dni;
            this.auth.person.dni_type_id = parameters.dni_type_id;
            this.auth.person.phone = parameters.phone;
            this.auth.person.address = parameters.address;
            this.auth.person.first_name = parameters.first_name;
            this.auth.person.last_name = parameters.last_name;
            this.auth.person.position = parameters.position;
            this.auth.person.city = this.city.name;
            this.auth.person.city_id = this.city.id;
            this.auth.person.state_id = this.city.state_id;
            this.auth.setPerson(this.auth.person);
            this.auth.user.email = parameters.email;
            this.auth.setUser(this.auth.user)
            this.auth.companies.business_name = parameters.business_name;
            this.auth.companies.nit = parameters.nit;
            this.auth.setCompanies(this.auth.companies);

            this.ui.showToast("Usuario Actualizado exitosamente", () => {
              this.router.navigate(['/tabs/profile']);
              localStorage.removeItem("back")
              // this.personal_information.reset();
            })


            console.log(res.data);
          },
            async (err: any) => {
              (await loader).dismiss()
              console.log('errorrrr', err.error.messages[0]);
              this.ui.showToast(err.error.messages[0])
            })
      }
    }

  }

  get controls():any {
    if(this.auth.role.id == 3)
      return this.personal_information.controls;
    return this.business_information.controls;
  }

}
