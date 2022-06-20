import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { cancionSolicitud } from '../cancion.modal';
import { CancionService } from '../cancion.service';
import { Mp3Solicitud } from '../mp3.modal';

@Component({
  selector: 'app-create-canciones',
  templateUrl: './create-canciones.component.html',
  styleUrls: ['./create-canciones.component.css']
})
export class CreateCancionesComponent implements OnInit {

  public usuario: any;
  url:any; 
  canciones:cancionSolicitud[]=[];
  imagenes:Mp3Solicitud[]=[];
  imgURL="data:image/png;base64,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";
  file:any;
  
  public cancionesforms : FormGroup;
  //editar
  
  isChanged = false;
  @ViewChild("file")
  files: Set<File> = new Set();
  
  _file;
  

  constructor(private router:Router,private fb:FormBuilder,private cancionService:CancionService,private activeRoute: ActivatedRoute) {
    this.cancionesforms=this.fb.group({
  
      song_nombre:['',[Validators.required,Validators.pattern(/[a-zA-Z].*/)]],
      artista_id:[localStorage.getItem('usuario'),[Validators.required]],
      song_reference:[''] ,

      
    })
   }

 
  ngOnInit(): void {
    console.log('id_editable_cancion',this.activeRoute.snapshot.paramMap.get('id'))
  }

  selectChange(event:any){
    //traer la imagens
    //console.log(event.target.files);
    //para visualizar la imagen que vamos a subir
     this.isChanged=false;
    if(event.target.files.length>0){
      
      this.file=event.target.files;
      // para que pueda leer el ti`po de dato
      let reader= new FileReader();
      reader.readAsDataURL(this.file[0]);
      reader.onloadend =(event:any)=>{
        this.imgURL= event.target.result;
        this.imagenes.push({
          mp3:this.file[0]
        })

      }

    }else{
      this.imgURL;
       
    }

  }
  crear_canciones(){
   //this.GenerosImg.add(this.generosforms.value,this._file)
    // los datos String del formulario
    console.log('id_albumesne caciones',this.activeRoute.snapshot.paramMap.get('id'))
    let  cargar:any={
      song_nombre:this.cancionesforms.value.song_nombre,
      album_id:this.activeRoute.snapshot.paramMap.get('id')
      

    };
    this.cancionService.cargarimagenesCancionesFirebase(this.imagenes,cargar);
    this.router.navigate(['/Canciones']);
    console.log(this.cancionesforms.value,'url',cargar)
    console.log(this.cancionesforms.value.song_nombre)
   
  }

  limpiarform(){
    this.cancionesforms.reset();
    this.imgURL="../assets/imagenes/camera.png";
  }
  //VALIDACIONES DE AÑO DE ALBUMES
cancionmio() {
  if (this.cancionesforms.get('song_nombre')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
 
  return this.cancionesforms.get('song_nombre')? 'El campo no permite números' : '';  
}

get canciones_nuevo_no_valido(){
return this.cancionesforms.get('song_nombre')?.invalid && this.cancionesforms.get('song_nombre')?.touched
}

}
