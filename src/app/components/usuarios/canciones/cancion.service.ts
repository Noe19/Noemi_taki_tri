import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { cancionSolicitud } from './cancion.modal';
import { Mp3Solicitud } from './mp3.modal';
import Swal from 'sweetalert2';
import { constants } from 'buffer';


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
    this.cancionesCollection = db.collection<cancionSolicitud>('songs');
    this.speakerCollection = db.collection("songs");
    this.speakerList = this.speakerCollection.valueChanges();
  }

   
 

    getPostcanciones (){
      this.usuario = localStorage.getItem('usuario')
     
      return this.db.collection("songs",ref => ref.where('artista_id', '==', this.usuario)).snapshotChanges()
    
      }

      getgenerosbyId(id){
   
        return this.db.collection("songs").doc(id).valueChanges()
         }

    
  cargarimagenesCancionesFirebase(imagenes: Mp3Solicitud[], cancion: cancionSolicitud) {
    if(imagenes.length==0){
      Swal.fire({
        icon: 'error',
        title: 'Canción no creado, por favor ingrese todos los datos includo una cancion mp3',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
  
      })
    }
    const storage = getStorage();
    for (const item of imagenes) {
      let generosimg = cancion.song_name;
      console.log('nombre_imagen', cancion.song_name);
      
      // para que la imagen se guarde con el nombre del generos y si hay espacio se unan y no halla problemas
      this.usuario = localStorage.getItem('usuario');
      const path=`${this.CarpetaImagenes}/${this.usuario}/${cancion.song_name}`;      
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
         
            console.log('entre')
        
            
           } else {
             
             
           const  id = this.db.createId(); 
          this.guadarImagenGeneros({
// aqui estan los datos que se enviar a la base de datos con la imagen
   
            song_name: cancion.song_name,
            songURL: item.url,
            artista_id: this.usuario,
            song_reference:path,
            id:id,
            album_id:cancion.album_id,
           
          } )}
          console.log('ruta de imagen ', path)
          console.log('guardar',cancion.album_id)
          
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
    
async guadarImagenGeneros(cancionSolicitud: {song_name: string, songURL: string, artista_id: string,song_reference:string,id:string, album_id:string}): Promise<any> {
  
  try {

    Swal.fire({
      icon: 'success',
      title: 'Se subió correctamente la canción',
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,

    }).then((result) => {

      if (result.value) {
        //this.router.navigate(['/generos']);
        console.log(true, 'si funcioa');

      }

    })
    const  id = this.db.createId(); 
    const album_name=localStorage.getItem('album_name');
    console.log('verificar',album_name);
    const author=localStorage.getItem('author');
    const genre_name=localStorage.getItem('genre_name');
    const imageURL=localStorage.getItem('imageURL');
    const genre_id=localStorage.getItem('genre_id')

    return await this.db.collection('songs').doc(id).set({id,
      song_name: cancionSolicitud.song_name,
      songURL:cancionSolicitud.songURL,
      artista_id:cancionSolicitud.artista_id,
      song_reference:cancionSolicitud.song_reference,
      album_id:cancionSolicitud.album_id,
      album_name:album_name,
      author:author,
      genre_name:genre_name,
      imageURL:imageURL,
      genre_id:genre_id,


    });

      


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
    song_name: albumImg.song_name,
    songURL:albumImg.songURL,
    id_artista:albumImg. id_artista,
    song_reference:albumImg.song_reference,
    album_id:albumImg.album_id,
    author:albumImg.album_id,
    album_name:albumImg.album_name,
    genre_name:albumImg.genre_name,
    imageURL:albumImg.imageURL,
    genre_id:albumImg.genre_id,
   
    
  });
  
}add(generosImg:cancionSolicitud, _file,isChanged) {
  console.log('cambio',isChanged)
  if (isChanged){


  this.usuario1 = localStorage.getItem('usuario')
  console.log('lll',this.usuario1)
  const filePath = 'imagenCancion/'+this.usuario1+'/'+generosImg.song_name;
 // console.log("imagenGeneros/"+this.usuario+'/'+generosImg.song_nombre)
  const ref = this.storage.ref(filePath);
  ref.put(_file).then(() => {
    ref.getDownloadURL().subscribe(url => {
    
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
  this.update(generosImg,generosImg.songURL,generosImg.song_reference)
  console.log('ubiaccion',generosImg.song_reference)
}
 

}


update(albumImg: cancionSolicitud, urlImg,referencia) {

try {


if(albumImg.song_reference==referencia){
  this.usuario = localStorage.getItem('usuario');
console.log('entre1',albumImg.id)
console.log('entre2',albumImg.song_name)
console.log('entre3',urlImg)
console.log('entre6',albumImg.album_id)
console.log('entre4',this.usuario)
console.log('entre5',albumImg.song_reference)
//console.log('que pasa',this.speakerCollection.doc(albumImg.id).update({ song_nombre: albumImg.song_nombre, imageURL: albumImg.imageURL, id_artista: albumImg.id_artista,song_reference:albumImg.song_reference,album_id:albumImg.id}))
this.speakerCollection.doc(albumImg.id).update({ song_name: albumImg.song_name, songURL: urlImg, id_artista: this.usuario,song_reference:albumImg.song_reference,album_id:albumImg.album_id});
console.log('datos abtes de enviar1' ,albumImg.imageURL  )  


}else{
  this.usuario = localStorage.getItem('usuario');
  console.log('se creo nuevo')
this.speakerCollection.doc(albumImg.id)
.update({ song_name: albumImg.song_name, songURL: urlImg, id_artista: this.usuario,song_reference:albumImg.song_reference,album_id:albumImg.album_id });
console.log('datos abtes de enviar' ,albumImg.song_name )  

}

Swal.fire({
position: 'top-end',
icon: 'success',
title: 'Canción editado correctamente'+':'+albumImg.song_name,
showConfirmButton: false,
timer: 1500
})

this.router.navigate(['/Canciones']);

//
} catch (error) {
  console.log(error)
Swal.fire({
position: 'top-end',
icon: 'error',
title: 'Canción no editado'+':'+albumImg.song_name+error,
showConfirmButton: false,
timer: 1500
}) 
} 

}

todas_las_canciones_por_albumes(id_album){
  this.usuario = localStorage.getItem('usuario')
  return this.db.collection("songs",ref => ref.where('album_id', '==', id_album).where('artista_id', '==', this.usuario) ).snapshotChanges()

  }

   // pruebas unitarias
   async creaCancion(DatosCancion){
    const  id = this.db.createId(); 
    await this.db.collection('songs').doc(id).set({id,
      song_name: DatosCancion.song_name,
      songURL:DatosCancion.songURL,
      
      });
    }

    //validar nombre cancion
    getPostcancionesid(id){
      this.usuario = localStorage.getItem('usuario')
        
   // console.log( this.db.collection(`usuario/${this.usuario}`,ref => ref.where('rol', '==', 'artistista')).snapshotChanges())
   return this.db.collection("songs",ref => ref.where('artista_id', '==', this.usuario).where('album_id', '==', id) ).snapshotChanges()
      
    }
}
