import { Injectable } from '@angular/core';
import { Database,list,object,set, refFromURL } from '@angular/fire/database';
import { take } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor(
    public db: AngularFireDatabase,
    private auth: AuthService,

   
  ) { }

  setObject(path,body){
    this.db.object(path)
  }
  getFirebaseCollectionObject(path){
    
    return this.db.object(path).valueChanges() ; 
  }

  getFirebaseCollectionList(path){
    return this.db.list(path).valueChanges() ; 
  }

  
}
