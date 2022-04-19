import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAction } from '@angular/fire/compat/database';
import { FormGroup,FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[AuthService]
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password :new FormControl(''),

  });



  constructor(private authSvc: AuthService) {



    
   }

  ngOnInit(): void {}
 
  
  onRegister(){
      console.log('form->',this.registerForm.value);
      
      const{email,password} = this.registerForm.value;
      this.authSvc.register(email,password);
    }
}
