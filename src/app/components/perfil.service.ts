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
import { datos } from './usuarios/dashboard-user/datos.modal';
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
// datos  barras 
private data: Country[] = [

  {
    "name": "Artista",
    "value": 15
  },
  {
    "name": "Géneros",
    "value": 20
  },
  {
    "name": "Albumes",
    "value": 29
  },
    {
    "name": "Canciones",
    "value": 36
  }
];

// datos

public dataGeneros: Country[] = [

  {
    "name": "Generos",
    "value":parseInt(this.number_generos)
  },
  
];


get countryData() {
 
  return this.data;
}

get countryData1(){
  return this.dataGeneros;
}




}
