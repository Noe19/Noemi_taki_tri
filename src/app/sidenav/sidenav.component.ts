import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { PerfilService } from '../components/perfil.service';
import { Sidenav } from './sidenav.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public usuario : any;
  sidenav: Sidenav []
  //public Mensaje:any;
  public roles_admin:any;

  perfilResf:any;
  public rol_admin:any;
  public cantidad_aprobadas:any;
 public cantidad_de_solicitud:any;
 public cantidad_solicitud_rechazadas:any;
  //mensaje que se enviaran dependiendo que Rol es 
  //mostrar_enviar_solicitud:String=""
  //mostrar_solicitud_Nuevas:String=""
  //mostrar_solicitud_Aprobadas:String=""
  //mostrar_solicitud_Rechazadas:String=""
  //otro intento
 
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
    // los diferentes rutas
  

    // rutas dependiendo donde estoy 
    /*
    if(this.roles_admin=='artista'){
     // window.location.reload();

      this.mostrar_enviar_solicitud="funciona"
    
      this.mostrar_solicitud_Nuevas=" "
      this.mostrar_solicitud_Aprobadas=" "
      this.mostrar_solicitud_Rechazadas=" "

    }
    if (this.roles_admin=='administrador') {
      //window.location.reload();
      this.mostrar_solicitud_Nuevas="Solicitud Nuevas "
      this.mostrar_solicitud_Aprobadas=" Solicitud Aprobadas"
      this.mostrar_solicitud_Rechazadas="Solicitud Rechazadas "
      this.mostrar_enviar_solicitud=" jijifunciona"
    } else {
      this.mostrar_solicitud_Nuevas=" "
      this.mostrar_solicitud_Aprobadas=" "
      this.mostrar_solicitud_Rechazadas=""
      this.mostrar_enviar_solicitud="funciona1 "
      
    }
  }
*/
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