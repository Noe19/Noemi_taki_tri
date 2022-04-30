import { Component, OnInit,Output } from '@angular/core';
import { Perfil } from '../../dashboard/perfil.model';
import { PerfilService } from '../../perfil.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { url } from 'inspector';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  public ediForm : FormGroup;
perfilRef:any;
public usuario : any;
 Perfil: Perfil[]
public url:any;
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
      imagen:[this.perfilRef.imagen]
     
      
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


