import { Pipe, PipeTransform } from '@angular/core';
import DOMPurify from 'dompurify';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
  name: 'purify',
})
export class PurifyPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}

  public transform(value) {
    const sanitizedContent = DOMPurify.sanitize(value);
    return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);
  }
}
