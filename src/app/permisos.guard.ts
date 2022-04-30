import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PermisosGuard implements CanActivate {
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
        
        this.router.navigate(['register']);
      }
      return isAuthenticated  ;
      

    
   
  }


  

 
}