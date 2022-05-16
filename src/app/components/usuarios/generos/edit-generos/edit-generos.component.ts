import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  //imgURL="../assets/imagenes/camera.png";
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

  constructor(private router:Router,private fb:FormBuilder,private GenerosImg:GenerosService, private activeRoute: ActivatedRoute
    ,public formBuilder:FormBuilder) {
      this.ediForm = this.formBuilder.group({
        Genero_nuevo: [''],
        imagenUrl:[''],
        artista_id:[''],
      
        
      
        
       
      })
  }

 
 

  ngOnInit() {
    //console.log('verificando_datos',this.generosforms.value)
   /* this.GenerosImg.getGeneros().subscribe(res=>{
      this.todoslosgeneros =[];
      res.forEach((element:Generos)=>{
        this.todoslosgeneros.push({
          ...element
        })

      })
    })
    console.log('generos',this.todoslosgeneros)
*/
/*
this.GenerosImg.getPostgeneros().subscribe((res) =>{
  this.imagen=res;
  
  this.todoslosgeneros = res.map((e) =>{
    this.url=this.todoslosgeneros
    //console.log(this.url)
    return {
      
      id: e.payload.doc.id,      
      ...(e.payload.doc.data() as Generos)
      
    };
   
   
  });

 
 
});
*/

 console.log('id_editable',this.activeRoute.snapshot.paramMap.get('id'))
// this.usuario = localStorage.getItem('usuario')
 
 const id = this.activeRoute.snapshot.paramMap.get('id');
 this.GenerosImg.getgenerosbyId(id).subscribe(res =>{
   this. generosRef = res;
   this.url = this.generosRef.imagenUrl
   this.ediForm = this.formBuilder.group({
    
     Genero_nuevo: [this.generosRef.Genero_nuevo],
     imagenUrl: [this.generosRef.imagenUrl],
    artista_id:[this.generosRef.artista_id],
    
    
    
  
   })
   console.log('valueid',this.generosRef.id)
 })
  //this.imagenes_generos =this.generosRef.imagenUrl
   
  }

  /*
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
        this.imagenes.push({
          imagen:this.file[0]
        })

      }

    }else{
      this.imgURL;
       
    }

  }
*/
  onSubmit(){
    /*
 console.log('dato',this.ediForm.value);
   // los datos String del formulario
   let  cargar:any={
    Genero_nuevo:this.ediForm.value.Genero_nuevo,
    

  };
  this.GenerosImg.cargarimagenesGeneroFirebase(this.imagenes,cargar);
  this.router.navigate(['/generos']);
  console.log(this.ediForm.value,'url',cargar)
  */
  // datos de editar
  this.GenerosImg.add(this.ediForm.value, this._file)
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

}
