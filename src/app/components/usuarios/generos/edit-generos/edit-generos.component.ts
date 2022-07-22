import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cancionSolicitud } from '../../canciones/cancion.modal';
import { ImagenesGeneros } from '../create-generos/imagenesGeneros.modal';
import { Generos } from '../generos.modal';
import { GenerosService } from '../generos.service';
@Component({
  selector: 'app-edit-generos',
  templateUrl: './edit-generos.component.html',
  styleUrls: ['./edit-generos.component.css']
})
export class EditGenerosComponent implements OnInit {
  public usuario: any;
  //generos:Generos[];
  public ediForm : FormGroup;
  public imagen:any;
  todoslosgeneros:Generos[];
  imagenes:ImagenesGeneros[]=[];
 // imgURL="../assets/imagenes/camera.png";
  //file:any;
  public url:any;
  public imagenes_generos:any;
  // editar
  generosRef:any;
  // para editar
  public albumForm: FormGroup;
  isChanged = false;
  @ViewChild("file") file;
  files: Set<File> = new Set();
  
  _file;
    // array de todas las canciones
    todoslascanciones:cancionSolicitud[]=[];

  constructor(private router:Router,private fb:FormBuilder,private GenerosImg:GenerosService, private activeRoute: ActivatedRoute
    ,public formBuilder:FormBuilder) {
      this.ediForm = this.formBuilder.group({
        name:['',[Validators.required,Validators.pattern(/[a-zA-Z].*/)]],
        imageURL:[''],
        authorId:[''],
        id:[''],
      
        
      
        
       
      })
  }

 
 

  ngOnInit() {
 console.log('id_editable',this.activeRoute.snapshot.paramMap.get('id'))
// this.usuario = localStorage.getItem('usuario')
 
 const id2 = this.activeRoute.snapshot.paramMap.get('id');
 this.GenerosImg.getgenerosbyId(id2).subscribe(res =>{
   this. generosRef = res;
   this.url = this.generosRef.imageURL
   this.ediForm = this.formBuilder.group({
    
     name: [this.generosRef.name],
     imageURL: [this.generosRef.imageURL],
    authorId:[this.generosRef.authorId],
    id:[this.generosRef.id], 
    image_reference:[this.generosRef.image_reference]   
  
   })
   console.log('valueid',this.generosRef.id)
 })

/*
  this.GenerosImg.busqueda_id_genre().subscribe(res=>{
      this.todoslascanciones = res.map((e) =>{
      
        console.log('todas las canciones',this.todoslascanciones.length)
     
      return {
        
        id: e.payload.doc.id,      
        ...(e.payload.doc.data() as cancionSolicitud)
        
      };
     
    });
  })
  */  
  }


  onSubmit(){
 
  this.GenerosImg.add(this.ediForm.value, this._file,this.isChanged)
  console.log(this.ediForm.value)
  this.isChanged = false;
  this.file.nativeElement.value = "";

  }

  onFilesAdded(target: any) {
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
  }

    // VALIDACIONES DE CREAR GENEROS
    generomio() {
      if (this.ediForm.get('name')?.hasError('required')) {
        return 'El campo es obligatorio';
      }
     
      return this.ediForm.get('name')? 'El campo no permite números' : '';  
    }

get genero_nuevo_no_valido(){
  return this.ediForm.get('name')?.invalid && this.ediForm.get('name')?.touched
}

/// TRAER



}
