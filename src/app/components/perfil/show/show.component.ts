import { Component, OnInit,Output } from '@angular/core';
import { Perfil } from '../../dashboard/perfil.model';
import { PerfilService } from '../../perfil.service';

import { FormGroup,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
 Perfil: Perfil[]
 public usuario : any;
 perfilResf:any;
 public editForm: FormGroup;

  constructor(private perfilService:PerfilService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router) { 
   
  }

  ngOnInit(): void {
   // this.usuario = localStorage.getItem('usuario')
   this.usuario = localStorage.getItem('usuario')
    this.perfilService.getPost().subscribe((res) =>{
      this.Perfil = res.map((e) =>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Perfil)
        };
      });
    });
  }




  }


