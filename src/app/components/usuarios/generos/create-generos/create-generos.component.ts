import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Generos } from '../generos.modal';
import { GenerosService } from '../generos.service';
import { ImagenesGeneros } from './imagenesGeneros.modal';

@Component({
  selector: 'app-create-generos',
  templateUrl: './create-generos.component.html',
  styleUrls: ['./create-generos.component.css']
})
export class CreateGenerosComponent implements OnInit {
  public usuario: any;
  url:any; 
  generos:Generos[]=[];
  imagenes:ImagenesGeneros[]=[];
  imgURL="../assets/imagenes/camera.png";
  file:any;
  
  public generosforms : FormGroup;
  //editar
  public albumForm: FormGroup;
  isChanged = false;
  @ViewChild("file")
  files: Set<File> = new Set();
  
  _file;
  

  constructor(private router:Router,private fb:FormBuilder,private GenerosImg:GenerosService) {
    this.generosforms=this.fb.group({
  
      Genero_nuevo:['',[Validators.required,Validators.pattern(/[a-zA-Z].*/)]],
      artista_id:[localStorage.getItem('usuario'),[Validators.required]],
      referencia:[''] ,
      
    })
   }

 
  ngOnInit(): void {
    
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
          imagen:this.file[0]
        })

      }

    }else{
      this.imgURL;
       
    }

  }
  crear_generos(){
   //this.GenerosImg.add(this.generosforms.value,this._file)
    // los datos String del formulario
    
    let  cargar:any={
      Genero_nuevo:this.generosforms.value.Genero_nuevo,
     
      

    };
    this.GenerosImg.cargarimagenesGeneroFirebase(this.imagenes,cargar);
    this.router.navigate(['/generos']);
    console.log(this.generosforms.value,'url',cargar)
    console.log(this.generosforms.value.Genero_nuevo)
   
  }
/*
  onFilesAdded(target: any) {
    this.url="https://www.educima.com/dibujo-para-colorear-camara-de-fotos-dm19432.jpg";
    this.isChanged = true;
    const reader = new FileReader();
    reader.onload = () => {
      this.url = reader.result;
    };
    if (target.files.length > 0) {
      this._file = target.files[0];
      reader.readAsDataURL(this._file);
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }*/
  limpiarform(){
    this.generosforms.reset();
    this.imgURL="../assets/imagenes/camera.png";
  }

  // VALIDACIONES DE CREAR GENEROS
getErrorMessage_genero_nuevo(){
  if (this.generosforms.get('Genero_nuevo')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
 
  return this.generosforms.get('Genero_nuevo')? 'El campo no permite números' : '';
}
get genero_nuevo_no_valido(){
  return this.generosforms.get('Genero_nuevo')?.invalid && this.generosforms.get('Genero_nuevo')?.touched
}

}


