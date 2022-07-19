import { Pipe, PipeTransform } from '@angular/core';
import { Generos } from './generos.modal';

@Pipe({
  name: 'pipeGeneros'
})
export class PipeGenerosPipe implements PipeTransform {
public page:number=0;
  transform(generos: Generos[],page:number=0,search:string=''): Generos[] {
    if(search.length===0){
      return generos.slice(page,page+6);
    }
    const filtrageneros = generos.filter(todos_generos => todos_generos.name.includes(search));
   return filtrageneros.slice(page,page+6);
  }

}
