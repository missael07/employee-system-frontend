import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[errorLabel]'
})
export class ErrorLabelDirective implements OnInit{ 

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null | undefined;
  private _field: string = '';

  @Input() set errors ( value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }
  @Input() set color (value: string ){
    this._color = value;
    this.setStyle();
  }

  @Input() set field (value: string ) {
    this._field = value;
  }
  constructor(private element: ElementRef<HTMLElement>) {
    this.htmlElement = element;
    
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle():void {
    if( !this.htmlElement) return;

    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if( !this.htmlElement) return;
    if( !this._errors) {
      this.htmlElement.nativeElement.innerHTML = 'All is good';
      this.htmlElement.nativeElement.style.color = 'green';
      return;
    };

    this.htmlElement.nativeElement.style.color = 'red';
    const errors = Object.keys(this._errors);

    console.log(errors)
    if(errors.includes(Validators.required.name)){
      this.htmlElement.nativeElement.innerHTML = `${this._field} is required.`;
      return;
    }
    if(errors.includes('minlength')){
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerHTML = `${this._field} must be ${min} / ${current} entered`;
      return;
    }

    if(errors.includes(Validators.email.name)){
      console.log(1)
      this.htmlElement.nativeElement.innerHTML = `${this._field} must be a valid email.`;
      return;
    }  
  }
}
