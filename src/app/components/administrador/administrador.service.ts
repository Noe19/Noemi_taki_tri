import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Administrador } from './administrador.model';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
public usuario:any;
  constructor(private angularfirestore :AngularFirestore) { }
// traer los datos del usuario no artista que envio la solicitud
  getPost (){
   
    return this.angularfirestore.collection("request",ref => ref.where('rol', '==', 'no artist')).snapshotChanges()
  
    }

// traer los datos  del usuario que incumplio con las politicas y se le niega ser parte de Taki-tri
getPost_no_artista (){
   
  return this.angularfirestore.collection("request",ref => ref.where('rol', '==', 'artist')).snapshotChanges()

  }



      //traer un perfil en especifico
  getPostById(id){
   
    return this.angularfirestore
      .collection("request")
      .doc(id)
      .valueChanges()

  }

  // saber que el usuario es  rol usuario
  getPost_rol_usuario (){
    this.usuario = localStorage.getItem('usuario')
   
    console.log( this.angularfirestore.collection(`usuario/${this.usuario}`,ref => ref.where('rol', '==', 'artistista')).snapshotChanges())
  
    }

     
  
   //actualizar el rol;
   /*
   updateRol(administrador:Administrador,id){
     console.log('jfjfjfjfj',administrador.id)
     return this.angularfirestore.collection("request").doc(id).update({
      
     rol:administrador.rol='artist'
  
   });
     }
*/

   //cambiar de rol a artista
   updateRol(administrador: Administrador){
    return this.angularfirestore
      .collection("request")
      .doc(administrador.id)
      .update({
        rol: administrador.rol= 'artist'
      })
  }

  // cambiar rol a no artista
  updateRol_no_artist(administrador: Administrador){
    return this.angularfirestore
      .collection("request")
      .doc(administrador.id)
      .update({
        rol: administrador.rol= 'no artist'
      })
  }

   // eliminar
     delete(administrador){
       return this.angularfirestore.collection("request").doc(administrador.id).delete();
   
     }
     
}
