import { Pipe, PipeTransform } from '@angular/core';
import { Albumes } from './create-albumes/albumes.modal';
@Pipe({
  name: 'filtrarAlbumes'
})
export class FiltrarAlbumesPipe implements PipeTransform {

  transform(albumes: Albumes[],page:number=0,search:string=''): Albumes[] {
    if(search.length===0){
      return albumes.slice(page,page+3);
    }
    const filtradoMensaje = albumes.filter(mensaje_estad0 => mensaje_estad0.name.includes(search));
   return filtradoMensaje.slice(page,page+3);
  }
  }


