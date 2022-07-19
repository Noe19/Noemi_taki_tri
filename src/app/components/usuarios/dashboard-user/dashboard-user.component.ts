import { Component, OnInit,Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Administrador } from '../../administrador/administrador.model';
import { AdministradorService } from '../../administrador/administrador.service';
import { Perfil } from '../../dashboard/perfil.model';
import { PerfilService } from '../../perfil.service';
import { GenerosComponent } from '../generos/generos.component';
import { GenerosService } from '../generos/generos.service';
import { MensajeSolicitud } from '../solicitud/mensaje.modal';
import { SolicitudService } from '../solicitud/solicitud.service';

// importaciones de barras 


@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css'],
  providers:[AuthService],
})
export class DashboardUserComponent implements OnInit {
  // componente hijo

  Perfil: Perfil[]
  public usuario : any;
  perfilResf:any;
  MensajeSolicitud:MensajeSolicitud[]
  public roles_admin:any;
  public valor_aceptacion:any;
  Administrador: Administrador[];
  public arreglos:any;
  public permiso_artista:any;
  //segundo ejemplo
  



 
  constructor(public afAuth :AngularFireAuth,private router : Router,private firestore :AngularFirestore,private solicitud:SolicitudService,private perfil :PerfilService,private Aceptar:AdministradorService) { 
   
  }

  ngOnInit(): void {
   
    this.usuario = localStorage.getItem('usuario')
    this.roles_admin = localStorage.getItem('roles')
    this.valor_aceptacion=localStorage.getItem('artista_aceptado');
    /////////////// Permisos del artista ////////////////////////////
    /*
    this.Aceptar.getPost_artistas_guard_aceptados().subscribe((res) =>{
      this.Administrador = res.map((e) =>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Administrador)
        };
      });

      this.arreglos=this.Administrador.length;
      localStorage.setItem('permiso',this.arreglos) 
      //console.log('guardian',this.permiso_artista=localStorage.getItem('permiso'))
     
    } );
    */
  }
  // salir de usuario
  async salir(){
   
    //limpiando de la cache
  // localStorage.clear();
   localStorage.clear();
   //this.auth.logout();
   await this.afAuth.signOut();
   this.router.navigate(['/register']);   
   console.log('saliendo_inicio123' ,this.afAuth.signOut()) ;
   console.log('usuario que salio',this.usuario)
   
   
  
 }

 


//
















}
