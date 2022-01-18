import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { PostEntry } from '../model/post-entry.interface';

@Pipe({
  name: 'sorting',
})
export class SortingPipe implements PipeTransform {
  transform(value: any, args: any[]): any {
    const sortingField = args[0];
    const sortingDirection = args[1];
    let switcher = 1;
    if (sortingDirection === 'DESC') {
      switcher = -1;
    }
    value.subscribe((eve: any) => {
      eve.sort((a: any, b: any) => {
        if (a[sortingField] < b[sortingField]) {
          return -1 * switcher;
        } else if (a[sortingField] > b[sortingField]) {
          return 1 * switcher;
        } else {
          return 0;
        }
      });
    });
  }
}
