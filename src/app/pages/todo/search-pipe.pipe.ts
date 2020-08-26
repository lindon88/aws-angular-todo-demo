import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(items: any[], search: string): any {
    if (!search) {
      return items;
    }
    return items.filter(x => (
      x.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      x.description.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    );
  }

}
