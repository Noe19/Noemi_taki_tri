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
import { GenerosService } from '../generos/generos.service';
@Injectable({
  providedIn: 'root'
})
export class AlbumesService {
  speakerCollection: AngularFirestoreCollection<Albumes>;
  speakerList: Observable<Albumes[]>;
  private CarpetaImagenes_Albumes = "imagenAlbumes";
  private albumesCollection: AngularFirestoreCollection<Albumes>
  public usuario: any;
  public nombreGenero:any;
 
  constructor(private db: AngularFirestore, private router: Router,private storage: AngularFireStorage,public gen:GenerosService) {
     // menciona que me traiga la coleccion que esta en base de datos llamado..
    this.albumesCollection = db.collection<Albumes>('albums');
    //
    //this.generosCollection = db.collection<Generos>('generos');
    this.speakerCollection = db.collection("albums");
    this.speakerList = this.speakerCollection.valueChanges();
   }

   // traer todos los albumes del artista
   getPostAlbumes (){
    this.usuario = localStorage.getItem('usuario')
   
    return this.db.collection("albums",ref => ref.where('artista_id', '==', this.usuario)).snapshotChanges()
  
    }
 // un solo documento
 getPostbyId_album(id){
   
  return this.db.collection("albums").doc(id).valueChanges()
  
   }
 
  public eliminar_generos_total(gen:Albumes){

    
    /////////////
    Swal.fire({
      title: 'Estas seguro en eliminar ?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Estoy seguro,eliminar!'
    }).then((result) => {
   
      if (result.isConfirmed ) {
        const mio = localStorage.getItem('cuantos_canciones');
        const m=1;
        console.log('eliminar',mio);
         
       if(parseInt(mio)<=0){
   
        const storage = getStorage();
        const refgeneros = ref(storage, gen.image_reference)
        deleteObject(refgeneros).then(()=>{
       
      
        }).catch((error)=>{
          console.log('no se elimino la imagen',error)
      
        });
        this.albumesCollection.doc(gen.id).delete();
         Swal.fire(
          'Eliminado!',
          'Informacion eliminado correctamente',
          'success'
        )
  
      }else{
        Swal.fire(
          'No es posible eliminar el Álbum!',
          'Este Álbum tiene canciones ',
          'warning'
        )

      }
       
        
        
      }
    })


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
                imageURL: item.url,
                image_reference:path,
                genero_name:album.genre_name,
                artista_id:this.usuario,
                genre_id:album.genre_id

          } )
          console.log('ruta de imagen ', path)
          
        })

      })

    }


  }


  // Crear álbumes
  async guadarImagenAlbum(album_tdo: { name: string, author: string, year: string,id:string,image_reference:string,imageURL:string,genero_name:string,artista_id:string,genre_id:string}): Promise<any> {
  
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
      
      this.nombreGenero=localStorage.getItem('nameGenero');
    
    
      this.usuario = localStorage.getItem('usuario');
      return await this.db.collection('albums').doc(id).set({id,
      
        name:album_tdo.name,
        author:album_tdo.author,
        year:album_tdo.year,
      image_reference:album_tdo.image_reference,
       imageURL:album_tdo.imageURL,
      genre_name:this.nombreGenero,
      artista_id:this.usuario,
       genre_id:album_tdo.genre_id});

        


    } catch (error) {
      console.log('error al guadar imagen', error)

    }

  }

  
  // editar albumes

  url1: any =
    "https://i.pinimg.com/564x/65/df/2c/65df2c922e64c61235162ab7c0924d3c.jpg";
  _file;
  file;
  name = "";

    create(albumImg: Albumes, urlImg,referencia1) {
      const id = this.db.createId();
      
      this.speakerCollection.doc(id).set({ 
        name:albumImg.name,
        imageURL:albumImg.imageURL,   
        author:albumImg.author,
        year:albumImg.year,
        id:albumImg.id,
        genre_name:albumImg.genre_name,
        image_reference:albumImg.image_reference,
        artista_id:albumImg.artista_id,
        genre_id:albumImg.genre_id,

        
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
      this.update(albumImg,albumImg.imageURL,albumImg.image_reference)
      console.log('ubiaccion',albumImg.image_reference)
    }
     
    
  }

//Codigo para actualizar los albumes 
   update(albumImg: Albumes, urlImg,referencia) {
    console.log('id_update',albumImg.id,albumImg.imageURL)
    console.log('referencia',referencia)
   
  if(albumImg.image_reference==referencia){
    console.log('id_para ediatr',albumImg.id)
   
    
    this.speakerCollection.doc(albumImg.id).update({  name: albumImg.name, imageURL: urlImg,year:albumImg.year,author:albumImg.author,image_reference:albumImg.image_reference });
    console.log('datos abtes de enviar1' ,albumImg.name  )   


  }else{
    this.speakerCollection
    .doc(albumImg.id)
    .update({ name: albumImg.name, imageURL: urlImg,year:albumImg.year,author:albumImg.author });
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

  // traer todas las cancion que pertenecen a ese album
  enviar(id){
    return this.db.collection("songs",ref => ref.where('album_id', '==', id)).snapshotChanges();

  }

  // pruebas unitarias
  async crearAlbumes(DatosAlbumes){
    const  id = this.db.createId(); 
    await this.db.collection('albums').doc(id).set({id,
      name: DatosAlbumes.name,
      author:DatosAlbumes.author,
      year:DatosAlbumes.year,
      imageURL:DatosAlbumes.imageURL
      
      });
    }
      
}
