import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'todoFilter'
})
export class TodoFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): unknown {
    if (!filter || filter === 'all') {
      return items;
    }

    if (filter === 'not-completed') {
      return items.filter(x => x.isCompleted === false);
    }

    if (filter === 'completed') {
      return items.filter(x => x.isCompleted === true);
    }

    if (filter === 'favorite') {
      return items.filter(x => x.isFavorite === true);
    }
  }

}
