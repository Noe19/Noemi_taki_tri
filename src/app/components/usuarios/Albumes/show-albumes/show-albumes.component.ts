import { Component, OnInit } from '@angular/core';
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
  public usuario: any;
  Albumes:Albumes[]=[];
  imagenes:ImagenesAlbumes[]=[];
 imgURL="../assets/imagenes/camera.png";
  file:any;
 
  //generos:Generos[];
  public imagen:any;
  todoslosalbumes:Albumes[];
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
    Swal.fire({
      title: 'Estas seguro en eliminar ?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Estoy seguro,eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire(
          'Eliminado!',
          'Informacion eliminado correctamente',
          'success'
        )
        this.AlbumImg.eliminar_generos_total(Albumes);
        
      }
    })
  

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
 

}
