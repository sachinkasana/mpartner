import { Directive } from '@angular/core';
import { AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: '[appMobileValidator]'
})
export class MobileValidatorDirective implements Validator {

  constructor() { }
  validate(control: AbstractControl) : {[key: string]: any} | null {
    console.log('validator', control.value);
    if (control.value && control.value.length != 10) {
      return { 'mobileNumberInvalid': true };
    }
    return null;
  }

}
