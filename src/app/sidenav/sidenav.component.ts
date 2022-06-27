import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  public fotoperfil : FormGroup;
  public imagen:any;

  public name:any;
constructor(private activeRoute: ActivatedRoute,private fb:FormBuilder,private perfilService:PerfilService,public afAuth :AngularFireAuth,private router : Router) { 
  this.fotoperfil = this.fb.group({   
    imagen:[''],
    name: [''],
 
  })

}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get(this.usuario)
    this.usuario = localStorage.getItem('usuario');
    //console.log('ggggdsss',this.usuario)
    this.perfilService.getPostbyId(this.usuario).subscribe( res =>{
  
      this.perfilResf = res;
      //console.log('permiso', this.perfilRef.name)
      //if(this.perfilRef.rol=='administrador'){
        
        this.imagen = this.perfilResf.imagen
        this.name=this.perfilResf.name
        console.log('this.ima',this.imagen)
    
    
     // }
    })

   
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