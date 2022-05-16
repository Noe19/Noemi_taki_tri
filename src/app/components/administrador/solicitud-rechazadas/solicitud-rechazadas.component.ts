import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrador } from '../administrador.model';
import { AdministradorService } from '../administrador.service';
// import de las alertas
import Swal from 'sweetalert2';
@Component({
  selector: 'app-solicitud-rechazadas',
  templateUrl: './solicitud-rechazadas.component.html',
  styleUrls: ['./solicitud-rechazadas.component.css']
})
export class SolicitudRechazadasComponent implements OnInit {
  Administrador: Administrador[];
  pageSize=5;
  desde:number=0;
  hasta: number=5;
  public arreglo:any;
  public cantidad_solicitud_rechazadas:any;
  // alertas diseñadas 
  Swal = require('sweetalert2');
  constructor(private administradorService:AdministradorService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    try {
      this.administradorService.getPost_rechazadas().subscribe((res) =>{
        this.Administrador = res.map((e) =>{
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as Administrador)
          };
        });
        this.arreglo=this.Administrador.length
        localStorage.setItem('cantidad_rechazadas',this.arreglo)
        console.log(this.arreglo)
      });
      
    } catch (error) {
      alert("No se puedo conectar con la base de Datos ");
      
    }
    this.cantidad_solicitud_rechazadas=localStorage.getItem('cantidad_rechazadas');
  }

  cambiarpagina(e:PageEvent){
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
      
  }
// cambiar estado a no artista
  convertToArtist  (administrador) {
    this.administradorService.updateRol_rechazado(administrador);
    //alert("usted ha cambia el rol correctamente");
    Swal.fire({
      title: 'Acepta correctamente nuevamente al Artista',
      icon: 'success',     
      showCloseButton: true, 
      cancelButtonAriaLabel: 'Thumbs down',
    })
  } catch (error) {

    alert("No se puedo acepta la solicitud , intente más luego"); 
  }
  

}
