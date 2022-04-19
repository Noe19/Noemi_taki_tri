import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { first } from 'rxjs';
import * as auth from 'firebase/app';
//import { User } from '../service/user';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { User } from '@firebase/auth';


@Injectable()
export class AuthService {

  //public user : User;
  constructor(private afAuth :AngularFireAuth) { }

  
 async login(email:string,password:string):
 Promise<any>{
    try {
      const result =await this.afAuth.signInWithEmailAndPassword(
        email,
        password
  
      ); return result;
      
    } catch (error) {
      console.log(error,'login')
      
    }
   
   }
 
   async register(email:string,password:string):
   Promise<any>{
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {console.log(error,'register')
    
    }

  }
  async logout(){

    await this.afAuth.signOut();
  }
  //obtener el usuario que inicio sesion en el sistema
  getCurrentUser(){

    return this.afAuth.authState.pipe(first());
  }
}
