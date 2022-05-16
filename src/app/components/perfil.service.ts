import { Injectable, ViewChild } from '@angular/core';
// importar los modulos de  la DB firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AnyForUntypedForms } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

import { Perfil } from './dashboard/perfil.model';
@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private angularfirestore :AngularFirestore,private storage:AngularFireStorage) { }
public usuario:any;
public url:any;


  //metodos del crud
//traer todos de la base de datos
  getPost (){
   
  return this.angularfirestore.collection("request",ref => ref.where('rol', '==', 'no artist')).snapshotChanges()

  }
  // un solo documento
  getPostbyId(id){
   
 return this.angularfirestore.collection("artist").doc(id).valueChanges()
  }
 // crear un nuevo perfil
 /*
  createPost(perfil:Perfil){
    return new Promise<any>((resolve,reject) =>{
      this.angularfirestore.collection("artist").add(perfil).then((response)=>{
        console.log(response)
      },(error)=>{
        reject(error.message)
      })
    })

  }*/




//actualizar
  updatePost(perfil:Perfil,id){
  return this.angularfirestore.collection("artist").doc(id).update({
  name:perfil.name,
  apellido:perfil.apellido,
  nickname:perfil.nickname,
  imagen:'https://ui-avatars.com/api/?name='+perfil.name+'+'+perfil.apellido,

});
  }

 

    



// eliminar
  delete(perfil){
    return this.angularfirestore.collection("artist").doc(perfil.id).delete();

  }



}
