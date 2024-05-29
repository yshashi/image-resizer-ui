import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aspectRatio',
  standalone: true
})
export class AspectRatioPipe implements PipeTransform {
  transform(width: number, height: number): string {
    if (width && height) {
      const gcd = (a: number, b: number): number => {
        return b == 0 ? a : gcd(b, a % b);
      };

      const divisor = gcd(width, height);
      const aspectWidth = width / divisor;
      const aspectHeight = height / divisor;

      return `aspect-[${aspectWidth}/${aspectHeight}]`;
    }
    return '';
  }
}
