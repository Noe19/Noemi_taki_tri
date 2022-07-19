import { Pipe, PipeTransform } from '@angular/core';

import { cancionSolicitud }from '../canciones/cancion.modal'
@Pipe({
  name: 'filtrarCanciones'
})
export class FiltrarCancionesPipe implements PipeTransform {

  transform( todoslascanciones: cancionSolicitud[],page:number=0,search:string=''): cancionSolicitud[] {
    if(search.length===0){
      return  todoslascanciones.slice(page,page+5);
    }
    const filtradoMensaje = todoslascanciones.filter(mensaje_estad0 => mensaje_estad0.song_name.includes(search));
   return filtradoMensaje.slice(page,page+5);
  }
  }


