import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrador } from './administrador.model';
import { AdministradorService } from './administrador.service';
//importanciones de Material
import Swal from 'sweetalert2';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})



export class AdministradorComponent implements OnInit  {
  pageSize=5;
  desde:number=0;
  hasta: number=5;
  public arreglo:any;
  public cantidad_de_solicitud:any;


 
 
  
  Swal = require('sweetalert2');
 

// no tocar
  Administrador: Administrador[]
  
  constructor(private administradorService:AdministradorService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router) { }
 

  ngOnInit(): void {
   
    try {
      this.administradorService.getPostsolicitud().subscribe((res) =>{
        
        this.Administrador = res.map((e) =>{
          return {
          
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as Administrador)
          };
         
        });
        this.arreglo=this.Administrador.length
       localStorage.setItem('cantidad',this.arreglo);
       //this.cantidad_de_solicitud=localStorage.getItem('cantidad')
      // console.log('ttt',this.cantidad_de_solicitud)

      
      });
      
      
     //console.log('array')
    } catch (error) {
      alert("No se puedo conectar con la base de Datos ");
      
    }

    this.cantidad_de_solicitud=localStorage.getItem('cantidad');
    console.log('cantidad',this.cantidad_de_solicitud) 
  }
  //this.cantidad_de_solicitud=localStorage.getItem('cantidad');
    
      
     

  //cantidad_de_solicitud:number=localStorage.getItem('cantidad_de_solicitud');
 
  cambiarpagina(e:PageEvent){
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
      
  }
 

  convertToArtist  (administrador) {
    this.administradorService.updateRol(administrador);
    //alert("usted ha cambia el rol correctamente");
    Swal.fire({
      title: 'Aceptó correctamente al Artista , ahora ya es parte de Taki-Tri',
      icon: 'success',     
      showCloseButton: true, 
      cancelButtonAriaLabel: 'Thumbs down',
    })
   
  } catch (error) {

    alert("No se puedo acepta la solicitud , intente más luego"); 
  }


    //rechazar
     async convertToArtist_rechazado (administrador) {
      const { value: text } = await Swal.fire({
        input: 'textarea',
        inputLabel: '¿Por qué no aceptas al usuario artista?',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      })
      
      if (text) {
        Swal.fire(text)
        this.administradorService.updateRol_no_artist(administrador);
        Swal.fire({
          title: 'Rechazo correctamente al Artista , no es parte de Taki-Tri',
          icon: 'success',     
          showCloseButton: true, 
          cancelButtonAriaLabel: 'Thumbs down',
        })
      }
     
     // this.administradorService.updateRol_no_artist(administrador);
      //alert("usted ha cambia el rol correctamente");
      
    }

 



 
 



}
//material

