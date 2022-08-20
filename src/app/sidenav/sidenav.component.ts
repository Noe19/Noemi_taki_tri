import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { PerfilService } from '../components/perfil.service';
import { PerfilComponent } from '../components/perfil/perfil.component';
import { PerfilAdmin } from './perfil.modal';
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
  perfil:PerfilAdmin[]=[];

 public perfilResf:any;
  public rol_admin:any;
  public cantidad_aprobadas:any;
 public cantidad_de_solicitud:any;
 public cantidad_solicitud_rechazadas:any;
 
  public fotoperfil : FormGroup;
  public imagen:any;

  public name:any;
  public imagen_global:any;
  public imagen_suplente:any;
  public mostrar_admin:any;
constructor(private activeRoute: ActivatedRoute,private fb:FormBuilder,private perfilService:PerfilService,public afAuth :AngularFireAuth,private router : Router) { 
 

}

  ngOnInit(): void {

  //  this.imagen_global="https://images.pexels.com/photos/1916824/pexels-photo-1916824.jpeg?auto=compress&cs=tinysrgb&w=600";

     this.imagen_suplente=localStorage.getItem('perfil_foto_admin')

     this.mostrar_admin =0
    if(this.imagen_suplente){
      this.mostrar_admin=1
     
    }
 
    const id = this.activeRoute.snapshot.paramMap.get(this.usuario)
    this.usuario = localStorage.getItem('usuario');
    this.perfilService.getPostbyId(this.usuario).subscribe( res =>{ 
      this.perfilResf= res; 
         
        this.imagen = this.perfilResf.imagen
     
        this.name=this.perfilResf.name
        console.log('this.ima',this.imagen)
    
        
    })

   
    
}


  

async salir(){

 await this.afAuth.signOut();
 this.router.navigate(['/home']);   
 console.log('saliendo_inicio123' ,this.afAuth.signOut()) ;
 console.log('usuario que salio',this.usuario)
 console.log('rol',this.rol_admin)
 localStorage.clear();
}

refresh(): void {
  localStorage.clear();
   window.location.reload(); }
}