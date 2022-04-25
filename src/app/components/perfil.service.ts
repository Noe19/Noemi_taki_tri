import { Injectable } from '@angular/core';
// importar los modulos de  la DB firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/service/auth.service';

import { Perfil } from './dashboard/perfil.model';
@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private angularfirestore :AngularFirestore) { }


  //metodos del crud
//traer todos de la base de datos
  getPost (){
  return this.angularfirestore.collection("artist").snapshotChanges()

  }
  // un solo documento
  getPostbyId(id){
 return this.angularfirestore.collection("artist").doc(id).valueChanges()
  }
  
  createPost(perfil:Perfil){
    return new Promise<any>((resolve,reject) =>{
      this.angularfirestore.collection("artist").add(perfil).then((response)=>{
        console.log(response)
      },(error)=>{
        reject(error.message)
      })
    })

  }
//actualizar
  updatePost(perfil:Perfil,id){
  return this.angularfirestore.collection("artist").doc(id).update({
  name:perfil.name,
  apellido:perfil.apellido,
  nickname:perfil.nickname,

});
  }
// eliminar
  delete(perfil){
    return this.angularfirestore.collection("artist").doc(perfil.id).delete();

  }

}
