import { Component, OnInit,Input } from '@angular/core';
import { FormGroup,FormControl, FormBuilder ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {NavigationEnd,ActivatedRoute} from '@angular/router';
import { PerfilService } from 'src/app/components/perfil.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService],
})
export class LoginComponent implements OnInit {

/*
  loginForm = new FormGroup({
    email: new FormControl(''),
    password :new FormControl(''),

  });
  */
  loginForm: FormGroup;
  //constructor(){}
 //constructor(private authSvc : AuthService,private router : Router) { }
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
  return this.loginForm.get('email')? 'No es email valido' : '';
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
  return this.loginForm.get('password')? 'No es contraseña valida' : '';
}
//iniciar sesion 
  async onLogin(){
    console.log('form->',this.loginForm.value)
    console.log('id',this.loginForm.get.name)
    const {email,password} = this.loginForm.value;
    try {
      const user:any = await this.authSvc.login(email,password);
      if(user ){ 
        
        console.log('usurio',user)
        console.log('usurio_unico',user?.user?.email)
        // usuario de forma global, solo vale hacer una sola (setItem)-> 
        localStorage.setItem('usuario', user?.user?.uid);
        //intento     
        this.router.navigate(['/dashboard']);
        /*
        if(user?.user?.uid=='FE1Uu1rE6NWRyCaNPIU81zNhSst1'){
          this.router.navigate(['/dashboard']);
        }else{
          this.router.navigate(["/dashboard-user"]); 
        }
         */ 
        this.router.navigate(['/dashboard']);      
      } else{
        this.loginForm.reset();
        this.router.navigate(['/login']);
      
      }
   
     
      







// termino la idea
    }
     catch (error) {
      this.loginForm.reset();
     // console.log(error)
     
      
    }
  }
 
// navegacion
async ngOnInit(){
  console.log ('Navar');
  this.user = await this.authSvc.getCurrentUser();
  console.log('usuario_devuelto',this.user)

  if(this.user){
    this.isLogged=true;
    this.router.onSameUrlNavigation = 'reload';
  }else{
    this.isLogged=false;
    this.router.onSameUrlNavigation = 'reload';

  }

   
}
/*
 salir(){
   //limpiando de la cache
  localStorage.clear();
       
  console.log('saliendo_inicio' ) ;
  return this.afAuth.signOut();
 
  
}
*/
/*
onLogin(){ 
 // console.log('Inicio_sesion',this.loginForm.value);
 const {email,password}=this.loginForm.value;
 this.authSvc.login(email,password)

}*/



}