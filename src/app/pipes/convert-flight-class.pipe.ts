import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertFlightClass',
  standalone: true
})
export class ConvertFlightClassPipe implements PipeTransform {

  transform(value: "premium_economy" | "business" | "first", ...args: unknown[]): string | void{
    const template = {
      premium_economy: 'Premium Economy Class',
      business: 'Business Class',
      first: 'First Class',
    }
    return template[value] || value;
  }

}
