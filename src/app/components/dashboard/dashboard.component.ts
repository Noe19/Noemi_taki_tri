import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


import { Perfil } from './perfil.model';
import { PerfilService } from '../perfil.service';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/service/auth.service';
import { NgLocaleLocalization } from '@angular/common';
import { MensajeSolicitud } from '../usuarios/solicitud/mensaje.modal';
import { IbaChart } from '../usuarios/dashboard-user/IbaChart.modal';
import { datos } from '../usuarios/dashboard-user/datos.modal';
import { SolicitudService } from '../usuarios/solicitud/solicitud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[AuthService],
  

})
export class DashboardComponent implements OnInit {
  Perfil: Perfil[]
  public usuario : any;
  perfilResf:any;
  MensajeSolicitud:MensajeSolicitud[]
  public roles_admin:any;
  public valor_aceptacion:any;

  //segundo ejemplo
  data: IbaChart[]=[];
  view: [number, number] = [590, 200];
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

 
  constructor(public afAuth :AngularFireAuth,private router : Router,private firestore :AngularFirestore,private solicitud:SolicitudService,private perfil :PerfilService) { 
    Object.assign(this, {datos })
  }

  ngOnInit(): void {
    this.data=datos
    this.usuario = localStorage.getItem('usuario')
    this.roles_admin = localStorage.getItem('roles')
    this.valor_aceptacion=localStorage.getItem('artista_aceptado');
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

///////////////




 




}
