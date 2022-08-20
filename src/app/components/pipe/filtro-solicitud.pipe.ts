import { Pipe, PipeTransform } from '@angular/core';
import { Administrador } from '../administrador/administrador.model';

@Pipe({
  name: 'filtroSolicitud'
})
export class FiltroSolicitudPipe implements PipeTransform {

  transform(estadoSolicitud: Administrador[],page:number=0,search:string=''): Administrador[]{
  //return estadoSolicitud.slice(page,page+2);;
  if(search.length===0){
    return estadoSolicitud.slice(page,page+5);
  }
  const filtradoMensaje = estadoSolicitud.filter(mensaje_estad0 => mensaje_estad0.nacionalidad.includes(search));
 return filtradoMensaje.slice(page,page+5);
  }

}
