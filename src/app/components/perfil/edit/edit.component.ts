import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { PerfilService } from '../../perfil.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
public ediForm : FormGroup;
perfilRef:any;
public usuario : any;
  constructor(private perfilService:PerfilService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router) { 

      this.ediForm = this.formBuilder.group({
        name: [''],
        apellido: [''],
        nickname: ['']
      })
    }
/*
  ngOnInit(): void {
    //console.log('id_editable',this.activeRoute.snapshot.paramMap.get('id'))
    this.usuario = localStorage.getItem('usuario')
 
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.perfilService.getPostbyId(id).subscribe(res =>{
      this.perfilRef = res;
      this.ediForm = this.formBuilder.group({
        name: [this.perfilRef.name],
        apellido : [this.perfilRef.apellido],
        nickname : [this.perfilRef.nickname]
      })
    })
  }
*/
ngOnInit(): void {
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
}
  onSubmit (){
    this.usuario = localStorage.getItem('usuario')
    const id =this.activeRoute.snapshot.paramMap.get(this.usuario);
    this.perfilService.updatePost(this.ediForm.value,this.usuario);
    this.router.navigate(['/dashboard']);
  }

}
