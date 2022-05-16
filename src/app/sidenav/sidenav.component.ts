import { Component, OnInit } from '@angular/core';
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
  //mensaje que se enviaran dependiendo que Rol es 
  //mostrar_enviar_solicitud:String=""
  //mostrar_solicitud_Nuevas:String=""
  //mostrar_solicitud_Aprobadas:String=""
  //mostrar_solicitud_Rechazadas:String=""
  //otro intento
 
  constructor() { 
    this.usuario = localStorage.getItem('usuario')
  this.roles_admin=localStorage.getItem('roles')
    console.log('donde estoy',this.roles_admin)
  }
  

  ngOnInit(): void {

    
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

}