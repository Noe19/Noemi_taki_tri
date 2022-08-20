import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImagenesGeneros } from './create-generos/imagenesGeneros.modal';
import { Generos } from './generos.modal';
import { GenerosService } from './generos.service';
import { AlbumesService } from '../Albumes/albumes.service';
import Swal from 'sweetalert2';
import { Albumes } from '../Albumes/create-albumes/albumes.modal';
import { ShowartistComponent } from '../perfil-artist/show-artist/show-artist.component';
import { ShowCancionesComponent } from '../canciones/show-canciones/show-canciones.component';
import { CancionService } from '../canciones/cancion.service';
import { cancionSolicitud } from '../canciones/cancion.modal';
import { update } from 'firebase/database';
@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.css'],
  providers:[AlbumesService]
})
export class GenerosComponent implements OnInit {
  public usuario: any;
  generos:Generos[]=[];
  imagenes:ImagenesGeneros[]=[];
 imgURL="../assets/imagenes/camera.png";
  file:any;
  public length:number;

  public v:any;
  //public nombre author;
  public nomauthor :any;

 
  //generos:Generos[];
  public imagen:any;
  todoslosgeneros:Generos[]=[];
 //buscador
 public page:number=0;
 public search:string="";
 
  public url:any;
  public data:Generos[]
  public generosforms : FormGroup;
  public cuantos_generos_tengo:any;
  public mio:any;
  //Albumes
  public Albumesforms : FormGroup;
  todoslosalbumes:Albumes[];

  
  //variable para controlar las canciones
  public cancionesid: string[] = [];
   cancioSolicitud:cancionSolicitud[];
  private control_canciones:any;

  constructor(private router:Router,private fb:FormBuilder,private GenerosImg:GenerosService,private albumService:AlbumesService,private cancion :CancionService) {
    
    this.generosforms=this.fb.group({
  
      Genero_nuevo:['',[Validators.required]],
      artista_id:[localStorage.getItem('usuario'),[Validators.required]],
      referencia:[''] 
    })
   }

  ngOnInit(): void {  

/////////////////////////////////
    this.usuario = localStorage.getItem('usuario')
      this.GenerosImg.getPostgeneros().subscribe((res) =>{
        this.imagen=res;
       
        this.todoslosgeneros = res.map((e) =>{
      
          this.url=this.todoslosgeneros
         
      
          return {
            
            id: e.payload.doc.id,      
            ...(e.payload.doc.data() as Generos)
            
          };
         
         
        });
      
     //  localStorage.setItem('cuantos',this.cuantos_generos_tengo)
   
       
      });
    

  }

//crear album pasar el genero que corresponde
  obtenerGenero(nombreGe){
    console.log('generosnomae',nombreGe)
    localStorage.setItem("nameGenero",nombreGe);

  }

public todos(){
  this.data= this.todoslosgeneros
  console.log('todos los datos',this.data)
  
}

  // // buscador 
   onSearchMensaje(search:string){
    this.page=0;
      this.search=search;
      //console.log(search);
  }



  eliminar_genero(Generos){
   
    //  console.log('cuantos generos tengo',this.todoslosgeneros.length)
     
       
        this.GenerosImg.eliminar_generos_total(Generos);
        
     
  
   // this.GenerosImg.eliminar_generos_total(Generos);

  }
  limpiarform(){
    this.generosforms.reset();
    this.imgURL="../assets/imagenes/camera.png";
  }

  // pasar datos a Album
  ge(Generos){
    console.log('genero,pasado',Generos.id)

  }
    // paginacion de paginas
    siguiente_pagina_mensaje_solicitud(){
      this.page+=3;
     }
  
     atras_pagina_mensaje_solicitud(){
       if(this.page>0){
        this.page-=3;
       }
      
  
     }
     //recursividad
     recursividad(){
      const ultimo = localStorage.getItem('id_genero_actualizar');
      
    //this.GenerosImg.updateCancione(ultimo);
   
     
    }   

     //hacer consulta
     consulta(){
      
     for (let i = 0; i < this.cancioSolicitud.length; i++) {
       // this.recursividad(this.control_canciones,this.cancioSolicitud.length)             
        this.cancionesid.push(this.cancioSolicitud[i].id)
        this.control_canciones = this.cancioSolicitud[i].id
        console.log("id_unico....: ",this.control_canciones); 
       // localStorage.setItem('id_genero_actualizar',this.control_canciones) ;
     }

       this.recursividad()
    
     }

     modificar(id){
      console.log('id_modi',id)
      localStorage.setItem('cuantos',id)
      return id
     // this.GenerosImg.updateCancione(id);
     }


     //eliminar comprobar
     obtenercanciones(id_genero){
      
      this.GenerosImg.enviar(id_genero)
   
      this.GenerosImg.enviar(id_genero).subscribe((res) =>{ 
        const cuantos =res.length     
      
        //this.consulta(this.cancioSolicitud.length)
      console.log('cuantas albumes',cuantos);
      
      this.modificar(cuantos)
   
      });  
 
      

     }

    

     
  


}
