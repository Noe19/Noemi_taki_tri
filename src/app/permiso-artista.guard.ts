import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, GuardsCheckStart, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AnyNaptrRecord } from 'dns';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { Administrador } from './components/administrador/administrador.model';
import { AdministradorService } from './components/administrador/administrador.service';

import { PerfilService } from './components/perfil.service';
import { SolicitudService } from './components/usuarios/solicitud/solicitud.service';

@Injectable({
  providedIn: 'root'
})
export class PermisoArtistaGuard implements CanActivate {
  public roles_artista:any;
  public usuario:any;
  public permiso:any;
  public permiso_artista_rol:any;
  perfilResf:any;
  public permiso_artista:any;
  public arreglos:any;
  public rol_artista="artist";
  Administrador: Administrador[]
  constructor (
    private roles : AngularFirestore,private router : Router,private activeRoute: ActivatedRoute,private Aceptar:AdministradorService
  ){}
  public aceptacion:any;
  public valor_aceptacion='0';
  canActivate(
  
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

// Este modulo es para dar permiso si ya tiene la solicitud aprobada 


////////////////////////////////////////////////////////////////////////////////////
    this.Aceptar.getPost_artistas_guard_aceptados().subscribe((res) =>{
      this.Administrador = res.map((e) =>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Administrador)
        };
      });

      this.arreglos=this.Administrador.length;
      localStorage.setItem('permiso',this.arreglos) 
      console.log('guardian',this.permiso_artista=localStorage.getItem('permiso'))

     
     
      
    } );

this.permiso_artista=localStorage.getItem('permiso')
 
if(this.permiso_artista>0){
     
 

     return true;
     

  }
  Swal.fire({
    icon: 'warning',
    title: 'Envia solicitud para ser parte de TakiTri',
    confirmButtonText: 'Aceptar',
    allowOutsideClick: false,

  })
  this.router.navigate(['/solicitud'])
  return false; 

    
   
  
}
}
