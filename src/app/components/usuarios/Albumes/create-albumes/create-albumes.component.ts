import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GenerosService } from '../../generos/generos.service';
import { AlbumesService } from '../albumes.service';
import { Albumes } from './albumes.modal';
import { ImagenesAlbumes } from './imagen_Albumes.modal';

@Component({
  selector: 'app-create-albumes',
  templateUrl: './create-albumes.component.html',
  styleUrls: ['./create-albumes.component.css']
})
export class CreateAlbumesComponent implements OnInit {
  public Albumesforms : FormGroup;
  imgURL="../assets/imagenes/camera.png";

  public usuario: any;
  url:any; 
  isChanged = false;
  albumes:Albumes[]=[];
  imagenes:ImagenesAlbumes[]=[];
 
   //varible que tiene el valor de la coincidencia
 public albumesNames: string[] = [];
 Albumes:Albumes[]=[];
  file:any;
  
  constructor( private activeRoute: ActivatedRoute,private fb:FormBuilder,private GenerosImg:GenerosService,private router:Router,private albumService:AlbumesService) { 


    this.Albumesforms=this.fb.group({
  
      name:['',[Validators.required,Validators.pattern(/[a-zA-Z].*/)]],
      author:['',[Validators.required,Validators.pattern(/[a-zA-Z].*/)]],
      year:['',[Validators.required,Validators.pattern(/[0-9].*/),Validators.maxLength(4),Validators.minLength(4)]] ,
   
      
    })
  }

  ngOnInit(): void {
    console.log('id_editable',this.activeRoute.snapshot.paramMap.get('id'));
    this.albumService.getPostAlbumes().subscribe((res) =>{
     
      
      this.Albumes = res.map((e) =>{
       
      
        return {
          
          id: e.payload.doc.id,      
          ...(e.payload.doc.data() as Albumes)
          
        };
       
       
      });
    
     
     
    });
  
  }
  crear_Albumes()
{    
  // validacion de generos 
  for (let i = 0; i < this.Albumes.length; i++) {
    this.albumesNames.push(this.Albumes[i].name)
  }
  console.log("albumes completos: ", this.Albumes.length);

  console.log("generos nopmbres: ", this.albumesNames);
 
  let incluyeGenero = this.albumesNames.includes(this.Albumesforms.get('name').value);
  console.log('repetido',incluyeGenero)
  
  if(incluyeGenero){

    Swal.fire({
position: 'center',
icon: 'error',
title: 'Album ya existe',
showConfirmButton: false,
timer: 1500
})
}

else{
     let  cargar:any={
      
       name:this.Albumesforms.value.name,
       author:this.Albumesforms.value.author,
       year:this.Albumesforms.value.year,
      
     
     };
     

     
     
     this.albumService.cargarimagenesAlbumesFirebase(this.imagenes,cargar);
     this.router.navigate(['/Albumes']);
     console.log(this.Albumesforms.value,'url',cargar)
     console.log(this.Albumesforms.value.name)
    
    }  
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
 // VALIDACIONES DE CREAR GENEROS
 //VALIDACIONES DE NOMBRE DEL ALBUMES
 albumesmio() {
  if (this.Albumesforms.get('name')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
 
  return this.Albumesforms.get('name')? 'El campo no permite números' : '';  
}

get albumes_nuevo_no_valido(){
return this.Albumesforms.get('name')?.invalid && this.Albumesforms.get('name')?.touched
}

// VALIDACIONES DE AUTOR ALBUMES
autormio() {
  if (this.Albumesforms.get('author')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
 
  return this.Albumesforms.get('author')? 'El campo no permite números' : '';  
}

get autor_nuevo_no_valido(){
return this.Albumesforms.get('author')?.invalid && this.Albumesforms.get('author')?.touched
}
//VALIDACIONES DE AÑO DE ALBUMES
aniomio() {
  if (this.Albumesforms.get('year')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
 
  return this.Albumesforms.get('year')? 'El campo no permite letras' : '';  
}

get anio_nuevo_no_valido(){
return this.Albumesforms.get('year')?.invalid && this.Albumesforms.get('year')?.touched
}

}
