import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[hoHighlight]' })
export class HighlightDirective {
    private el: HTMLElement;
    private _defaultColor = 'orange';

    @Input('hoHighlight') highlightColor: string;

    @Input() set defaultColor(colorName: string) {
      this._defaultColor = colorName || this._defaultColor;
    }

    constructor(el: ElementRef) {
      this.el = el.nativeElement;
    }

    @HostListener('mouseenter') onMouseEnter() {
      this.highlight(this.highlightColor || this._defaultColor);
    }

    @HostListener('mouseleave') onMouseLeave() {
      this.highlight(null);
    }

    private highlight(color: string) {
      this.el.style.backgroundColor = color;
    }
}
