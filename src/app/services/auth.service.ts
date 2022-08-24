import { Injectable } from '@angular/core';
import { RequestService } from './request.service'
import { Router } from '@angular/router';

import { Person } from '../interfaces/Person';
import { Rol } from '../interfaces/Rol';
import { Vehicle } from '../interfaces/Vehicle';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';
import { getDatabase, provideDatabase, Database } from '@angular/fire/database';
import { Companies } from '../interfaces/Companies';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  collection_id: string
  user: User;
  person: Person;
  token: string
  token_expires_in: number
  role: Rol
  vehicles: Vehicle
  companies: Companies
  back_button
  constructor(private request: RequestService,
    private router: Router,
    //private db: Database,
  ) {
    this.setData();
  }

  setBack(back: boolean) {
    this.back_button = back;
    localStorage.setItem("back", back.toString())
  }

  removeBack() {
    this.back_button = undefined;
    localStorage.removeItem("back");
  }

  login(email, password) {
    const body = { email: email, password: password };
    return this.request.post('login', body);
  }

  loginNetwork(email, network_id, network_type) {
    const body = { email: email, network_id: network_id, network_type: network_type };
    console.log('#############body ',body);
    
    return this.request.post('login_network', body);
  }

  async setData() {
    if (localStorage.getItem('data')) {
      const data = JSON.parse(localStorage.getItem('data'));
      const {
        user,
        person,
        token,
        token_expires_in,
        role,
        vehicles,
        collection_id,
        companies
      } = data;
      this.collection_id = collection_id;
      this.user = user;
      this.person = person;
      this.token = token;
      this.role = role;
      this.vehicles = vehicles;
      this.companies = companies
      this.token_expires_in = token_expires_in
    }
    if (localStorage.getItem("back")) {
      this.back_button = true;
    } else {
      this.back_button = false;
    }

  }

  register(userInfo) {
    console.log(userInfo);
    /*  return Observable.create(observer => {
        this.afAuth.createUserWithEmailAndPassword(userInfo.email, userInfo.password).then((authData: any) => {
          // update driver object
          console.log(authData);
          userInfo.uid = authData.user.uid;
          this.afAuth.currentUser.then(res => {
            res.updateProfile({
              displayName: userInfo.name,
            });
            this.db.object('drivers/' + userInfo.uid).update(userInfo);
            observer.next();
          });
  
        }).catch((error: any) => {
          if (error) {
            observer.error(error);
          }
        });
      });*/
  }

  setVehicles(vehicles) {
    this.vehicles = { ...this.vehicles, ...vehicles };
    const data = JSON.parse(localStorage.getItem('data'));
    data.vehicles = this.vehicles;
    localStorage.setItem("data", JSON.stringify(data));
  }

  setPerson(person) {
    this.person = { ...this.person, ...person };
    const data = JSON.parse(localStorage.getItem('data'));
    data.person = this.person;
    localStorage.setItem("data", JSON.stringify(data));
  }

  setCompanies(companies) {

    this.companies = { ...this.companies, ...companies };
    const data = JSON.parse(localStorage.getItem('data'));
    data.companies = this.companies;
    localStorage.setItem("data", JSON.stringify(data));
  }

  setUser(user) {
    this.user = { ...this.user, ...user };
    const data = JSON.parse(localStorage.getItem('data'));
    data.user = this.user;
    localStorage.setItem("data", JSON.stringify(data));
  }

  setToken({ token, token_expires_in }) {
    this.token = token;
    this.token_expires_in = token_expires_in;
    const data = JSON.parse(localStorage.getItem('data'));
    data.token = this.token;
    data.token_expires_in = this.token_expires_in;

    localStorage.setItem("data", JSON.stringify(data));
  }

  async getFirebaseUser() {
    //const user = await this.afAuth.currentUser;
  }

  logOut() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("data");
    localStorage.removeItem("current_order")
    localStorage.removeItem("current_status")
    localStorage.removeItem("current_status")
    localStorage.removeItem("currentDocuments")
    localStorage.removeItem("longitude")
    localStorage.removeItem("latitude")
    localStorage.removeItem("watchPositionId")
    localStorage.removeItem("current_massive_order")
    localStorage.removeItem("back")
    localStorage.removeItem("quotation")
    localStorage.removeItem("address_selected")
    localStorage.removeItem("shop")
    //current_massive_order
    this.router.navigate(['/login']);
    this.person = null
    this.role = null
    this.token = ""
    this.user = null
    this.vehicles = null
    this.companies = null
    this.token_expires_in = 0;

  }

}
