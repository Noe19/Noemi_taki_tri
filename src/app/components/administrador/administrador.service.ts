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
  getPostsolicitud (){
   
    return this.angularfirestore.collection("request",ref => ref.where('rol', '==', 'no artist')).snapshotChanges()
  
    }

// traer los datos  del usuario que son parte e taki-tri y poder sancionar si violan  las politicas y se le niega ser parte de Taki-tri
getPost_no_artista (){
   
  return this.angularfirestore.collection("request",ref => ref.where('rol', '==', 'artist') ).snapshotChanges()

  }

  // traer los datos  del usuario que fueron  parte de taki-tri y que fueron sancionados  pero que han solicito volver a ser parte de taki-tri
getPost_rechazadas (){
   
  return this.angularfirestore.collection("request",ref => ref.where('rol', '==', 'rechazado')).snapshotChanges()

  }

  getPost_artistas_guard_aceptados(){
    this.usuario = localStorage.getItem('usuario')
    return this.angularfirestore.collection("request",ref => ref.where('rol', '==', 'artist').where('artista_id', '==', this.usuario) ).snapshotChanges()
  
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

  // cambiar rol a rechazado
  updateRol_no_artist(administrador: Administrador){
    return this.angularfirestore
      .collection("request")
      .doc(administrador.id)
      .update({
        rol: administrador.rol= 'rechazado'
      })
  }

    // cambiar rol a artista otra vez
    updateRol_rechazado(administrador: Administrador){
      return this.angularfirestore
        .collection("request")
        .doc(administrador.id)
        .update({
          rol: administrador.rol= 'artist'
        })
    }

   // eliminar
     delete(administrador){
       return this.angularfirestore.collection("request").doc(administrador.id).delete();
   
     }
     
}
