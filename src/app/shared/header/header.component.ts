import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';
import {NavigationEnd,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[AuthService],
})
export class HeaderComponent implements OnInit {
  public user :any;
  public verificado:any;
  public isLogged = false;

  constructor(private authSvc: AuthService,public router : Router) { }
  
   async ngOnInit(){
    this.verificado = localStorage.getItem('verificacion')
     console.log ('very',this.verificado);
     this.user = await this.authSvc.getCurrentUser();
     console.log('usuario_devuelto',this.user)

     if(this.user ){
       
       this.isLogged=true;
       this.router.onSameUrlNavigation = 'reload';
     }else{
       this.isLogged=false;
       this.router.onSameUrlNavigation = 'reload';

     }

      
  }


}
