import { Injectable } from '@angular/core';
// importar los modulos de  la DB firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { runInThisContext } from 'vm';
import { Perfil } from './dashboard/perfil.model';
@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private angularfirestore :AngularFirestore) { }


  //metodos del crud
//traer todos de la base de datos
  getPost (){
  return this.angularfirestore.collection("artist").snapshotChanges

  }
  // un solo documento
  getPostbyId(id){
 return this.angularfirestore.collection("artis").doc(id).valueChanges()
  }
  
  createPost(perfil:Perfil){
    return new Promise<any>((resolve,reject) =>{
      this.angularfirestore.collection("artist").add(perfil).then((response)=>{
        console.log(response)
      },(error)=>{
        rejects(error)
      })
    })

  }
//actualizar
  updatePost(perfil:Perfil,id){
return this.angularfirestore.collection("artist").doc(id).update({
  name:perfil.name,
  apellido:perfil.apellido,
  nickname:perfil.nickname

})
  }
// eliminar
  delete(perfil){
    return this.angularfirestore.collection("artist").doc(perfil.id_autenticado).delete();

  }

}
