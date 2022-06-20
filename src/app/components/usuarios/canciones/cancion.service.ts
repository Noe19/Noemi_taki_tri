import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { cancionSolicitud } from './cancion.modal';
import { Mp3Solicitud } from './mp3.modal';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class CancionService {
  speakerCollection: AngularFirestoreCollection<cancionSolicitud>;
  speakerList: Observable<cancionSolicitud[]>;
  public url:any;
  public url2:any;
  private CarpetaImagenes = "imagenCancion";
  private CarpetaImagenes1 = "imagenCancion/";
  // variable para visualizar los genero 
  private cancionesCollection: AngularFirestoreCollection<cancionSolicitud>
  public usuario: any;
  public usuario1:any;
  constructor(private db: AngularFirestore, private router: Router,private storage: AngularFireStorage) {
    // menciona que me traiga la coleccion que esta en base de datos llamado..
    this.cancionesCollection = db.collection<cancionSolicitud>('canciones');
    this.speakerCollection = db.collection("canciones");
    this.speakerList = this.speakerCollection.valueChanges();
  }

   
 

    getPostcanciones (){
      this.usuario = localStorage.getItem('usuario')
     
      return this.db.collection("canciones",ref => ref.where('artista_id', '==', this.usuario)).snapshotChanges()
    
      }

      getgenerosbyId(id){
   
        return this.db.collection("canciones").doc(id).valueChanges()
         }

    
  cargarimagenesCancionesFirebase(imagenes: Mp3Solicitud[], cancion: cancionSolicitud) {
    const storage = getStorage();
    for (const item of imagenes) {
      let generosimg = cancion.song_nombre;
      console.log('nombre_imagen', cancion.song_nombre);
      
      // para que la imagen se guarde con el nombre del generos y si hay espacio se unan y no halla problemas
      this.usuario = localStorage.getItem('usuario');
      const path=`${this.CarpetaImagenes}/${this.usuario}/${cancion.song_nombre}`;      
      const storageResf = ref(storage, path);
      // a cargar la imagen
      const uploadImg = uploadBytesResumable(storageResf, item.mp3);
      uploadImg.on('state_changed', (snapshot) => {
        const imagenn = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      }, (error) => {
        console.log('error_imagen', error)

      }, () => {
        //obtener la url
        getDownloadURL(uploadImg.snapshot.ref).then((downloadURL) => {
          this.usuario = localStorage.getItem('usuario');
          item.url = downloadURL;
          console.log('url', item.url)
          console.log('url_name', cancion.id)
         
          if (cancion.id) {
            // console.log(this.update(generosImg, url,filePath))
            console.log('entre')
             //this.update(generos, item.url,path);
            // console.log('datos update',this.update(generosImg, url,filePath))
            
           } else {
             
             
           const  id = this.db.createId(); 
          this.guadarImagenGeneros({
// aqui estan los datos que se enviar a la base de datos con la imagen
   
            song_nombre: cancion.song_nombre,
            imagenUrl: item.url,
            artista_id: this.usuario,
            song_reference:path,
            id:id,
            album_id:cancion.album_id,
           
          } )}
          console.log('ruta de imagen ', path)
          
        })

      })

    }


  }

//Eliminar
public eliminar_canciones_total(gen:cancionSolicitud):Promise<any>{
  const storage = getStorage();
  const refgeneros = ref(storage, gen.song_reference)
  deleteObject(refgeneros).then(()=>{
   // Swal.fire('EXITO','la imagen se elimino correctamente','success');

  }).catch((error)=>{
    console.log('no se elimino la imagen',error)

  });
  return this.cancionesCollection.doc(gen.id).delete();

  }
    
async guadarImagenGeneros(cancionSolicitud: {song_nombre: string, imagenUrl: string, artista_id: string,song_reference:string,id:string, album_id:string}): Promise<any> {
  
  try {

    Swal.fire({
      icon: 'success',
      title: 'Se subio correctamente la cancion',
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,

    }).then((result) => {

      if (result.value) {
        //this.router.navigate(['/generos']);
        console.log(true, 'si funcioa');

      }

    })
    const  id = this.db.createId(); 
    return await this.db.collection('canciones').doc(id).set({id,
      song_nombre: cancionSolicitud.song_nombre,
      imageURL:cancionSolicitud.imagenUrl,
      artista_id:cancionSolicitud.artista_id,
      song_reference:cancionSolicitud.song_reference,
      album_id:cancionSolicitud.album_id});

      


  } catch (error) {
    console.log('error al guadar imagen', error)

  }

}
///


// editar generos

url1: any =
"https://i.pinimg.com/564x/65/df/2c/65df2c922e64c61235162ab7c0924d3c.jpg";
_file;
file;
name = "";
id = null;






create(albumImg:cancionSolicitud, urlImg,referencia1) {
  const id = this.db.createId();
  
  this.speakerCollection.doc(id).set({ 
    id,
    song_nombre: albumImg.song_nombre,
    imageURL:albumImg.imageURL,
    id_artista:albumImg. id_artista,
    song_reference:albumImg. id_artista,
    album_id:albumImg.album_id,
   
    
  });
  
}add(generosImg:cancionSolicitud, _file,isChanged) {
  console.log('cambio',isChanged)
  if (isChanged){


  this.usuario1 = localStorage.getItem('usuario')
  console.log('lll',this.usuario1)
  const filePath = 'imagenCancion/'+this.usuario1+'/'+generosImg.song_nombre;
 // console.log("imagenGeneros/"+this.usuario+'/'+generosImg.song_nombre)
  const ref = this.storage.ref(filePath);
  ref.put(_file).then(() => {
    ref.getDownloadURL().subscribe(url => {
     /* this.url2=url
      generosImg.id
      console.log('id',generosImg.Genero_nuevo)
      */
      console.log('id',generosImg.id)
     // this.url2=url
     //  esto es para que se edite la imagen
      if (generosImg.id) {
        console.log('url_cancion',url)
       // console.log(this.update(generosImg, url,filePath))
       
        this.update(generosImg, url,filePath);
        console.log('datos_existen',filePath)
       
      } else {
        this.create(generosImg, url,filePath);
        
      }
    });
  });
} // cieere del if 
else{
  this.update(generosImg,generosImg.imageURL,generosImg.song_reference)
  console.log('ubiaccion',generosImg.song_reference)
}
 

}


update(albumImg: cancionSolicitud, urlImg,referencia) {
console.log('id_update',albumImg.id,urlImg)
console.log('referencia',referencia)
try {

console.log('referencia_cancionnnn',albumImg.song_reference)
console.log('pasar_referecia',referencia)
if(albumImg.song_reference==referencia){
console.log('entre',albumImg.id)
console.log('que pasa',this.speakerCollection.doc(albumImg.id).update({ song_nombre: albumImg.song_nombre, imageURL: albumImg.imageURL, id_artista: albumImg.id_artista,song_reference:albumImg.song_reference,album_id:albumImg.id}))
//this.speakerCollection.doc(albumImg.id).update({ song_nombre: albumImg.song_nombre, imageURL: albumImg.imageURL, id_artista: albumImg.id_artista,song_reference:albumImg.song_reference,album_id:albumImg.id});
console.log('datos abtes de enviar1' ,albumImg.imageURL  )  


}else{
  console.log('se creo nuevo')
this.speakerCollection.doc(albumImg.id)
.update({ song_nombre: albumImg.song_nombre, imageURL: albumImg.imageURL, id_artista: albumImg.id_artista,song_reference:albumImg.song_reference,album_id:albumImg.id });
console.log('datos abtes de enviar' ,albumImg.song_nombre )  

}

Swal.fire({
position: 'top-end',
icon: 'success',
title: 'Cancion Editado correctamente'+':'+albumImg.song_nombre,
showConfirmButton: false,
timer: 1500
})

this.router.navigate(['/generos']);

//
} catch (error) {
  console.log(error)
Swal.fire({
position: 'top-end',
icon: 'error',
title: 'Cancion no editado'+':'+albumImg.song_nombre+error,
showConfirmButton: false,
timer: 1500
}) 
} 

}




  
}
