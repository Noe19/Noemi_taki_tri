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
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})



export class AdministradorComponent implements OnInit  {
  public hora:any;
 
  desde:number=0;
  hasta: number=5;
  public arreglo:any;
  public cantidad_de_solicitud:any;
  public usuario:any;
  public rechazar:"rechazado";
  public mensaje:any;
  public page:number=0;
  public search:string="";

 
 
  
  Swal = require('sweetalert2');
 

// no tocar
  Administrador: Administrador[]=[]
  
  constructor(private administradorService:AdministradorService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,private firestore :AngularFirestore) { }
 

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
       
    

      
      });
      
      
     //console.log('array')
    } catch (error) {
      alert("No se puedo conectar con la base de Datos ");
      
    }

  }
 
 

 

  convertToArtist  (administrador) {
    this.administradorService.updateRol(administrador);
    //alert("usted ha cambia el rol correctamente");
    Swal.fire({
      title: 'Aceptó correctamente al Artista , ahora ya es parte de TakiTri',
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
        inputPlaceholder: 'Ecribe la razón',
        inputAttributes: {
          'aria-label': 'Ecribe la razón',
        },
        showCancelButton: true
      })
      
      if (text) {


        Swal.fire(text)
       //administrador.razon==text;
      
        this.mensaje=text
       console.log('hola',administrador.razon,text)
     
        this.administradorService.updateRol_no_artist(administrador,text)
        
    
        
        const  id = this.firestore.createId(); 
        this.hora=new Date().toLocaleDateString();;
        console.log('usuario_mensaje',administrador.artista_id)
        this.firestore.collection("mensaje").doc(id).set({"id_usuario":administrador.artista_id,"mensaje":text,"hora": this.hora})
        Swal.fire({
          title: 'Rechazo correctamente al Artista , no es parte de TakiTri',
          icon: 'success',     
          showCloseButton: true, 
          cancelButtonAriaLabel: 'Thumbs down',
        })
      }
     
     // this.administradorService.updateRol_no_artist(administrador);
      //alert("usted ha cambia el rol correctamente");

      
      
    }

 
   // buscador 
   onSearchMensaje(search:string){
    this.page=0;
      this.search=search;
      //console.log(search);
  }

//paginas de solicitud
siguiente_pagina_solicitud(){
  this.page+=5;
 }

 atras_pagina_Solicitud(){
   if(this.page>0){
    this.page-=5;
   }
  

 }
 
 



}
//material

