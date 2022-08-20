import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdministradorService } from './components/administrador/administrador.service';
import { PerfilService } from './components/perfil.service';

@Injectable({
  providedIn: 'root'
})
export class PermisosAdministradorGuard implements CanActivate {
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
      this.usuario = localStorage.getItem('usuario')

   
      
      this.roles_admin=localStorage.getItem('roles')
      console.log('verificar',this.roles_admin)
     
     
      if( this.roles_admin=='administrador'){

        return true;
      //  this.router.navigate(['/dashboard'])

      }
      return false
    
  }

  
}
