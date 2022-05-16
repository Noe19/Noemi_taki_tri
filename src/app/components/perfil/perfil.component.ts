import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

import { Perfil } from '../dashboard/perfil.model';
import { PerfilService } from '../perfil.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public perfilForm:FormGroup
  constructor(private perfilService:PerfilService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router) {
      this.perfilForm = this.formBuilder.group({
      name:[''],
      apellido:[''],
      nickname:['']
      })
     }


  ngOnInit(): void {
   
    }
    onSubmit() {
     // this.perfilService.createPost(this.perfilForm.value)
      this.router.navigate(['/show'])
    }
      
   }






