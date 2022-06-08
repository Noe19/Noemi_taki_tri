import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { cancionSolicitud } from '../cancion.modal';
import { CancionService } from '../cancion.service';
import { Mp3Solicitud } from '../mp3.modal';

@Component({
  selector: 'app-show-canciones',
  templateUrl: './show-canciones.component.html',
  styleUrls: ['./show-canciones.component.css']
})
export class ShowCancionesComponent implements OnInit {
  public usuario: any;
  cancion:cancionSolicitud[]=[];
  imagenes:Mp3Solicitud[]=[];
 imgURL="../assets/imagenes/camera.png";
  file:any;
  public page:number=0;
  //generos:Generos[];
  public imagen:any;
  todoslascanciones:cancionSolicitud[];
 
 
  
  public url:any;
  
  public cancionesforms : FormGroup;
  
  constructor(private router:Router,private fb:FormBuilder,private cancionService:CancionService,private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.cancionService.getPostcanciones().subscribe((res) =>{
      this.imagen=res;
      
      this.todoslascanciones = res.map((e) =>{
        this.url=this.todoslascanciones
        console.log(this.url)
        console.log('url_cancion',this.todoslascanciones)
      
        return {
          
          id: e.payload.doc.id,      
          ...(e.payload.doc.data() as cancionSolicitud)
          
        };
       
       
      });
    
     
     
    });
 
   
  }

  eliminar_cancion(cancionSolicitud){
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
        this.cancionService.eliminar_canciones_total(cancionSolicitud);
        
      }
    })
  

  }

}
