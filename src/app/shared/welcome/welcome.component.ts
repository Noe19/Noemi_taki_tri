import { Component, OnInit } from '@angular/core';
import {Router,NavigationEnd,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public user :any;
  public router;

  public isLogged = false;
  constructor() { }

  ngOnInit(): void {
   // this.router.navigate([this.router.url])
    //window.location.reload();
    //this.router.onSameUrlNavigation='reload'
 
   
   // location.reload(forceGet)
  }








}
