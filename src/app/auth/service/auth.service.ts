import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { first } from 'rxjs/operators';
import * as auth from 'firebase/app';
//import { User } from '../service/user';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { OperationType, User } from '@firebase/auth';
import { Router, RouterLink } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable()
export class AuthService {

 // public user : User;
  constructor(public afAuth :AngularFireAuth,private router : Router, public angularfirestore:AngularFirestore) { }
// verificacion de email al registrarse en la aplicacion
  async sendVerificationEmail():Promise<void>{
    return  (await this.afAuth.currentUser).sendEmailVerification();
  }

// verificacion de email para restaurar contraseña
async resetPassword(email:string):Promise<void>{
try {
  return this.afAuth.sendPasswordResetEmail(email);
} catch (error) {
  console.log('error d everificacion de email de contraseña',error)
  
}
}



 async login(email:string,password:string)
 {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
  
      ); return result;
      
    } catch (error) {
      console.log('No se ha podido  realizar el login correctamente',error,'login');
      alert("No se ha podido  realizar el login correctamente ");
      
      //window.location.reload();
      return null;
      
    }
   
   }
 
     
   
   async register(email:string,password:string,name:string):
   Promise<any>{
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password,
        
        
      );
      // verificacion de email
      this.sendVerificationEmail();
      return result;
    } catch (error) {console.log(error,'register')
    alert('No se creo el usuario correctamnete o el usuario ya exite, por favor intente nuevamente');
  
   this.router.navigate(['/register']);
    // window.location.reload();
    

    
    }

  }
  
  async logout(){

    console.log('saliendo' ) ;
  await this.afAuth.signOut();
  //this.auth.logout();
  
   
  }
  //obtener el usuario que inicio sesion en el sistema
  getCurrentUser(){

    return localStorage.getItem('usuario');
  }
  getPostbyId(id){
   
    return this.angularfirestore.collection("artist").doc(id).valueChanges()
     }
    
}
