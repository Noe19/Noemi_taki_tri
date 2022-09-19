
import { ComponentFixture, TestBed } from "@angular/core/testing"
//import { ForgotpasswordComponent } from "../components/forgotpassword/forgotpassword.component";
import { GenerosService } from '../generos.service';
//import firebaseFunctionsTest from "firebase-functions-test";
describe('Pruebas Genero mio', () =>{
    let fixture: ComponentFixture<GenerosService>;
    let component: GenerosService;


it('Prueba de Genero', () =>{
 
  fixture = TestBed.createComponent(GenerosService);
  component = fixture.componentInstance;
  const datos_generos = {name: "Pasillo",
  imageURL:"https://firebasestorage.googleapis.com/v0/b/takitesis.appspot.com/o/imagenGeneros%2F8dOfzRCcaJeCBk0SjI6mRxSmTZA2%2FPasillo?alt=media&token=bcbbcb9a-6afd-4daa-a8e9-b891e713aad4"};
  const verification = component.crearGenero(datos_generos);
  expect(verification).toBeTruthy();

})

})
