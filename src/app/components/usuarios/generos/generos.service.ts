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
import { Administrador } from '../../administrador/administrador.model';
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
  //editar albumes
  administrador: Administrador[]
  // canciones 
  public actualizar_genre :any;
  constructor(private db: AngularFirestore, private router: Router,private storage: AngularFireStorage) {
    // menciona que me traiga la coleccion que esta en base de datos llamado..
    this.generosCollection = db.collection<Generos>('genres');
    this.speakerCollection = db.collection("genres");
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
   
    return this.db.collection("genres",ref => ref.where('authorId', '==', this.usuario)).snapshotChanges()
  
    }

    getodosgeneros(){
      this.usuario = localStorage.getItem('usuario')
   
    return this.db.collection("genres",ref => ref.where('authorId', '==', this.usuario)).snapshotChanges() 
    }
    
/*
   getodosgeneros(){
      this.usuario = localStorage.getItem('usuario')
   console.log('path',refi)
    console.log( this.db.collection("generos",ref => ref.where('Genero_nuevo', '==', refi)).snapshotChanges() )
    }
*/
    getgenerosbyId(id){
   
      return this.db.collection("genres").doc(id).valueChanges()
       }
// verificar el nombre del autor 
author_mio(nomAuthor){
  const nombAuthor = nomAuthor;
  console.log('nombre del autor',nombAuthor)
  return nombAuthor;

}
      
   


  cargarimagenesGeneroFirebase(imagenes: ImagenesGeneros[], generos: Generos) {
 
  if(imagenes.length==0){
    Swal.fire({
      icon: 'error',
      title: 'Genero no creado, por favor ingrese todos los datos o el género ya existe ',
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,

    })
  }
  
    const storage = getStorage();
    for (const item of imagenes) {
      let generosimg = generos.name;
      console.log('nombre_imagen', generos.name);
      
      // para que la imagen se guarde con el nombre del generos y si hay espacio se unan y no halla problemas
     
      const path=`${this.CarpetaImagenes}/${this.usuario}/${generos.name}`;
   
  //    this.getodosgeneros(generos.Genero_nuevo)

      

       
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
   
            name: generos.name,
            imageURL: item.url,
            authorId: this.usuario,
            image_reference:path,
            id:id,
           
           
            

          } )}
          console.log('ruta de imagen ', path)
          
        })

      })

    

  }
  }



    
  async guadarImagenGeneros(generos: { name: string, imageURL: string, authorId: string,image_reference:string,id:string}): Promise<any> {
  
    try {

      Swal.fire({
        icon: 'success',
        title: 'Se creó correctamente el género',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,

      }).then((result) => {

        if (result.value) {
          //this.router.navigate(['/generos']);
          console.log(true, 'si funcioa');
         // console.log('creacion de generos ',generos.Genero_nuevo==generos.Genero_nuevo)

        }

      })
      const  id = this.db.createId(); 
  const nomg =localStorage.getItem('UserAuthor');
  console.log('dato antes de pasar',this.author_mio(nomg))
      return await this.db.collection('genres').doc(id).set({id,
        name: generos.name,
        imageURL:generos.imageURL,
        authorId:generos.authorId,
        author:nomg,
        image_reference:generos.image_reference});

        


    } catch (error) {
      console.log('error al guadar imagen', error)

    }

  }

  

  

  // eliminar generos en storage y firestore
  public eliminar_generos_total(gen:Generos){
   const m =0;
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
    //  console.log('cuantos generos tengo',this.todoslosgeneros.length)
      if (result.isConfirmed ) {
        const mio = localStorage.getItem('cuantos');
        const m=1;
        console.log('eliminar',mio);
         
       if(parseInt(mio)<=0){
   
        const storage = getStorage();
        const refgeneros = ref(storage, gen.image_reference)
        deleteObject(refgeneros).then(()=>{
               
        }).catch((error)=>{
          console.log('no se elimino la imagen',error)
      
        });
      
      
       
         this.generosCollection.doc(gen.id).delete();
         Swal.fire(
          'Eliminado!',
          'Informacion eliminado correctamente',
          'success'
        )
  
      }else{
        Swal.fire(
          'No es posible eliminar el Género!',
          'Este genero tiene albumes ',
          'warning'
        )

      }
       
        
        
      }
    })

     

    /////////////////////
  

 
   
    return m; 

  }

  // editar generos

  url1: any =
    "https://i.pinimg.com/564x/65/df/2c/65df2c922e64c61235162ab7c0924d3c.jpg";
  _file;
  file;
  name = "";
  id = null;



 


    create(albumImg: Generos, urlImg,referencia1) {
     
    
    }add(generosImg: Generos, _file,isChanged) {
      console.log('cambio',isChanged)
      if (isChanged){

    
      this.usuario1 = localStorage.getItem('usuario')
      console.log('lll',this.usuario1)
      const filePath = this.CarpetaImagenes1+this.usuario1+'/'+generosImg.name;
      console.log("imagenGeneros/"+this.usuario+'/'+generosImg.name)
      const ref = this.storage.ref(filePath);
      ref.put(_file).then(() => {
        ref.getDownloadURL().subscribe(url => {
       
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
      this.update(generosImg,generosImg.imageURL,generosImg.image_reference)
      console.log('ubiaccion',generosImg.image_reference)
    }
     
    
  }


   update(albumImg: Generos, urlImg,referencia) {
   // console.log('id_update',albumImg.id,albumImg.imageURL)
    console.log('referencia',referencia)
 try {
   
  
  if(albumImg.image_reference==referencia){
    
    this.speakerCollection
    .doc(albumImg.id)
   .update({ name: albumImg.name, imageURL: urlImg, authorId: albumImg.authorId,image_reference:albumImg.image_reference});
    console.log('datos abtes de enviar1' ,albumImg.imageURL  );
    //para que se actualice las canciones
   // this.obtener_id(albumImg.name,albumImg.id);
   
  /*   
     this.db
      .collection("songs")
      .doc("o3BK0ddWb4jSopZfhqGT")
      .update({
        genre_name: albumImg.name,
      
      })
*/
      
        // return this.angularfirestore.collection("request",ref => ref.where('rol', '==', 'rechazado')).snapshotChanges()
    

  }else{
    this.speakerCollection
    .doc(albumImg.id)
    .update({ name: albumImg.name, imageURL: urlImg, authorId: albumImg.authorId });
    console.log('datos abtes de enviar' ,albumImg.name  ) 
    //para que se actualice 
   // this.obtener_id(albumImg.name,albumImg.id); 

  }
 
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Genero Editado correctamente'+':'+albumImg.name,
    showConfirmButton: false,
    timer: 1500
  })

  this.router.navigate(['/generos']);

//
} catch (error) {
  Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: 'Genero no editado'+':'+albumImg.name,
    showConfirmButton: false,
    timer: 1500
  }) 
} 



  }

  //actualizar canciones 
  updateCancione(id){

    return this.db
      .collection("songs")
      .doc(id)
      .update({
        genre_name: 'Cumbia',
      
      })

  }

  // modifcar las 
  /*
  obtener_id(nombre_genre,id_genre){
    localStorage.setItem('actualizar_genero','')
    localStorage.setItem('actualizar_genero',id_genre);

    console.log('genero_id',id_genre,'nombre a modificar',nombre_genre)
 
    //return this.db.collection("songs",ref => ref.where('genre_id', '==', id_genre)).snapshotChanges(); 
  }
  */
/*
  busqueda_id_genre(){
    this.actualizar_genre = localStorage.getItem('actualizar_genero')  
   return this.db.collection("songs",ref => ref.where('genre_id', '==', this.actualizar_genre)).snapshotChanges()

  }
*/
  
//ultimo  intento de canciones
/*
hacer_consulta(){
  this.usuario = localStorage.getItem('usuario')
   
  return this.db.collection("songs",ref => ref.where('artista_id', '==', this.usuario)).snapshotChanges()

}
*/


// servicio de busqueda de albumes hacia generos

enviar(id){
  return this.db.collection("albums",ref => ref.where('genre_id', '==', id)).snapshotChanges() 
}

  

}
