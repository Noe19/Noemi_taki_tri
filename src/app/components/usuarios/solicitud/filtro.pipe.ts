import { Pipe, PipeTransform} from '@angular/core';
import { Administrador } from '../../administrador/administrador.model';
import { MensajeSolicitud } from './mensaje.modal';


@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {
  public page:number=0;

  transform(estadoSolicitud: MensajeSolicitud[], page:number=0,search:string=''): MensajeSolicitud[] {
    if(search.length===0){
      return estadoSolicitud.slice(page,page+2);
    }
    const filtradoMensaje = estadoSolicitud.filter(mensaje_estad0 => mensaje_estad0.mensaje.includes(search));
   return filtradoMensaje.slice(page,page+2);
  }

  

}
