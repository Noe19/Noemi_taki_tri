import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 public usuario : any;
 public usuario_name :any;
  constructor() { }

  ngOnInit(): void {
    //obtener el dato getItem
    this.usuario = localStorage.getItem('usuario')
    
  }

}
