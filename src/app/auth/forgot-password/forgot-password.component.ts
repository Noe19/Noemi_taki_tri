import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers:[AuthService],
})
export class ForgotPasswordComponent implements OnInit {

userEmail = new FormControl('',[Validators.email]);
  constructor(private authSvc:AuthService,private router:Router) { 

    
  }

  ngOnInit(): void {
  }
 async onReset(){
   try {
    const email =this.userEmail.value;
    await  this.authSvc.resetPassword(email);
      // mensaje si se envio el correo
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El correo se envio correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/login']); 
   } catch (error) {

    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'El correo no es correcto',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['/forgot-password']); 
     //console.log('erro al enviar el correo de recuperar contraseña ',error);
     
   }

  }

}
