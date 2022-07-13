import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImagenesGeneros } from './create-generos/imagenesGeneros.modal';
import { Generos } from './generos.modal';
import { GenerosService } from './generos.service';
import { AlbumesService } from '../Albumes/albumes.service';
import Swal from 'sweetalert2';
import { Albumes } from '../Albumes/create-albumes/albumes.modal';
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

 
  //generos:Generos[];
  public imagen:any;
  todoslosgeneros:Generos[];
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
  
  //variable para controlar el storge
  private control_genero:any;

  constructor(private router:Router,private fb:FormBuilder,private GenerosImg:GenerosService,private albumService:AlbumesService) {
    this.generosforms=this.fb.group({
  
      Genero_nuevo:['',[Validators.required]],
      artista_id:[localStorage.getItem('usuario'),[Validators.required]],
      referencia:[''] 
    })
   }

  ngOnInit(): void {
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
    
    Swal.fire({
      title: 'Estas seguro en eliminar ?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Estoy seguro,eliminar!'
    }).then((result) => {
      console.log('cuantos generos tengo',this.todoslosgeneros.length)
      if (result.isConfirmed ) {
        
        Swal.fire(
          'Eliminado!',
          'Informacion eliminado correctamente',
          'success'
        )
        this.GenerosImg.eliminar_generos_total(Generos);
        
      }
    })
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
      this.page+=6;
     }
  
     atras_pagina_mensaje_solicitud(){
       if(this.page>0){
        this.page-=6;
       }
      
  
     }


}
