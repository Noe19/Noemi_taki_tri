import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import Swal from 'sweetalert2';
import { Generos } from '../generos.modal';
import { GenerosService } from '../generos.service';
import { ImagenesGeneros } from './imagenesGeneros.modal';

@Component({
  selector: 'app-create-generos',
  templateUrl: './create-generos.component.html',
  styleUrls: ['./create-generos.component.css']
})
export class CreateGenerosComponent implements OnInit {

  // alertas 
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
  ///
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
  ////////////////
  public imagen:any;
  todoslosgeneros:Generos[];
 // todoas_las_coincidencias:Generos[];
 //buscador
 public page:number=0;
 public search:string="";
 //varible que tiene el valor de la coincidencia
 public genreNames: string[] = [];
 Generos:Generos[]= [];
  // array de todos los generos 


  public Genero_nuevo_veri:any;
  constructor(private router:Router,private fb:FormBuilder,private GenerosImg:GenerosService) {
    this.generosforms=this.fb.group({
  
      Genero_nuevo:['',[Validators.required]],
      artista_id:[localStorage.getItem('usuario'),[Validators.required]],
      referencia:[''] ,
      
    })
   }

 
  ngOnInit(): void {
    this.GenerosImg.getPostgeneros().subscribe((res) =>{
      this.Generos = res.map((e) =>{   
        return {
          
          id: e.payload.doc.id,      
          ...(e.payload.doc.data() as Generos)
          
        };
      });
     
      
    });
  
    
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
// validacion de generos 
    for (let i = 0; i < this.Generos.length; i++) {
      this.genreNames.push(this.Generos[i].Genero_nuevo)
    }
    console.log("generos completos: ", this.Generos);
    console.log("generos nopmbres: ", this.genreNames);
    let incluyeGenero = this.genreNames.includes(this.generosforms.get('Genero_nuevo').value);
    if(incluyeGenero){

        Swal.fire({
    position: 'center',
    icon: 'error',
    title: 'Genero ya existe',
    showConfirmButton: false,
    timer: 1500
  })
    }
    
    else{

      let  cargar:any={
        Genero_nuevo:this.generosforms.value.Genero_nuevo,
      };
 
 
   
      this.GenerosImg.cargarimagenesGeneroFirebase(this.imagenes,cargar);
      this.router.navigate(['/generos']);
  }
     
     
   
    
   }

  

      
      

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
