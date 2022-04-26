import { Component, OnInit,Output } from '@angular/core';
import { Perfil } from '../../dashboard/perfil.model';
import { PerfilService } from '../../perfil.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


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

 perfilResf:any;
 public editForm: FormGroup;

  constructor(private perfilService:PerfilService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router) { 

      this.ediForm = this.formBuilder.group({
        name: [''],
        apellido: [''],
        nickname: ['']
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
  this.ediForm = this.formBuilder.group({
    name: [this.perfilRef.name],
    apellido: [this.perfilRef.apellido],
    nickname: [this.perfilRef.nickname]
  })
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


