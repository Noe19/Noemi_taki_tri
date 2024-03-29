import { Component, OnInit,Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAction } from '@angular/fire/compat/database';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { User } from '@firebase/auth';
// alerta con estilos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[AuthService]
})
export class RegisterComponent implements OnInit {
  Swal = require('sweetalert2');

 //alerta de ingreso correctamente
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
  
  



registerForm : FormGroup;

public user :any;
public isLogged = false;
 // constructor(private authSvc: AuthService) {}
 constructor(private authSvc : AuthService,private router : Router,private fb :FormBuilder,private firestore :AngularFirestore,public afAuth :AngularFireAuth) {
//id artista   
  this.speakerCollection = firestore.collection("artist");
  
  this.registerForm = this.fb.group({
    email:['',[Validators.required,Validators.email,Validators.minLength(10),Validators.maxLength(50)]],
   
    password:['',[Validators.required,Validators.minLength(5),Validators.maxLength(30)]],
    name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
    apellido:['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
    nickname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
    fecha_nacimiento:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    
  })
 }

//pasar el id de artista

speakerCollection: AngularFirestoreCollection<User>;

hide = true;

//validacion de nombres
  get nombre (){
    return this.registerForm.get('name')?.dirty && this.registerForm.get('name')?.touched && this.registerForm.get('name')?.valid
  }
  get nombre_no_valido(){
    return this.registerForm.get('name')?.invalid && this.registerForm.get('name')?.touched
    
  }

  // mensaje de erro para nombre 
getErrorMessage_nombre() {
  if (this.registerForm.get('name')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
  return this.registerForm.get('name')? 'No es Nombre válido' : '';
}
  
//validacion de apellido

get apellido (){
  return this.registerForm.get('apellido')?.dirty && this.registerForm.get('apellido')?.touched && this.registerForm.get('apellido')?.valid
}
get apellido_no_valido(){
  return this.registerForm.get('apellido')?.invalid && this.registerForm.get('apellido')?.touched
  
}
// mensaje de erro para nombre 
getErrorMessage_apellido() {
  if (this.registerForm.get('apellido')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
  return this.registerForm.get('apellido')? 'No es Apellido válido' : '';
}
  
// validacion nickname

get nickname (){
  return this.registerForm.get('nickname')?.dirty && this.registerForm.get('nickname')?.touched && this.registerForm.get('nickname')?.valid
}
get nickname_no_valido(){
  return this.registerForm.get('nickname')?.invalid && this.registerForm.get('nickname')?.touched
  
}
// mensaje de erro para nombre 
getErrorMessage_nickname() {
  if (this.registerForm.get('nickname')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
  return this.registerForm.get('nickname')? 'No es un alias válido' : '';
}
  

//validacion de fecha
get fecha (){
  return this.registerForm.get('fecha_nacimiento')?.dirty && this.registerForm.get('fecha_nacimiento')?.touched && this.registerForm.get('fecha_nacimiento')?.valid
  
}
get fecha_no_valido(){
  return this.registerForm.get('fecha_nacimiento')?.invalid && this.registerForm.get('fecha_nacimiento')?.touched
    
}
// mensaje de erro para nombre 
getErrorMessage_fecha() {
  if (this.registerForm.get('fecha_nacimiento')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
  return this.registerForm.get('fecha_nacimiento')? 'No es una fecha  válida' : '';
}
  

 //validacion de correo

 get correo (){
  return this.registerForm.get('email')?.dirty && this.registerForm.get('email')?.touched && this.registerForm.get('email')?.valid
}
get correo_no_valido(){
  return this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched
 
}
// mensaje de erro para nombre 
getErrorMessage_correo() {
  if (this.registerForm.get('email')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
  return this.registerForm.get('email')? 'No es email valido' : '';
}
  




 //validacion de password

get contrasena (){
  return this.registerForm.get('password')?.dirty && this.registerForm.get('password')?.touched && this.registerForm.get('password')?.valid
}
get contrasena_no_valido(){
  return this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched
}

getErrorMessage_contrasena() {
  if (this.registerForm.get('password')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
  return this.registerForm.get('password')? 'No es contraseña válido' : '';
}
//mensaje de error para correo 


  async onRegister(){
     


      //console.log('form->',this.registerForm.value)
    const {email,password,name} = this.registerForm.value;
    const id = this.firestore.createId();
    
   
    try {
      const user:any = await this.authSvc.register(email,password,name);
      if(user ){ 
    //    console.log('usurio_nombre',this.registerForm.get('name')?.value)
    //    console.log('usurio_id',user?.user?.uid)
       
      
        // usuario de forma global, solo vale hacer una sola (setItem)-> 
        localStorage.setItem('usuario', user?.user?.uid);
        //enviar a firestore
        //this.speakerCollection.doc(user?.user?.uid).set({ });
        this.firestore.collection("artist").doc(user?.user?.uid).set({"id_autenticado":user?.user?.uid,"name": this.registerForm.get('name')?.value,"apellido":this.registerForm.get('apellido')?.value,"nickname":this.registerForm.get('nickname')?.value,
        "fecha_nacimiento":this.registerForm.get('fecha_nacimiento')?.value,"email":this.registerForm.get('email')?.value,"id_artista":id,"imagen":"https://ui-avatars.com/api/?name="+this.registerForm.get('name')?.value+'+'+this.registerForm.get('apellido')?.value,"rol":'artista'}).then(async ()=>{
        // si se registro correctamente y se paso los datos al firestore se le dirige al dashboard
          // si se registra sale de la funcion e ingresa 
          await this.afAuth.signOut();
          localStorage.clear();
          this.router.navigate(['/register']);

        }).catch(err =>{
           console.log(err)
           this.router.navigate(['/register']);
      
         });
       
       // alert('Usted se ha registrado con exito, revisaremos sus datos , para que pueda ingresar debe esperara 24h');
       this.Toast.fire({
        icon: 'success',
        title: 'Se ha registrado con éxito'
        
      });
       this.router.navigate(['/login']);
        
      } else{
        this.Toast.fire({
          icon: 'error',
          title: 'No se registro con éxito ,intente nuevamente'
          
        });
        this.router.navigate(['/register']);

        
      }
      this.registerForm.reset();
    } catch (error) {
      //console.log(error)
      this.registerForm.reset();
      alert('No se creo el usuario correctamnete, intente nuevamente');
      
    }
    



    }
// agregar a firestore
 

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
}
