import { idToken } from "@angular/fire/auth";

export interface Usuario {

     id?:string; 
    email: string;
    password :string;
    name:string;
    apellido:string;
    nickname:string;
    fecha_nacimiento:Date;
    documento:File;
/*
    constructor(id:string,email:string,password:string,name:string,apellido:string,nickname:string,
      fecha_nacimiento:Date,documento:File){

        this.id = idToken,
        this.email = email,
        this.password = password

    }

  */
  
 
}