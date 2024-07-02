import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTable'
})
export class SearchTablePipe implements PipeTransform {

  transform(value: any, args?: any) {
    if (!value) return null;
    if (!args) return value
    args = args.toLowerCase()
    // debugger;
    return value.filter(function (item: any) {
      return JSON.stringify(item).toLowerCase().includes(args)
    })
  }

  // transform(rows: any[], query: any): any {
  //   return query.length>0 ? rows.filter(item => item.titulo.toLowerCase().indexOf(query.toLowerCase())>-1) : rows;
  // }

}
