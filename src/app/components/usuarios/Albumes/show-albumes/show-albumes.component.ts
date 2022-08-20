import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GenerosService } from '../../generos/generos.service';
import { AlbumesService } from '../albumes.service';
import { Albumes } from '../create-albumes/albumes.modal';
import { ImagenesAlbumes } from '../create-albumes/imagen_Albumes.modal';

@Component({
  selector: 'app-show-albumes',
  templateUrl: './show-albumes.component.html',
  styleUrls: ['./show-albumes.component.css']
})
export class ShowAlbumesComponent implements OnInit {
  // componente padre

  public usuario: any;
  Albumes:Albumes[]=[];
  imagenes:ImagenesAlbumes[]=[];
 imgURL="../assets/imagenes/camera.png";
  file:any;
 
  //generos:Generos[];
  public imagen:any;
  todoslosalbumes:Albumes[]=[];
 //buscador
 public page:number=0;
 public search:string="";
 
  
  public url:any;
  
  public Albumesforms : FormGroup;
  
  constructor(private router:Router,private fb:FormBuilder,private GenerosImg:GenerosService, private AlbumImg:AlbumesService,private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.AlbumImg.getPostAlbumes().subscribe((res) =>{
      this.imagen=res;
      
      this.todoslosalbumes = res.map((e) =>{
        this.url=this.todoslosalbumes
        console.log(this.url)
      
        return {
          
          id: e.payload.doc.id,      
          ...(e.payload.doc.data() as Albumes)
          
        };
       
       
      });
    
     
     
    });
  }
  eliminar_genero(Albumes){

    this.AlbumImg.eliminar_generos_total(Albumes);
   
  }

   // // buscador 
   onSearchMensaje(search:string){
    this.page=0;
      this.search=search;
      //console.log(search);
  }

 

  limpiarform(){
    this.Albumesforms.reset();
    this.imgURL="../assets/imagenes/camera.png";
  }
     // paginacion de paginas
     siguiente_pagina_album(){
      this.page+=3;
     }
  
     atras_pagina_album(){
       if(this.page>0){
        this.page-=3;
       }
      
  
     }

     //pasar los datos de album a canciones
     obtenerdatosAlbumes(album_name,genre_name,author,imageURL,genre_id){
    // console.log('generi',genre_id)
      //console.log('albumnomae',nombreGe.author)
      //console.log('albumnomaennn',nombreGe.album_name)
      //localStorage.setItem("nameGenero",nombreGe);
      localStorage.setItem("album_name",album_name);
      localStorage.setItem("genre_name",genre_name);
      localStorage.setItem("author",author);
      localStorage.setItem("imageURL",imageURL);  
      localStorage.setItem('genre_id',genre_id);
    }

    //consulta para saber cuantas canciones tenemos 
    obtenerCanciones(id_albumes){

      this.AlbumImg.enviar(id_albumes)
   
      this.AlbumImg.enviar(id_albumes).subscribe((res) =>{ 
        const cuantos_canciones_tengo =res.length     
      
        //this.consulta(this.cancioSolicitud.length)
      console.log('cuantas canciones',cuantos_canciones_tengo);
      
      this.obtenercuantasCanciones(cuantos_canciones_tengo)
   
      });  

    }

    obtenercuantasCanciones(id){
    //  console.log('id_modi_cancion',id)
      localStorage.setItem('cuantos_canciones',id)
      return id
     // this.GenerosImg.updateCancione(id);
     }

}
