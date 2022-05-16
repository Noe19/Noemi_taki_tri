import { Component, OnInit,Output, ViewChild } from '@angular/core';
import { Perfil } from '../../dashboard/perfil.model';
import { PerfilService } from '../../perfil.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { url } from 'inspector';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  public ediForm : FormGroup;
perfilRef:any;
public usuario : any;
 Perfil: Perfil[]
public url:any;
public roles_admin:any;
public urlimg:any;
// variable de administrador 
public admin : any;

 perfilResf:any;

 public editForm: FormGroup;

constructor(private perfilService:PerfilService,public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,private angularfirestore :AngularFirestore,
    private router: Router,private storage:AngularFireStorage) { 

      this.ediForm = this.formBuilder.group({
        name: [''],
        apellido: [''],
        nickname: [''],
        imagen:[''],
      })
   
  }
  

  ngOnInit(): void {
  
    
    
   // this.usuario = localStorage.getItem('usuario')
   

 /*
    this.perfilService.getPost().subscribe((res) =>{
      this.Perfil = res.map((e) =>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Perfil)
        };
      });
    });
*/
try {
  this.usuario = localStorage.getItem('usuario')
this.roles_admin=localStorage.getItem('roles')
const id = this.activeRoute.snapshot.paramMap.get(this.usuario)

this.perfilService.getPostbyId(this.usuario).subscribe( res =>{
  
  this.perfilRef = res;
  //console.log('permiso', this.perfilRef.name)
  //if(this.perfilRef.rol=='administrador'){
    
    this.url = this.perfilRef.imagen
    this.ediForm = this.formBuilder.group({
      
      name: [this.perfilRef.name],
      apellido: [this.perfilRef.apellido],
      nickname: [this.perfilRef.nickname],
      imagen:[this.perfilRef.imagen]
     
     
    })
/*
    if(this.perfilRef.name=='admi'){
      console.log('permiso')
    }else
    console.log('denegado')

*/

 // }

})
 
} catch (error) {
  
}






// ocurrencia



/*
this.usuario = localStorage.getItem('usuario')
const id = this.activeRoute.snapshot.paramMap.get(this.usuario)
this.perfilService.getPostbyId(this.usuario).subscribe( res =>{
  this.perfilRef = res;
  this.ediForm = this.formBuilder.group({
    name: [this.perfilRef.name],
    apellido: [this.perfilRef.apellido],
    nickname: [this.perfilRef.nickname]
  })
})
  

*/


  
  }
  // imagen
     // crear un  imagen 
     @ViewChild("file") file;
     files: Set<File> = new Set();
 
   _file;
   isChanged = false;



   
   
  
   createImg(){
   
    this.angularfirestore.collection("artist").doc(this.usuario).set({  url: this.urlimg  });
    this.urlimg="";
   }
  
   updateImg(){
         
    this.angularfirestore
    .doc(this.usuario)
    .update({  url: this.urlimg });
     this.urlimg ="";
     
   }



   onFilesAdded(target: any) {
    this.isChanged = true;
    const reader = new FileReader();
    reader.onload = () => {
      this.urlimg = reader.result;
      console.log('imagen', this.urlimg)
    };
    if (target.files.length > 0) {
      this._file = target.files[0];
      reader.readAsDataURL(this._file);
    }
  }
 
  addFiles() {
    this.file.nativeElement.click();
  }
  
   add() {
     
    if (this.isChanged) {
      const filePath = "imagenes" ;
      const ref = this.storage.ref(filePath);
      ref.put(this._file).then(() => {
        ref.getDownloadURL().subscribe(url => {
          this.urlimg = url;
          console.log('storage',this.urlimg)
          if (this.usuario) {
            this.updateImg();
          } else {
            this.createImg();
          }
        });
      });
    } else {
      if (this.usuario) {
        this.updateImg();
      }
    }
    this.isChanged = false;
    this.file.nativeElement.value = "";
  }
  
  // seleccciona la imagen
  select(speaker) {
    this.url = speaker.urlimg;
  }
 
  
  
  
  




}


