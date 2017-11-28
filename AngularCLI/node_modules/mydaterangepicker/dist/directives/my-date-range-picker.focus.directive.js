import { Directive, ElementRef, Renderer, Input } from "@angular/core";
export var FocusDirective = (function () {
    function FocusDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    FocusDirective.prototype.ngAfterViewInit = function () {
        if (this.value === "0") {
            return;
        }
        this.renderer.invokeElementMethod(this.el.nativeElement, "focus", []);
    };
    FocusDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[mydrpfocus]"
                },] },
    ];
    FocusDirective.ctorParameters = [
        { type: ElementRef, },
        { type: Renderer, },
    ];
    FocusDirective.propDecorators = {
        'value': [{ type: Input, args: ["mydrpfocus",] },],
    };
    return FocusDirective;
}());
//# sourceMappingURL=my-date-range-picker.focus.directive.js.map