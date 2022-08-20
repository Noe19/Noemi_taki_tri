import { Component, OnInit,Output } from '@angular/core';
import { Perfil } from 'src/app/components/dashboard/perfil.model';
import { PerfilService } from 'src/app/components/perfil.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { url } from 'inspector';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AdministradorService } from 'src/app/components/administrador/administrador.service';
import { Administrador } from 'src/app/components/administrador/administrador.model';
import { GenerosService } from '../../generos/generos.service';


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
Administrador: Administrador[];
 perfilResf:any;
 public editForm: FormGroup;
 public arreglos:any;
constructor(private perfilService:PerfilService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,private angularfirestore :AngularFirestore,
    private router: Router,private Aceptar:AdministradorService,public generos:GenerosService) { 

      this.ediForm = this.formBuilder.group({
        name: [''],
        apellido: [''],
        nickname: [''],
        imagen:[''],
        fecha_nacimiento:[''],
      })
   
  }
  

  ngOnInit(): void {
  
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
    

   



this.usuario = localStorage.getItem('usuario')
this.roles_admin=localStorage.getItem('roles')
const id = this.activeRoute.snapshot.paramMap.get(this.usuario)

this.perfilService.getPostbyId(this.usuario).subscribe( res =>{
  
  this.perfilRef = res;

    
    this.url = this.perfilRef.imagen
    localStorage.setItem('perfil_foto',this.url)
    this.ediForm = this.formBuilder.group({
      
      name: [this.perfilRef.name],
      apellido: [this.perfilRef.apellido],
      nickname: [this.perfilRef.nickname],
      imagen:[this.perfilRef.imagen],
      fecha_nacimiento:[this.perfilRef.fecha_nacimiento]
     
      
    })
   // this.nameGenero(this.perfilRef.name)

})



  
  }


}


