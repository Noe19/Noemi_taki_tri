import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
// alerta 
import Swal from 'sweetalert2'
@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
  providers:[AuthService],
})
export class SendEmailComponent implements OnInit {
  public user$:Observable<any>= this.authSvc.afAuth.user;
 Swal = require('sweetalert2');
  constructor(private authSvc:AuthService) { }

  ngOnInit(): void {
  }
  //metodo para que se verifique el email.
  onSendEmail():void{
    Swal.fire('Se ha enviado el correo de verificacion ')
    this.authSvc.sendVerificationEmail();
    

  }

}
