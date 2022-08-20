import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { PerfilService } from '../components/perfil.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosartistaGuard implements CanActivate {
  public roles_admin:any;
  public usuario:any;
  perfilResf:any;
  public rol_valido:any;
  public resultado:any;
  angularfirestore: any;
  constructor (
    private roles : AngularFirestore,private router : Router,private activeRoute: ActivatedRoute,private perfilService :PerfilService 
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      this.roles_admin=localStorage.getItem('roles')
      //console.log('verificar',this.roles_admin)
     
     
      if( this.roles_admin=='artista'){

        return true;
      //  this.router.navigate(['/dashboard'])

      }
      Swal.fire({
        icon: 'error',
        title: 'Tu no eres Artista',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
    
      })
      return false






  }
  
}
