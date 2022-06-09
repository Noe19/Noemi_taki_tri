import { Component, OnInit,Output } from '@angular/core';
import { Perfil } from 'src/app/components/dashboard/perfil.model';
import { PerfilService } from 'src/app/components/perfil.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { url } from 'inspector';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-show-edit',
  templateUrl: './show-artist.component.html',
  styleUrls: ['./show-artist.component.css']
})
export class ShowartistComponent implements OnInit {
public ediForm : FormGroup;
perfilRef:any;
public usuario : any;
 Perfil: Perfil[];
public url:any;
public roles_admin:any;
// variable de administrador 
public admin : any;

 perfilResf:any;
 public editForm: FormGroup;

constructor(private perfilService:PerfilService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,private angularfirestore :AngularFirestore,
    private router: Router) { 

      this.ediForm = this.formBuilder.group({
        name: [''],
        apellido: [''],
        nickname: [''],
        imagen:[''],
        fecha_nacimiento:[''],
      })
   
  }
  

  ngOnInit(): void {
  
    
    
   // this.usuario = localStorage.getItem('usuario')
   

 /*
    this.perfilService.getPost().subscribe((res) =>{
      this.Perfil = res.map((e) =>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Perfil)
        };
      });
    });
*/

this.usuario = localStorage.getItem('usuario')
this.roles_admin=localStorage.getItem('roles')
const id = this.activeRoute.snapshot.paramMap.get(this.usuario)

this.perfilService.getPostbyId(this.usuario).subscribe( res =>{
  
  this.perfilRef = res;
  //console.log('permiso', this.perfilRef.name)
  //if(this.perfilRef.rol=='administrador'){
    
    this.url = this.perfilRef.imagen
    this.ediForm = this.formBuilder.group({
      
      name: [this.perfilRef.name],
      apellido: [this.perfilRef.apellido],
      nickname: [this.perfilRef.nickname],
      imagen:[this.perfilRef.imagen],
      fecha_nacimiento:[this.perfilRef.fecha_nacimiento]
     
      
    })
/*
    if(this.perfilRef.name=='admi'){
      console.log('permiso')
    }else
    console.log('denegado')

*/

 // }
})





// ocurrencia



/*
this.usuario = localStorage.getItem('usuario')
const id = this.activeRoute.snapshot.paramMap.get(this.usuario)
this.perfilService.getPostbyId(this.usuario).subscribe( res =>{
  this.perfilRef = res;
  this.ediForm = this.formBuilder.group({
    name: [this.perfilRef.name],
    apellido: [this.perfilRef.apellido],
    nickname: [this.perfilRef.nickname]
  })
})
  

*/

  
  }
}


