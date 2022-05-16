import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImagenesGeneros } from './create-generos/imagenesGeneros.modal';
import { Generos } from './generos.modal';
import { GenerosService } from './generos.service';
@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.css']
})
export class GenerosComponent implements OnInit {
  public usuario: any;
  generos:Generos[]=[];
  imagenes:ImagenesGeneros[]=[];
  imgURL="../assets/imagenes/camera.png";
  file:any;
 
  //generos:Generos[];
  public imagen:any;
  todoslosgeneros:Generos[];
 
 
  
  public url:any;
  
  public generosforms : FormGroup;
  
  

  constructor(private router:Router,private fb:FormBuilder,private GenerosImg:GenerosService) {
    this.generosforms=this.fb.group({
  
      Genero_nuevo:['',[Validators.required]],
      artista_id:[localStorage.getItem('usuario'),[Validators.required]],
      referencia:[''] 
    })
   }

  ngOnInit(): void {
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
  }
  
  eliminar_genero(id:any,nombreGenero:string){
    this.GenerosImg.eliminar_generos_total(id,nombreGenero);

  }
  limpiarform(){
    this.generosforms.reset();
    this.imgURL="../assets/imagenes/camera.png";
  }
 


}
