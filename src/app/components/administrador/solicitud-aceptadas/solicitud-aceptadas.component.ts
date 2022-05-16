import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorService } from '../administrador.service';
import { Administrador } from '../administrador.model';
// import de las alertas
import Swal from 'sweetalert2';
//importanciones de Material paginacion
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-solicitud-aceptadas',
  templateUrl: './solicitud-aceptadas.component.html',
  styleUrls: ['./solicitud-aceptadas.component.css']
})
export class SolicitudAceptadasComponent implements OnInit {
  pageSize=5;
  desde:number=0;
  hasta: number=5;
  public arreglo:any;
  public cantidad_aprobadas:any;
  // alertas diseñadas 
  Swal = require('sweetalert2');
  Administrador: Administrador[]
  constructor(private administradorService:AdministradorService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {


    try {
      this.administradorService.getPost_no_artista().subscribe((res) =>{
        this.Administrador = res.map((e) =>{
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as Administrador)
          };
        });
        this.arreglo=this.Administrador.length;
        localStorage.setItem('cantidad_aprobadas',this.arreglo);
      });
      
    } catch (error) {
      alert("No se puedo conectar con la base de Datos ");
      
    }
    this.cantidad_aprobadas=localStorage.getItem('cantidad_aprobadas');

  }

  cambiarpagina(e:PageEvent){
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
      
  }
// cambiar estado a no artista
  convertToArtist  (administrador) {
    this.administradorService.updateRol_no_artist(administrador);
    //alert("usted ha cambia el rol correctamente");
    Swal.fire({
      title: 'Rechazo correctamente al Artista ,ya no es parte de Taki-Tri',
      icon: 'success',     
      showCloseButton: true, 
      cancelButtonAriaLabel: 'Thumbs down',
    })
  } catch (error) {

    alert("No se puedo acepta la solicitud , intente más luego"); 
  }

}
