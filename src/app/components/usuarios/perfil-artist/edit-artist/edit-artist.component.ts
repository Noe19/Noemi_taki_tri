import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PerfilService } from 'src/app/components/perfil.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditartistComponent implements OnInit {
public ediForm : FormGroup;
perfilRef:any;
public usuario : any;
  constructor(private perfilService:PerfilService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router) { 

      this.ediForm = this.formBuilder.group({
        name: [''],
        apellido: [''],
        nickname: [''],
        imagen:['']
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
      nickname: [this.perfilRef.nickname],    
      imagen:[this.perfilRef.imagen],
     
    })
    
    
  })
}
  onSubmit (){
    
    this.usuario = localStorage.getItem('usuario')
    const id =this.activeRoute.snapshot.paramMap.get(this.usuario);
    console.log('imagen',this.ediForm.value)
   this.perfilService.updatePost(this.ediForm.value,this.usuario);

    this.router.navigate(['/dashboard-user']);
  }

}
