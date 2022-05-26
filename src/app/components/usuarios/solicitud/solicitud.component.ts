import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from './solicitud.service';
import { DocumentosSolicitud } from './documentos.modal';
import { Solicitud } from './solicitud.model';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent  {
  public usuario: any;
  url:any; 
  solicitud:Solicitud[]=[];
  document:DocumentosSolicitud[]=[];
  imgURL="../assets/imagenes/camera.png";
  file:any;
  


  public solicitudlForm:FormGroup;
  constructor(private solicitudService:SolicitudService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router)  {
      this.usuario = localStorage.getItem('usuario')
        this.solicitudlForm = this.formBuilder.group({
        nombre_artistico:['',[Validators.required]],
        
        nacionalidad:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
        rol:['no artist'],
        id_usuario: [this.usuario],
        
        })
       }
  ngOnInit(): void {
    
  }
/*
  async onSubmit() {
    this.solicitudService.createPost(this.solicitudlForm.value)
    this.router.navigate(['/dashboard-user'])
  }
  */
  selectChange(event:any){
       //traer la imagens
    //console.log(event.target.files);
    //para visualizar la imagen que vamos a subir
    
    if(event.target.files.length>0){
      
      this.file=event.target.files;
      // para que pueda leer el ti`po de dato
      let reader= new FileReader();
      reader.readAsDataURL(this.file[0]);
      reader.onloadend =(event:any)=>{
        this.imgURL= event.target.result;
        this.document.push({
          documentos:this.file[0]
        })

      }

    }else{
      this.imgURL;
       
    }

  }
  
  onSubmit() {
    //this.GenerosImg.add(this.generosforms.value,this._file)
     // los datos String del formulario
     console.log('nombre_artistico',this.solicitudlForm.value.nombre_artistico)
     
     let  cargar:any={
       nombre_artistico:this.solicitudlForm.value.nombre_artistico,
       nacionalidad:this.solicitudlForm.value.nacionalidad,
       rol:this.solicitudlForm.value.rol,
       id_usuario:this.solicitudlForm.value.id_usuario, 
     };
     console.log('cargar',cargar)
    
     this.solicitudService.cargardocumentosGeneroFirebase(this.document,cargar);
     this.router.navigate(['/dashboard-user']);
     console.log(this.solicitudlForm.value,'url',cargar)
     console.log(this.solicitudlForm.value.nacionalidad)
    
   }

 

}
