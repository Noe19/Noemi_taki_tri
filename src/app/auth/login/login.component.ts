import { Component, OnInit,Input } from '@angular/core';
import { FormGroup,FormControl, FormBuilder ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {NavigationEnd,ActivatedRoute} from '@angular/router';
import { PerfilService } from 'src/app/components/perfil.service';
import { type } from 'os';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService],
})
export class LoginComponent implements OnInit {

public n :any;
  loginForm: FormGroup;
 
 public verificado:any;
 public user :any;
 public usuario:any;
 public perfilResf:any;
 public roles_admin:any;
  public isLogged = false;
 constructor(private authSvc : AuthService,private router : Router,public afAuth :AngularFireAuth,private fb :FormBuilder,private perfilService:PerfilService) { 
 this.loginForm = this.fb.group({
  email:['',[Validators.required,Validators.minLength(10),Validators.maxLength(50),Validators.email]],
  password:['',[Validators.required,Validators.minLength(5),Validators.maxLength(30)]],
  

})


 }

 hide = true;
 //validacion de correo

 get correo (){
  return this.loginForm.get('email')?.dirty && this.loginForm.get('email')?.touched && this.loginForm.get('email')?.valid
}
get correo_no_valido(){
  return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched
}
getErrorMessage_correo() {
  if (this.loginForm.get('email')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
  return this.loginForm.get('email')? 'No es email válido' : '';
}

 //validacion de password

get contrasena (){
  return this.loginForm.get('password')?.dirty && this.loginForm.get('password')?.touched && this.loginForm.get('password')?.valid
}

get contrasena_no_valido(){
  return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched
}
getErrorMessage_contrasena() {
  if (this.loginForm.get('password')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
  return this.loginForm.get('password')? 'No es contraseña válida' : '';
}
//iniciar sesion 
  async onLogin(){

   // console.log('form->',this.loginForm.value)
   // console.log('id',this.loginForm.get.name)
    const {email,password} = this.loginForm.value;
    try {
      const user:any = await this.authSvc.login(email,password);
      if(user ){ 
        this.verificado = user?.user?.emailVerified
       
        localStorage.setItem('usuario', user?.user?.uid);
      
       this.usuario = localStorage.getItem('usuario')
        this.authSvc.getPostbyId(this.usuario).subscribe( res =>{ 
        this.perfilResf = res ;
     
       
         localStorage.setItem('roles',this.perfilResf.rol) 
         this.roles_admin=localStorage.getItem('roles')
         

         switch(this.roles_admin){
          case "artista":{
            this.router.navigate(["/show-artist/{{usuario}}"]);
            break; 
          }

          case "administrador":{
            this.router.navigate(["/show/{{usuario}}"]); 
          }
         }

          
      })       
       // Termina el rol 
      } else{
        this.loginForm.reset();
        this.router.navigate(['/login']);
      
      }
   

    }
     catch (error) {
      this.loginForm.reset();
    
     
      
    }

  }
 
// navegacion
async ngOnInit(){
  
  localStorage.clear();
 // console.log ('Navar');
  this.user = await this.authSvc.getCurrentUser();
 // console.log('usuario_devuelto',this.user)

  if(this.user ){
    this.isLogged=true;
    this.router.onSameUrlNavigation = 'reload';
  }else{
    this.isLogged=false;
    this.router.onSameUrlNavigation = 'reload';

  }

   
}

 async myFuction(){
  //const ver = document.getElementById("noe");
   this.n=1;
 
  const ver = document.querySelector(".noe");
 // console.log(ver)
  ver.addEventListener("click",function(){
   // console.log(this.nextElementSibling.type)
    if(this.nextElementSibling.type==="password"){
      this.nextElementSibling.type="text";
    //  console.log('aqui')
   
    }else{
      this.nextElementSibling.type="password";
      
    }
  })
}


}
