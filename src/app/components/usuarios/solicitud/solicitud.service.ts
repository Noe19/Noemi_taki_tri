import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Solicitud } from './solicitud.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private angularfirestore :AngularFirestore) { }

  createPost(solicitud:Solicitud){
    return new Promise<any>((resolve,reject) =>{
      this.angularfirestore.collection("request").add(solicitud).then((response)=>{
        console.log(response)
      },(error)=>{
        reject(error.message)
      })
    })

  }
}
