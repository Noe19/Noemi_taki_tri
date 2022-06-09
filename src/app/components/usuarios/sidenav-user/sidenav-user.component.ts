import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Sidenav } from 'src/app/sidenav/sidenav.model';
import { PerfilService } from '../../perfil.service';

@Component({
  selector: 'app-sidenav-user',
  templateUrl: './sidenav-user.component.html',
  styleUrls: ['./sidenav-user.component.css']
})
export class SidenavUserComponent implements OnInit {

public usuario : any;
sidenav: Sidenav []
//public Mensaje:any;
public roles_admin:any;

perfilResf:any;
public rol_admin:any;
public cantidad_aprobadas:any;
public cantidad_de_solicitud:any;
public cantidad_solicitud_rechazadas:any;
constructor(private perfilService:PerfilService,public afAuth :AngularFireAuth,private router : Router,private firestore :AngularFirestore) { 
  this.usuario = localStorage.getItem('usuario')
this.roles_admin=localStorage.getItem('roles')
  console.log('donde estoy',this.roles_admin)
}

  ngOnInit(): void {
   
    this.usuario = localStorage.getItem('usuario');
    this.rol_admin = localStorage.getItem('roles');
    this.cantidad_aprobadas=localStorage.getItem('cantidad_aprobadas');
    this.cantidad_de_solicitud=localStorage.getItem('cantidad');
    this.cantidad_solicitud_rechazadas=localStorage.getItem('cantidad_rechazadas');
  }

  async salir(){
    //limpiando de la cache
  // localStorage.clear();
   localStorage.clear();
   
   //this.auth.logout();
   await this.afAuth.signOut();
   this.router.navigate(['/register']);   
   console.log('saliendo_inicio123' ,this.afAuth.signOut()) ;
   console.log('usuario que salio',this.usuario)
   console.log('rol',this.rol_admin)
  
  }

}
