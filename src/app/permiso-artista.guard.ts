import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, GuardsCheckStart, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AnyNaptrRecord } from 'dns';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Z_FULL_FLUSH } from 'zlib';
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
      /*
      const usuario_ingresado =  this.activeRoute.snapshot.paramMap.get(this.usuario)
      this.usuario = localStorage.getItem('usuario')
      this.roles_artista=localStorage.getItem('roles')
      const id = this.activeRoute.snapshot.paramMap.get(this.usuario)

this.soliService.getPostbyId(this.usuario).subscribe( res =>{
  
  this.perfilResf = res;
 // console.log('permiso', this.perfilRef.name)
  //if(this.perfilRef.rol=='administrador'){
    
    this.permiso = this.perfilResf.rol
    console.log('permiso', this.perfilResf.id_usuario);
    localStorage.setItem('artista_rol',this.perfilResf.rol)
})
this.permiso_artista_rol=localStorage.getItem('artista_rol');
 console.log('artistarol',this.permiso_artista_rol==this.rol_artista)
      if( this.permiso_artista_rol==this.rol_artista){

        alert('usted es miembro de taki-tri');
        return true;
      
       

      }

      alert('por favor enviar un solicitud para que sea parte de taki-tri');
      this.router.navigate(['/dashboard-user'])
      return true



     
  }
  */


    this.Aceptar.getPost_artistas_guard_aceptados().subscribe((res) =>{
      this.Administrador = res.map((e) =>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Administrador)
        };
      });

      this.arreglos=this.Administrador.length;
      //para saber si exiten
     
     
      
    } );

   // this.valor_aceptacion=localStorage.getItem('artista_aceptado');
  //  console.log('valor',this.valor_aceptacion)
 /*   
    if(this.valor_aceptacion==='true'){
 
      return true;
  
    }
    else{
      
      Swal.fire({
        icon: 'warning',
        title: 'Envia tu solicitud para tener acceso completo de Taki-Tri',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,

      })
      this.router.navigate(['/dashboard-user'])
      return false
    }
*/

 
if(this.arreglos>0){
     
 

     return true;
     

  }
  Swal.fire({
    icon: 'warning',
    title: 'Envia solicitud para ser parte de taki-tri',
    confirmButtonText: 'Aceptar',
    allowOutsideClick: false,

  })
  this.router.navigate(['/solicitud'])
  return false; 

    
   
  
}
}
