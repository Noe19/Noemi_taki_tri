import { Injectable } from '@angular/core';
import { snapshotChanges } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ImagenesGeneros } from './create-generos/imagenesGeneros.modal';
import { Generos } from './generos.modal';
import { Action } from 'rxjs/internal/scheduler/Action';
import { error } from 'console';
import { AngularFireStorage } from '@angular/fire/compat/storage';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class GenerosService {
  speakerCollection: AngularFirestoreCollection<Generos>;
  speakerList: Observable<Generos[]>;
  public url:any;
  public url2:any;
  private CarpetaImagenes = "imagenGeneros";
  private CarpetaImagenes1 = "imagenGeneros/";
  // variable para visualizar los genero 
  private generosCollection: AngularFirestoreCollection<Generos>
  public usuario: any;
  public usuario1:any;
  constructor(private db: AngularFirestore, private router: Router,private storage: AngularFireStorage) {
    // menciona que me traiga la coleccion que esta en base de datos llamado..
    this.generosCollection = db.collection<Generos>('generos');
    this.speakerCollection = db.collection("generos");
    this.speakerList = this.speakerCollection.valueChanges();
  }
  
  //obtener los datos de la base de datos generos
  getGeneros(): Observable<Generos[]> {
    // para trabajar con la coleccion usamos snapshotChanges
    return this.generosCollection.snapshotChanges().pipe(
      map(action =>
        action.map(res => {
          const data = res.payload.doc.data() as Generos;
          const id = res.payload.doc.id;
          return { id, ...data }
        })
      )
    )

  }

  getPostgeneros (){
    this.usuario = localStorage.getItem('usuario')
   
    return this.db.collection("generos",ref => ref.where('artista_id', '==', this.usuario)).snapshotChanges()
  
    }

    getgenerosbyId(id){
   
      return this.db.collection("generos").doc(id).valueChanges()
       }

      



  cargarimagenesGeneroFirebase(imagenes: ImagenesGeneros[], generos: Generos) {
    const storage = getStorage();
    for (const item of imagenes) {
      let generosimg = generos.Genero_nuevo;
      console.log('nombre_imagen', generos.Genero_nuevo);
      
      // para que la imagen se guarde con el nombre del generos y si hay espacio se unan y no halla problemas
     
      const path=`${this.CarpetaImagenes}/${this.usuario}/${generos.Genero_nuevo}`;      
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
          console.log('url_name', generos.id)
         
          if (generos.id) {
            // console.log(this.update(generosImg, url,filePath))
            console.log('entre')
             //this.update(generos, item.url,path);
            // console.log('datos update',this.update(generosImg, url,filePath))
            
           } else {
             
             
           const  id = this.db.createId(); 
          this.guadarImagenGeneros({
// aqui estan los datos que se enviar a la base de datos con la imagen
   
            Genero_nuevo: generos.Genero_nuevo,
            imagenUrl: item.url,
            artista_id: this.usuario,
            referencia:path,
            id:id,
           
           
            

          } )}
          console.log('ruta de imagen ', path)
          
        })

      })

    }


  }

    
  async guadarImagenGeneros(generos: { Genero_nuevo: string, imagenUrl: string, artista_id: string,referencia:string,id:string}): Promise<any> {
  
    try {

      Swal.fire({
        icon: 'success',
        title: '',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,

      }).then((result) => {

        if (result.value) {
          //this.router.navigate(['/generos']);
          console.log(true, 'si funcioa');

        }

      })
      const  id = this.db.createId(); 
      return await this.db.collection('generos').doc(id).set({id,
        Genero_nuevo: generos.Genero_nuevo,
        imagenUrl:generos.imagenUrl,
        artista_id:generos.artista_id,
        referencia:generos.referencia});

        


    } catch (error) {
      console.log('error al guadar imagen', error)

    }

  }

  

  

  // eliminar generos en storage y firestore
  public eliminar_generos_total(gen:Generos):Promise<any>{
  const storage = getStorage();
  const refgeneros = ref(storage, gen.referencia)
  deleteObject(refgeneros).then(()=>{
    
    //Swal.fire('EXITO','la imagen se elimino correctamente','success');

  }).catch((error)=>{
    console.log('no se elimino la imagen',error)

  });


 
  return this.generosCollection.doc(gen.id).delete();

  }

  // editar generos

  url1: any =
    "https://i.pinimg.com/564x/65/df/2c/65df2c922e64c61235162ab7c0924d3c.jpg";
  _file;
  file;
  name = "";
  id = null;



 


    create(albumImg: Generos, urlImg,referencia1) {
      const id = this.db.createId();
      
      this.speakerCollection.doc(id).set({ 
        id,
        Genero_nuevo: albumImg.Genero_nuevo,
        imagenUrl:albumImg.imagenUrl,
        artista_id:albumImg.artista_id,
        referencia:albumImg.referencia
       
        
      });
      
    }add(generosImg: Generos, _file,isChanged) {
      console.log('cambio',isChanged)
      if (isChanged){

    
      this.usuario1 = localStorage.getItem('usuario')
      console.log('lll',this.usuario1)
      const filePath = this.CarpetaImagenes1+this.usuario1+'/'+generosImg.Genero_nuevo;
      console.log("imagenGeneros/"+this.usuario+'/'+generosImg.Genero_nuevo)
      const ref = this.storage.ref(filePath);
      ref.put(_file).then(() => {
        ref.getDownloadURL().subscribe(url => {
         /* this.url2=url
          generosImg.id
          console.log('id',generosImg.Genero_nuevo)
          */
          console.log('id',generosImg.id)
          this.url2=url
         //  esto es para que se edite la imagen
          if (generosImg.id) {
           // console.log(this.update(generosImg, url,filePath))
           
            this.update(generosImg, url,filePath);
           // console.log('datos_existen',filePath)
           
          } else {
            this.create(generosImg, url,filePath);
            
          }
        });
      });
    } // cieere del if 
    else{
      this.update(generosImg,generosImg.imagenUrl,generosImg.referencia)
      console.log('ubiaccion',generosImg.referencia)
    }
     
    
  }


   update(albumImg: Generos, urlImg,referencia) {
    console.log('id_update',albumImg.id,albumImg.imagenUrl)
    console.log('referencia',referencia)
 try {
   
  
  if(albumImg.referencia==referencia){
    
    this.speakerCollection
    .doc(albumImg.id)
   .update({ Genero_nuevo: albumImg.Genero_nuevo, imagenUrl: urlImg, artista_id: albumImg.artista_id,referencia:albumImg.referencia });
    console.log('datos abtes de enviar1' ,albumImg.imagenUrl  )  


  }else{
    this.speakerCollection
    .doc(albumImg.id)
    .update({ Genero_nuevo: albumImg.Genero_nuevo, imagenUrl: urlImg, artista_id: albumImg.artista_id,referencia });
    console.log('datos abtes de enviar' ,albumImg.Genero_nuevo  )  

  }
 
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Genero Editado correctamente'+':'+albumImg.Genero_nuevo,
    showConfirmButton: false,
    timer: 1500
  })

  this.router.navigate(['/generos']);

//
} catch (error) {
  Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: 'Genero no editado'+':'+albumImg.Genero_nuevo,
    showConfirmButton: false,
    timer: 1500
  }) 
} 

  }


  

}
