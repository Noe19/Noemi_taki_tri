import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[AuthService]
})
export class HeaderComponent implements OnInit {
  public isLogged = false;
  public user:any;

  constructor(private authSvc:AuthService) { }

   async ngOnInit(){
    console.log('Navar',);
    this.user = await this.authSvc.getCurrentUser();
    if(this.user){
      
      //console.log('user_logeado->',user)
      this.isLogged=true;
    }else{
      console.log('usuario no encontrado')
    }
    

  }

}
