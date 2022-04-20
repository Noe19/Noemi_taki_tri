import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService],
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    email: new FormControl(''),
    password :new FormControl(''),

  });
  //constructor(){}
 //constructor(private authSvc : AuthService,private router : Router) { }

 constructor(private authSvc : AuthService,private router : Router) { }
  async onLogin(){
    console.log('form->',this.loginForm.value)
    const {email,password} = this.loginForm.value;
    try {
      const user:any = await this.authSvc.login(email,password);
      if(user ){ 
        this.router.navigate(['/dashboard']);
        console.log('usurio',user)
        console.log('usurio_unico',user?.user?.email)
        // usuario de forma global, solo vale hacer una sola (setItem)-> 
        localStorage.setItem('usuario', user?.user?.email);
       
        
        
      } else{
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.log(error)
      
    }
  }

ngOnInit(): void {
}

/*
onLogin(){ 
 // console.log('Inicio_sesion',this.loginForm.value);
 const {email,password}=this.loginForm.value;
 this.authSvc.login(email,password)

}*/



}
