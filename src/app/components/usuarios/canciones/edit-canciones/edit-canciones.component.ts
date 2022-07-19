import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cancionSolicitud } from '../cancion.modal';
import { CancionService } from '../cancion.service';
import { Mp3Solicitud } from '../mp3.modal';

@Component({
  selector: 'app-edit-canciones',
  templateUrl: './edit-canciones.component.html',
  styleUrls: ['./edit-canciones.component.css']
})
export class EditCancionesComponent implements OnInit {
  public usuario: any;
  //generos:Generos[];
  public ediForm : FormGroup;
  public imagen:any;
  todoslasCanciones:cancionSolicitud[];
  imagenes:Mp3Solicitud[]=[];
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
  constructor(private router:Router,private fb:FormBuilder,private CancionService:CancionService, private activeRoute: ActivatedRoute
    ,public formBuilder:FormBuilder) {
      this.ediForm = this.formBuilder.group({
        song_name: ['',[Validators.required,Validators.pattern(/[a-zA-Z].*/)]],
        songURL:[''],
        id_artista:[''],
        song_reference:['']

            
      })
  }

  ngOnInit(): void {
    console.log('id_editable',this.activeRoute.snapshot.paramMap.get('id'))
    // this.usuario = localStorage.getItem('usuario')
     
     const id2 = this.activeRoute.snapshot.paramMap.get('id');
     this.CancionService.getgenerosbyId(id2).subscribe(res =>{
       this. generosRef = res;
       console.log('no se donde esta el erroc',this.generosRef.imageURL)
       this.url = this.generosRef.songURL
       this.ediForm = this.formBuilder.group({
        
        song_name: [this.generosRef.song_name],
         songURL: [this.generosRef.songURL],
        artista_id:[this.generosRef.artista_id],
        id:[this.generosRef.id], 
        song_reference:[this.generosRef.song_reference],
        album_id:[this.generosRef.album_id]   
      
       })
       console.log('valueid',this.generosRef.song_reference)
     })
  }

  onSubmit(){
        
     this.CancionService.add(this.ediForm.value, this._file,this.isChanged)
     console.log('datos_para editar',this.ediForm.value,this._file)
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
// Validaciones de editar canciones 
cancionmio() {
  if (this.ediForm.get('song_name')?.hasError('required')) {
    return 'El campo es obligatorio';
  }
 
  return this.ediForm.get('song_name')? 'El campo no permite números' : '';  
}

get cancion_nombre_nuevo_no_valido(){
return this.ediForm.get('song_name')?.invalid && this.ediForm.get('song_name')?.touched
}
}
