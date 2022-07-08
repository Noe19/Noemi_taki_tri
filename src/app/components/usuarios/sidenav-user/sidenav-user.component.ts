import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Sidenav } from 'src/app/sidenav/sidenav.model';
import { PerfilService } from '../../perfil.service';
import { imagen } from './imagen.modal';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-sidenav-user',
  templateUrl: './sidenav-user.component.html',
  styleUrls: ['./sidenav-user.component.css']
})
export class SidenavUserComponent implements OnInit {
  perfilRef:any;
public usuario : any;
sidenav: Sidenav []
//public Mensaje:any;
public roles_admin:any;
todos_perfil_imagen:imagen[]=[];
public fotoperfil : FormGroup;
public imagen:any;
perfilResf:any;
public name:any;
public rol_admin:any;
public cantidad_aprobadas:any;
public cantidad_de_solicitud:any;
public cantidad_solicitud_rechazadas:any;
public permiso_artista:any;
public coincidencia_encontrada:any;
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
  
      this.perfilRef = res;
      //console.log('permiso', this.perfilRef.name)
      //if(this.perfilRef.rol=='administrador'){
        
        this.imagen = this.perfilRef.imagen
        this.name=this.perfilRef.name
        console.log('this.ima',this.imagen)
    
    
     // }
    })

   
  this.rol_admin = localStorage.getItem('roles');
  //this.cantidad_aprobadas=localStorage.getItem('cantidad_aprobadas');
  //this.cantidad_de_solicitud=localStorage.getItem('cantidad');
  //this.cantidad_solicitud_rechazadas=localStorage.getItem('cantidad_rechazadas');
  this.permiso_artista=localStorage.getItem('permiso');
  this.coincidencia_encontrada=localStorage.getItem('verificar_generos')
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
   
   localStorage.clear();
  }

}
