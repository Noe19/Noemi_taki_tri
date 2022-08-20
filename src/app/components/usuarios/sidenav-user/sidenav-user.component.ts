import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Sidenav } from 'src/app/sidenav/sidenav.model';
import { PerfilService } from '../../perfil.service';
import { imagen } from './imagen.modal';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerosService } from '../generos/generos.service';
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
public perfil_foto:any;
public mostrar:any
public foto_alternativa:any;
constructor(private activeRoute: ActivatedRoute,private fb:FormBuilder,private perfilService:PerfilService,public afAuth :AngularFireAuth,private router : Router,public generos:GenerosService) { 
  this.fotoperfil = this.fb.group({   
    imagen:[''],
    name: [''],
 
  })

}

  ngOnInit(): void {
    this.foto_alternativa="https://c.tenor.com/FBeNVFjn-EkAAAAC/ben-redblock-loading.gif";

    this.perfil_foto =localStorage.getItem('perfil_foto');
    //console.log('llego',this.perfil_foto)

  this.mostrar =0
    if(this.perfil_foto){
      this.mostrar=1
     
    }

    const id = this.activeRoute.snapshot.paramMap.get(this.usuario)
    this.usuario = localStorage.getItem('usuario');
   
    this.perfilService.getPostbyId(this.usuario).subscribe( res =>{
  
      this.perfilRef = res;
     
        
        this.imagen = this.perfilRef.imagen
      //  localStorage.setItem('perfil_foto',this.imagen)
       
        this.name=this.perfilRef.name
        localStorage.setItem('UserAuthor',this.name);
        console.log('this.ima',this.imagen)

    
        this.generos.author_mio(this.perfilRef.name);
        
    })

   
  this.rol_admin = localStorage.getItem('roles');

  this.permiso_artista=localStorage.getItem('permiso');

  sessionStorage.removeItem('roles');
  sessionStorage.removeItem('permiso');
 
}



  async salir(){
   
   
   localStorage.clear();
   
   
   await this.afAuth.signOut();
   this.router.navigate(['/home']);   
   console.log('saliendo_inicio123' ,this.afAuth.signOut()) ;
   console.log('usuario que salio',this.usuario)
   console.log('rol',this.rol_admin)
   
   localStorage.clear();
  }

  doble_salir(){
    localStorage.clear();
    localStorage.clear();

  }

 
}
