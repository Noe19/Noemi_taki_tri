import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Administrador } from './components/administrador/administrador.model';
import { AdministradorService } from './components/administrador/administrador.service';

@Injectable({
  providedIn: 'root'
})
export class ButtonSolicitudGuard implements CanActivate {
  public estado_solicitud:any;
  Administrador: Administrador[];
  public arreglos:any;
  constructor (
   private router : Router,private activeRoute: ActivatedRoute, private Admin:AdministradorService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  // Este modulo es para que puedan entrar a la solicitud 
     // this.estado_solicitud=localStorage.getItem('artista_aceptado');
      //console.log(this.estado_solicitud)

this.Admin.getPost_artistas_guard_aceptados().subscribe((res)=>{
  this.Administrador = res.map((e) =>{
    return {
      id: e.payload.doc.id,
      ...(e.payload.doc.data() as Administrador)
    };
  });
  this.arreglos=this.Administrador.length;
 // console.log('arreglos_guard',this.arreglos);
  

})

 
if(this.arreglos>0){
     
  Swal.fire({
    icon: 'warning',
    title: 'Tu ya  eres parte de Taki-Tri, tu solicitud fue aceptada',
    confirmButtonText: 'Aceptar',
    allowOutsideClick: false,

  })

     return false;
     

  }
  Swal.fire({
    icon: 'warning',
    title: 'Envia solicitud para ser parte de taki-tri',
    confirmButtonText: 'Aceptar',
    allowOutsideClick: false,

  })
 // this.router.navigate(['/solicitud'])
  return true; 
     
     
  }
  


}
