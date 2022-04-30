import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-user',
  templateUrl: './sidenav-user.component.html',
  styleUrls: ['./sidenav-user.component.css']
})
export class SidenavUserComponent implements OnInit {
public usuario:any;
  constructor() { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario')
  }

}
