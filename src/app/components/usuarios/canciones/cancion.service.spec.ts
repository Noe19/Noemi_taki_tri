import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumesService } from '../Albumes/albumes.service';

import { CancionService } from './cancion.service';

describe('CancionService', () => {
  let service: CancionService;
  describe('Pruebas creacion cancion', () =>{
    let fixture: ComponentFixture<CancionService>;
    let component: CancionService;
  
  it('Prueba de Cancion', () =>{
  
  fixture = TestBed.createComponent(CancionService);
  component = fixture.componentInstance;
  const datos_cancion = { songURL: "https://firebasestorage.googleapis.com/v0/b/takitesis.appspot.com/o/imagenCancion%2F8dOfzRCcaJeCBk0SjI6mRxSmTZA2%2Ffffff?alt=media&token=8aeb5ef6-1b93-4541-a876-20610b6505c7",
   song_name:"Dicen",
};
  const verification = component.creaCancion(datos_cancion);
  expect(verification).toBeTruthy();
   
  })
  })
  


});
