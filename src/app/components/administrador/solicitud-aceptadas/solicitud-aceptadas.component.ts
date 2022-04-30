import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorService } from '../administrador.service';
import { Administrador } from '../administrador.model';
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
      });
      
    } catch (error) {
      alert("No se puedo conectar con la base de Datos ");
      
    }
  }

  cambiarpagina(e:PageEvent){
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
      
  }
// cambiar estado a no artista
  convertToArtist  (administrador) {
    this.administradorService.updateRol_no_artist(administrador);
    alert("usted ha cambia el rol correctamente");
  } catch (error) {

    alert("No se puedo acepta la solicitud , intente más luego"); 
  }

}
