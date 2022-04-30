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
  public Mensaje:any;
  public roles_admin:any;
  //mensaje que se enviaran dependiendo que Rol es 
  mostrar_enviar_solicitud:String="Solicitud"
  mostrar_solicitud_Nuevas:String="Solicitud Nuevas"
  mostrar_solicitud_Aprobadas:String="Solicitud Aceptadas"
  mostrar_solicitud_Rechazadas:String="Solicitud Rechazada"
  constructor() { }
  

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario')
    this.roles_admin=localStorage.getItem('roles')
    console.log('donde estoy',this.roles_admin)
    // los diferentes rutas
  

    // rutas dependiendo donde estoy 
    if(this.roles_admin=='artista'){
      this.mostrar_enviar_solicitud="Enviar Solicitud Usuario"
    
      this.mostrar_solicitud_Nuevas=" "
      this.mostrar_solicitud_Aprobadas=" "
      this.mostrar_solicitud_Rechazadas=" "

    }
    else{
      
      this.mostrar_solicitud_Nuevas="Solicitud Nuevas "
      this.mostrar_solicitud_Aprobadas=" Solicitud Aprobadas"
      this.mostrar_solicitud_Rechazadas="Solicitud Rechazadas "
      this.mostrar_enviar_solicitud=" "
    }
  }

}
