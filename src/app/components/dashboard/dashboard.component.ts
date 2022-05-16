import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


import { Perfil } from './perfil.model';
import { PerfilService } from '../perfil.service';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/service/auth.service';
import { NgLocaleLocalization } from '@angular/common';

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
  public rol_admin:any;
  public cantidad_aprobadas:any;
 public cantidad_de_solicitud:any;
 public cantidad_solicitud_rechazadas:any;
 //public usuario_nuevo :any;
 // nuevo intento sobre la navegacion

/*
 mostrar_enviar_solicitud:String=""
 mostrar_solicitud_Nuevas:String=""
 mostrar_solicitud_Aprobadas:String=""
 mostrar_solicitud_Rechazadas:String=""
*/

 // termino

  constructor(private perfilService:PerfilService,public afAuth :AngularFireAuth,private router : Router,private firestore :AngularFirestore) { }
  ngOnInit(): void {
    //obtener el dato getItem
 
    this.usuario = localStorage.getItem('usuario');
    this.rol_admin = localStorage.getItem('roles');
    this.cantidad_aprobadas=localStorage.getItem('cantidad_aprobadas');
    this.cantidad_de_solicitud=localStorage.getItem('cantidad');
    this.cantidad_solicitud_rechazadas=localStorage.getItem('cantidad_rechazadas');
    
    //this.usuario_nuevo=localStorage.getItem('usuario_nuevo')






    
 
    
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
 /*
 ingresar(){
   this.firestore.collection("usuario").add({"email":this.usuario = localStorage.getItem('usuario')}).then(()=>{
    alert("usuario ingresado con exito");
   }).catch(err =>{
     console.log(err)

   })

 }
*/
 




}
