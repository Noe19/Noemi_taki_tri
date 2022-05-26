import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { getStorage } from 'firebase/storage';
import { Solicitud } from './solicitud.model';
import {ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { DocumentosSolicitud } from './documentos.modal';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  public usuario:any;
  private CarpetaImagenes = "solicitud";
  private solicitudCollection: AngularFirestoreCollection<Solicitud>
  constructor(private db: AngularFirestore, private router: Router,private storage: AngularFireStorage) {
    this.solicitudCollection = db.collection<Solicitud>('solicitud');
   }
  /*
  createPost(solicitud:Solicitud){
   // this.usuario = localStorage.getItem('usuario')
      //const id = this.angularfirestore.createId();
     // this.angularfirestore.collection("request").doc(this.usuario).set({solicitud});
    return new Promise<any>((resolve,reject) =>{
      this.angularfirestore.collection("request").add(solicitud).then((response)=>{
       
        
      },(error)=>{
        reject(error.message)
      })
    
    })

  }
  */

  
  cargardocumentosGeneroFirebase(documentos: DocumentosSolicitud[], solicitud: Solicitud) {
    if(documentos.length==0){
      Swal.fire({
        icon: 'error',
        title: 'Solicitud no Enviada, por favor enviar todos los datos ',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,

      })
    }
    const storage = getStorage();
    for (const item of documentos) {
      
      let generosimg = solicitud.nombre_artistico;
      console.log('nombre_imagen',solicitud.nombre_artistico);
      
      // para que la imagen se guarde con el nombre del generos y si hay espacio se unan y no halla problemas
      this.usuario = localStorage.getItem('usuario');
      const path=`${this.CarpetaImagenes}/${this.usuario}/${solicitud.nombre_artistico}`;      
      const storageResf = ref(storage, path);
      // a cargar la imagen
      const uploadImg = uploadBytesResumable(storageResf, item.documentos);
      uploadImg.on('state_changed', (snapshot) => {
        //const imagenn = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      }, (error) => {
        console.log('error_imagen', error)

      }, () => {
        //obtener la url
        console.log('file',uploadImg)
        getDownloadURL(uploadImg.snapshot.ref).then((downloadURL) => {
          this.usuario = localStorage.getItem('usuario');
          item.url = downloadURL;
          console.log('url', item.url)            
           const  id = this.db.createId(); 
          this.guadarPDF_solicitud({
// aqui estan los datos que se enviar a la base de datos con la imagen
   
            nombre_artistico: solicitud.nombre_artistico,
            artista_id: this.usuario,          
             id:id,
             nacionalidad:solicitud.nacionalidad,
            documentos:item.url,
            rol:solicitud.rol 
          } )
          console.log('nacion',item.url)
          
        })

      })

    }


  }

      
  async guadarPDF_solicitud(solicitud: { nombre_artistico: string, documentos: string, artista_id: string,nacionalidad:string,id:string,rol:string}): Promise<any> {
  
    try {

      Swal.fire({
        icon: 'success',
        title: 'Solicitud Enviada',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,

      }).then((result) => {

        if (result.value) {
          //this.router.navigate(['/generos']);
          console.log(true, 'si funcioa');

        }

      })
      console.log('nacionalidad',solicitud.nacionalidad)
      const  id = this.db.createId(); 
      return await this.db.collection('request').doc(id).set({id,
        nombre_artistico: solicitud.nombre_artistico,
        artista_id:solicitud.artista_id,
        nacionalidad:solicitud.nacionalidad,
        document:solicitud.documentos,
      rol:solicitud.rol});

        


    } catch (error) {
    
      console.log('error al guadar imagen', error)

    }

  }
  
}
