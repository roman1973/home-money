import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[wfmDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOPen = false;

  @HostListener('click') onClick() {
    this.isOPen = !this.isOPen;
  }
}
