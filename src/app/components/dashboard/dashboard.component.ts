import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


import { Perfil } from './perfil.model';
import { PerfilService } from '../perfil.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  

})
export class DashboardComponent implements OnInit {
  Perfil: Perfil[]
  public usuario : any;
  perfilResf:any;
 
 //public usuario_nuevo :any;
  

  constructor(private perfilService:PerfilService,public afAuth :AngularFireAuth,private router : Router,private firestore :AngularFirestore) { }
  ngOnInit(): void {
    //obtener el dato getItem
    this.usuario = localStorage.getItem('usuario')
    
    //this.usuario_nuevo=localStorage.getItem('usuario_nuevo')
    
  }
  
  salir(){
    //limpiando de la cache
   localStorage.clear();
   this.router.navigate(['/home']);   
   console.log('saliendo_inicio' ) ;
   return this.afAuth.signOut();
   
  
 }
 ingresar(){
   this.firestore.collection("usuario").add({"email":this.usuario = localStorage.getItem('usuario')}).then(()=>{
    alert("usuario ingresado con exito");
   }).catch(err =>{
     console.log(err)

   })

 }

 




}
