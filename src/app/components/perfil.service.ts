import { Injectable, ViewChild } from '@angular/core';
// importar los modulos de  la DB firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AnyForUntypedForms } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { map } from 'rxjs/operators';
import { Perfil } from './dashboard/perfil.model';
import { Generos } from './usuarios/generos/generos.modal';

interface Country {
  name: string;
  value: number;
}
@Injectable({
  providedIn: 'root'
})
export class PerfilService {
public datos :Generos[];
  constructor(private angularfirestore :AngularFirestore,private storage:AngularFireStorage) { }
public usuario:any;
public url:any;

// cantidad de generos
public number_generos:string=localStorage.getItem('cantidad_de_generos');;
public num:number;





  //metodos del crud
//traer todos de la base de datos
  getPost (){
   
  return this.angularfirestore.collection("request",ref => ref.where('rol', '==', 'no artist')).snapshotChanges()

  }
  // un solo documento
  getPostbyId(id){
   
 return this.angularfirestore.collection("artist").doc(id).valueChanges()
  }

//actualizar
  updatePost(perfil:Perfil,id){
  return this.angularfirestore.collection("artist").doc(id).update({
  name:perfil.name,
  apellido:perfil.apellido,
  nickname:perfil.nickname,
  imagen:'https://ui-avatars.com/api/?name='+perfil.name+'+'+perfil.apellido,

});
  }

 
  getPostgeneros_total (){
    
    this.usuario = localStorage.getItem('usuario')
   
    return this.angularfirestore.collection("generos",ref => ref.where('artista_id', '==', this.usuario)).snapshotChanges()
  
    }




// eliminar
  delete(perfil){
    return this.angularfirestore.collection("artist").doc(perfil.id).delete();

  }

}
