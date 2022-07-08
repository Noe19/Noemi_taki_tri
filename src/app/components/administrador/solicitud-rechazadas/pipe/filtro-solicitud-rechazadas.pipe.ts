import { Pipe, PipeTransform } from '@angular/core';
import { Administrador } from '../../administrador.model';

@Pipe({
  name: 'filtroSolicitudRechazadas'
})
export class FiltroSolicitudRechazadasPipe implements PipeTransform {

  transform(estadoSolicitud_rechazas: Administrador[],page:number=0,search:string=''): Administrador[]{
    //return estadoSolicitud.slice(page,page+2);;
    if(search.length===0){
      return estadoSolicitud_rechazas.slice(page,page+3);
    }
    const filtradoMensaje = estadoSolicitud_rechazas.filter(mensaje_estad0 => mensaje_estad0.nacionalidad.includes(search));
   return filtradoMensaje.slice(page,page+3);
    }

}
