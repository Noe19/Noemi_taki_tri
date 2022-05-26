import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
 
  file:any;
  
  constructor( private activeRoute: ActivatedRoute,private fb:FormBuilder,private GenerosImg:GenerosService,private router:Router,private albumService:AlbumesService) { 


    this.Albumesforms=this.fb.group({
  
      name:['',[Validators.required]],
      author:['',[Validators.required]],
      year:['',[Validators.required]] ,
      
    })
  }

  ngOnInit(): void {
    console.log('id_editable',this.activeRoute.snapshot.paramMap.get('id'))
  
  }
  crear_Albumes()
{    
     let  cargar:any={
       name:this.Albumesforms.value.name,
       author:this.Albumesforms.value.author,
       year:this.Albumesforms.value.year,
       genero_name:this.activeRoute.snapshot.paramMap.get('id')
      
      
 
     };
     console.log(this.Albumesforms.value)
     
     
     this.albumService.cargarimagenesAlbumesFirebase(this.imagenes,cargar);
     this.router.navigate(['/Albumes']);
     console.log(this.Albumesforms.value,'url',cargar)
     console.log(this.Albumesforms.value.name)
    
   
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
}
