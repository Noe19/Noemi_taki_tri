import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrador } from './administrador.model';
import { AdministradorService } from './administrador.service';
//importanciones de Material

import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})



export class AdministradorComponent implements OnInit  {
  pageSize=5;
  desde:number=0;
  hasta: number=5;

  
 

// no tocar
  Administrador: Administrador[]
 
  constructor(private administradorService:AdministradorService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router) { }
 

  ngOnInit(): void {
   
    try {
      this.administradorService.getPost().subscribe((res) =>{
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
 

  convertToArtist  (administrador) {
    this.administradorService.updateRol(administrador);
    alert("usted ha cambia el rol correctamente");
  } catch (error) {

    alert("No se puedo acepta la solicitud , intente más luego"); 
  }
 
 



}
//material

