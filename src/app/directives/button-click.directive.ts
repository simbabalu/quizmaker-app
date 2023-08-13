import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[quizButtonClick]'
})
export class ButtonClickDirective {
  @HostBinding('class.clicked-button') isClicked = false;

  @HostListener('click') onClick() {
    this.isClicked = true;
  }
}
