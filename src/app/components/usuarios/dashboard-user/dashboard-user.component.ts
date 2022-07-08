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
import { datos } from './datos.modal';
import { IbaChart } from './IbaChart.modal';
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
  data: IbaChart[]=[];
  view: [number, number] = [400, 200];
  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  }

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';

 
  constructor(public afAuth :AngularFireAuth,private router : Router,private firestore :AngularFirestore,private solicitud:SolicitudService,private perfil :PerfilService,private Aceptar:AdministradorService) { 
    Object.assign(this, {datos })
  }

  ngOnInit(): void {
    this.data=datos
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
view3: [number, number] = [550, 300];
view1: [number, number] = [450, 300];
// options

showLabels: boolean = true;
isDoughnut: boolean = false;



get single() {
  return this.perfil.countryData;
}

get single1(){
  return this.perfil.countryData1;
}


onSelect(data: any): void {
  console.log('Item clicked', JSON.parse(JSON.stringify(data)));
}

onActivate(data: any): void {
  console.log('Activate', JSON.parse(JSON.stringify(data)));
}

onDeactivate(data: any): void {
  console.log('Deactivate', JSON.parse(JSON.stringify(data)));
}








}
