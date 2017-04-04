import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
    selector: '[flex]'
})
export class FlexDirective {
    constructor(el: ElementRef){
        el.nativeElement.style.flex="1 1 auto";
    }
}