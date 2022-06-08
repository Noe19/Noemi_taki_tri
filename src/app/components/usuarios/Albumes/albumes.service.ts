import { Injectable } from '@angular/core';
import { snapshotChanges } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Albumes } from './create-albumes/albumes.modal';
import { ImagenesAlbumes } from './create-albumes/imagen_Albumes.modal';
import { Action } from 'rxjs/internal/scheduler/Action';
import { error } from 'console';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root'
})
export class AlbumesService {
  speakerCollection: AngularFirestoreCollection<Albumes>;
  speakerList: Observable<Albumes[]>;
  private CarpetaImagenes_Albumes = "imagenAlbumes";
  private albumesCollection: AngularFirestoreCollection<Albumes>
  public usuario: any;
 
  constructor(private db: AngularFirestore, private router: Router,private storage: AngularFireStorage) {
     // menciona que me traiga la coleccion que esta en base de datos llamado..
    this.albumesCollection = db.collection<Albumes>('albumes');
    //
    //this.generosCollection = db.collection<Generos>('generos');
    this.speakerCollection = db.collection("albumes");
    this.speakerList = this.speakerCollection.valueChanges();
   }

   // traer todos los albumes del artista
   getPostAlbumes (){
    this.usuario = localStorage.getItem('usuario')
   
    return this.db.collection("albumes",ref => ref.where('artista_id', '==', this.usuario)).snapshotChanges()
  
    }
 // un solo documento
 getPostbyId_album(id){
   
  return this.db.collection("albumes").doc(id).valueChanges()
  
   }
   
 
       //eliminar
         // eliminar generos en storage y firestore
  public eliminar_generos_total(gen:Albumes):Promise<any>{
    const storage = getStorage();
    const refgeneros = ref(storage, gen.referencia)
    deleteObject(refgeneros).then(()=>{
     // Swal.fire('EXITO','la imagen se elimino correctamente','success');
  
    }).catch((error)=>{
      console.log('no se elimino la imagen',error)
  
    });
    return this.albumesCollection.doc(gen.id).delete();
  
    }
  
   // para cargar imagens e enviar a firestore 
   cargarimagenesAlbumesFirebase(imagenes: ImagenesAlbumes[], album: Albumes) {
    this.usuario = localStorage.getItem('usuario')
    const storage = getStorage();
    for (const item of imagenes) {
      let albumesimg = album.name;
      console.log('nombre_imagen', album.name);
      
      // para que la imagen se guarde con el nombre del generos y si hay espacio se unan y no halla problemas
     
      const path=`${this.CarpetaImagenes_Albumes}/${this.usuario}/${album.name}`;      
      const storageResf = ref(storage, path);
      // a cargar la imagen
      const uploadImg = uploadBytesResumable(storageResf, item.imagen);
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
          console.log('url_name', album.id)
         
         
            // console.log(this.update(generosImg, url,filePath))
            console.log('entre')
             //this.update(generos, item.url,path);
            // console.log('datos update',this.update(generosImg, url,filePath))
            
        
                 
             
           const  id = this.db.createId(); 
          this.guadarImagenAlbum({
// aqui estan los datos que se enviar a la base de datos con la imagen
   
               name:album.name,
                author:album.author,
                year:album.year,
                id:id,
                imagen: item.url,
                referencia:path,
                genero_name:album.genero_name,
                artista_id:this.usuario,

          } )
          console.log('ruta de imagen ', path)
          
        })

      })

    }


  }


  //
  async guadarImagenAlbum(album_tdo: { name: string, author: string, year: string,id:string,referencia:string,imagen:string,genero_name:string,artista_id:string}): Promise<any> {
  
    try {
 
      Swal.fire({
        icon: 'success',
        title: 'se registro con exito tu Album',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,

      }).then((result) => {

        if (result.value) {
          //this.router.navigate(['/generos']);
          console.log(true, 'si funcioa');

        }

      })
      const  id = this.db.createId(); 
      this.usuario = localStorage.getItem('usuario');
      return await this.db.collection('albumes').doc(id).set({id,
      
        name:album_tdo.name,
        author:album_tdo.author,
        year:album_tdo.year,
      referencia:album_tdo.referencia,
       imagen:album_tdo.imagen,
      genero_name:album_tdo.genero_name,
      artista_id:this.usuario});

        


    } catch (error) {
      console.log('error al guadar imagen', error)

    }

  }
  // editar 
  
  // editar generos

  url1: any =
    "https://i.pinimg.com/564x/65/df/2c/65df2c922e64c61235162ab7c0924d3c.jpg";
  _file;
  file;
  name = "";




 


    create(albumImg: Albumes, urlImg,referencia1) {
      const id = this.db.createId();
      
      this.speakerCollection.doc(id).set({ 
        name:albumImg.name,
        imagen:albumImg.imagen,   
        author:albumImg.author,
        year:albumImg.year,
        id:albumImg.id,
        genero_name:albumImg.genero_name,
        referencia:albumImg.referencia,
        artista_id:albumImg.artista_id

        
      });
      
    }add(albumImg: Albumes, _file,isChanged) {
      console.log('cambio',isChanged)
      if (isChanged){

    
      this.usuario = localStorage.getItem('usuario')
      console.log('lll',this.usuario)
      const filePath = 'imagenAlbumes'+'/'+this.usuario+'/'+albumImg.name;
      //console.log("imagenGeneros/"+this.usuario+'/'+albumImg.name)
      const ref = this.storage.ref(filePath);
      ref.put(_file).then(() => {
        ref.getDownloadURL().subscribe(url => {
         /* this.url2=url
          generosImg.id
          console.log('id',generosImg.Genero_nuevo)
          */
          console.log('id',albumImg.id)
         // this.url2=url
         //  esto es para que se edite la imagen
          if (albumImg.id) {
           // console.log(this.update(generosImg, url,filePath))
           
            this.update(albumImg, url,filePath);
           // console.log('datos_existen',filePath)
           
          } else {
            this.create(albumImg, url,filePath);
            console.log('estoy aqui creando')
            
          }
        });
      });
    } // cieere del if 
    else{
      this.update(albumImg,albumImg.imagen,albumImg.referencia)
      console.log('ubiaccion',albumImg.referencia)
    }
     
    
  }


   update(albumImg: Albumes, urlImg,referencia) {
    console.log('id_update',albumImg.id,albumImg.imagen)
    console.log('referencia',referencia)
   
  if(albumImg.referencia==referencia){
    console.log('id_para ediatr',albumImg.id)
    /*
    this.speakerCollection
    .doc(albumImg.id)
   .update({ name: albumImg.name, imagen: urlImg,year:albumImg.year,author:albumImg.author });
    console.log('datos abtes de enviar1' ,albumImg.imagen  )*/
    
    this.speakerCollection.doc(albumImg.id).update({  name: albumImg.name, imagen: urlImg,year:albumImg.year,author:albumImg.author,referencia:albumImg.referencia });
    console.log('datos abtes de enviar1' ,albumImg.name  )   


  }else{
    this.speakerCollection
    .doc(albumImg.id)
    .update({ name: albumImg.name, imagen: urlImg,year:albumImg.year,author:albumImg.author });
    console.log('datos abtes de enviar' ,albumImg.name  )  

  }
  // mensaje de alerta que se edito el album
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Albumes Editado correctamente'+':'+albumImg.name,
    showConfirmButton: false,
    timer: 1500
  })

  this.router.navigate(['/Albumes']);
 


 
console.log('aqui es el problema')
  }

}
