import { Pipe, PipeTransform } from '@angular/core';
import { Generos } from './generos.modal';

@Pipe({
  name: 'pipeGeneros'
})
export class PipeGenerosPipe implements PipeTransform {

  transform(generos: Generos[],page:number=0,search:string=''): Generos[] {
    if(search.length===0){
      return generos.slice(page,page+5);
    }
    const filtradoMensaje = generos.filter(mensaje_estad0 => mensaje_estad0.Genero_nuevo.includes(search));
   return filtradoMensaje.slice(page,page+5);
  }

}
