import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from './solicitud.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent  {
  public usuario:any;
  public solicitudlForm:FormGroup;
  constructor(private solicitudService:SolicitudService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router)  {
      this.usuario = localStorage.getItem('usuario')
        this.solicitudlForm = this.formBuilder.group({
        nombre_artistico:['',[Validators.required]],
        
        nacionalidad:['',[Validators.required]],
        rol:['no artist'],
        id_usuario: [this.usuario]
        })
       }
  ngOnInit(): void {
    
  }

  async onSubmit() {
    this.solicitudService.createPost(this.solicitudlForm.value)
    this.router.navigate(['/dashboard'])
  }
    

 

}
