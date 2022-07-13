import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from './solicitud.service';
import { DocumentosSolicitud } from './documentos.modal';
import { Solicitud } from './solicitud.model';
import { MensajeSolicitud } from './mensaje.modal';
import { Administrador } from '../../administrador/administrador.model';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent   {
  public page:number=0;
  public usuario: any;
  public hora:any;
  public search:string="";
  url:any; 
  public value:any;
  solicitud:Solicitud[]=[];
  MensajeSolicitud:MensajeSolicitud[]=[];
  document:DocumentosSolicitud[]=[];
  imgURL="../assets/imagenes/camera.png";
  file:any;
  Administrador: Administrador[]
  
public cuantos_existen:number;

  public solicitudlForm:FormGroup;
  constructor(private solicitudService:SolicitudService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router)  {
      this.usuario = localStorage.getItem('usuario')
        this.solicitudlForm = this.formBuilder.group({
        nombre_artistico:['',[Validators.required,Validators.pattern(/[a-zA-Z].*/)]],
        
        nacionalidad:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/[0-9].*/)]],
        rol:['no artist'],
        id_usuario: [this.usuario],
        razon:['Ninguna'],
      
        
        })
       }
  ngOnInit(): void {
  
      this.solicitudService.gettodos_los_mensajes_de_rechazados().subscribe((res) =>{
        
        this.MensajeSolicitud = res.map((e) =>{
        
     this.cuantos_existen =this.MensajeSolicitud.length
   
          return {
          
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as MensajeSolicitud)
          };
         
        });
        

      
      });
      
      
     //console.log('array')
    
  
  }
    
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
       razon:this.solicitudlForm.value.razon,
       
       
     };
     console.log('cargar',cargar)
     this.usuario = localStorage.getItem('usuario')
     this.solicitudService.cargardocumentosGeneroFirebase(this.document,cargar);
     this.router.navigate(['/show-artist/{{usuario}}']);
     console.log(this.solicitudlForm.value,'url',cargar)
     console.log(this.solicitudlForm.value.nacionalidad)
    
   }


   eliminar(mensaje:MensajeSolicitud){
     this.solicitudService.delete(mensaje.id)
     

   }

   // paginacion de paginas
   siguiente_pagina_mensaje_solicitud(){
    this.page+=2;
   }

   atras_pagina_mensaje_solicitud(){
     if(this.page>0){
      this.page-=2;
     }
    

   }

   // buscador 
   onSearchMensaje(search:string){
     this.page=0;
       this.search=search;
       //console.log(search);
   }
 //VALIDACIONES DE SOLICITUD 
 //VALIDACIONES DE NOMBRE DEL ARTISTA
 getErrorMessage_nombre(){
  if (this.solicitudlForm.get('nombre_artistico')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
 
  return this.solicitudlForm.get('nombre_artistico')? 'No se aceptan numeros' : '';
}
get nombreArtistico_no_valido(){
  return this.solicitudlForm.get('nombre_artistico')?.invalid && this.solicitudlForm.get('nombre_artistico')?.touched
}
// VALIDACIONES DE LA CEDULA DEL ARTISTA
getErrorMessage_cedula(){
  if (this.solicitudlForm.get('nacionalidad')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
 
  return this.solicitudlForm.get('nacionalidad')? 'El campo debe tener 10 numeros' : '';
}
get cedula_no_valido(){
  return this.solicitudlForm.get('nacionalidad')?.invalid && this.solicitudlForm.get('nacionalidad')?.touched
}

}
