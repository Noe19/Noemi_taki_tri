import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoUsuarioGuard implements CanActivate {
  public usuario:any;
  public roles_:any;
constructor (
private afAuth : AngularFireAuth,private router : Router
){}
 async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Promise<boolean | UrlTree> {
      this.usuario = localStorage.getItem('usuario')
      
      const user = await this.afAuth.currentUser;
     const isAuthenticated = this.usuario? true:false;

     // Este Guard es para ver el home sobre nosotros y mas que para ello no deben estar autenticado
     // const rol = this.angularfirstore.collection("artist",ref => ref.where('rol', '==', 'artista')) ? true:false;
      if(!isAuthenticated ){ 
              
      return true;
      }
     
      this.roles_=localStorage.getItem('roles')
         
    
// Se valida se es artista o administrador para que pueda navegar en las diferentes paginas
     if(this.roles_=="artista" ){
       this.router.navigate(["/dashboard-user"]);
       return false;
     }else if(this.roles_=="administrador"  ){
       this.router.navigate(['/dashboard']); 
       return false;
     }
    
      return false;
     
      

    
   
  }
}
