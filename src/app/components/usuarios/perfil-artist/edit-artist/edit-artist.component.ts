import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PerfilService } from 'src/app/components/perfil.service';
//importacion de alertas de perfil
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditartistComponent implements OnInit {
public ediForm : FormGroup;
perfilRef:any;
public usuario : any;
Swal = require('sweetalert2');

//alerta de que se edito el perfil del usuario 
Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});
  constructor(private perfilService:PerfilService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router) { 

      this.ediForm = this.formBuilder.group({
        name: ['',[Validators.required,Validators.pattern(/[a-zA-Z].*/)]],
        apellido: ['',[Validators.required,Validators.pattern(/[a-zA-Z].*/)]],
        nickname: ['',[Validators.required,Validators.pattern(/[a-zA-Z].*/)]],
        imagen:['']
      })
    }

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
    try {
      
    this.usuario = localStorage.getItem('usuario')
    const id =this.activeRoute.snapshot.paramMap.get(this.usuario);
    console.log('imagen',this.ediForm.value)
   this.perfilService.updatePost(this.ediForm.value,this.usuario);
   this.Toast.fire({
    icon: 'success',
    title: 'Perfil Actualizado correctamente'
    
  });

      
    } catch (error) {
      this.Toast.fire({
        icon: 'error',
        title: 'El perfil no se actualizo correctamente'
        
      });
    }
    this.usuario = localStorage.getItem('usuario')
    this.router.navigate(['/show-artist/{{usuario}}']); 
   
  }

  //VALIDACIONES DE NOMBRE DE PERFIL 
  getErrorMessage_correo(){
    if (this.ediForm.get('name')?.hasError('required')) {
      return 'El campo es obligatorio';
    }
   
    return this.ediForm.get('name')? 'No se aceptan números' : '';
  }
  get nombre_no_valido(){
    return this.ediForm.get('name')?.invalid && this.ediForm.get('name')?.touched
  }
// VALIDACIONES DE APELLIDO DE PERFIL
getErrorMessage_apellido(){
  if (this.ediForm.get('apellido')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
 
  return this.ediForm.get('apellido')? 'No se aceptan números' : '';
}
get apellido_no_valido(){
  return this.ediForm.get('apellido')?.invalid && this.ediForm.get('apellido')?.touched
}
// VALIDACIONES DE APODO O ALIAS DEL PERFIL
getErrorMessage_Alias(){
  if (this.ediForm.get('nickname')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
 
  return this.ediForm.get('nickname')? 'No se aceptan números' : '';
}
get alias_no_valido(){
  return this.ediForm.get('nickname')?.invalid && this.ediForm.get('apellido')?.touched
}

}
