import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    email: new FormControl(''),
    password :new FormControl(''),

  });
 
/*
  constructor(private authSvc : AuthService,private router : Router) { }
  async onLogin(){
    console.log('form->',this.loginForm.value)
    const {email,password} = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email,password);
      if(user && user.user?.emailVerified){ 
        this.router.navigate(['/dashboard']);
      } else{
        this.router.navigate(['/register']);
      }
    } catch (error) {
      console.log(error)
      
    }


  }*/
  onLogin(){
    console.log('form->',this.loginForm.value);
  }

ngOnInit(): void {
}

}
