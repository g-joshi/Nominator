import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNominations'
})
export class FilterNominationsPipe implements PipeTransform {
  transform(value: any, searchText: string = ''): any {
    return value.filter(item => (new RegExp(searchText, 'gi').exec(Object.values(item).join()) != null));
  }
}
