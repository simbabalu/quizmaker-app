import { Injectable } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root',
})
export class QuizBusinessService{

  constructor(private readonly sanitizer: DomSanitizer){}

  public decodeString(text: string): SafeHtml{
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  public mixArray<T>(array: T[]): T[] {
    const mixedArray = [...array];
    for (let i = mixedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mixedArray[i], mixedArray[j]] = [mixedArray[j], mixedArray[i]];
    }
    return mixedArray;
  }

}
