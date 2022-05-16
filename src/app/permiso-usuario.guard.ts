import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoUsuarioGuard implements CanActivate {
  public usuario:any;
constructor (
private afAuth : AngularFireAuth,private router : Router
){}
 async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Promise<boolean | UrlTree> {
      this.usuario = localStorage.getItem('usuario')
      const user = await this.afAuth.currentUser;
     const isAuthenticated = this.usuario? true:false;
     // const rol = this.angularfirstore.collection("artist",ref => ref.where('rol', '==', 'artista')) ? true:false;
      if(!isAuthenticated ){       
      return true;
      }
      return false;
      

    
   
  }
}
