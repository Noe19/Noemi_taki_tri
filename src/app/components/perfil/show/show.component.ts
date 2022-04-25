import { Component, OnInit } from '@angular/core';
import { Perfil } from '../../dashboard/perfil.model';
import { PerfilService } from '../../perfil.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
Perfil:Perfil[]

  constructor(private perfilService:PerfilService) { }

  ngOnInit(): void {
 
  }

}
