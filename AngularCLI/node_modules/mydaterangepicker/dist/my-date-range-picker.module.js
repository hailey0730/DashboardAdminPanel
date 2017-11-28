import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { MyDateRangePicker } from "./my-date-range-picker.component";
import { FocusDirective } from "./directives/my-date-range-picker.focus.directive";
export var MyDateRangePickerModule = (function () {
    function MyDateRangePickerModule() {
    }
    MyDateRangePickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule],
                    declarations: [MyDateRangePicker, FocusDirective],
                    exports: [MyDateRangePicker, FocusDirective]
                },] },
    ];
    MyDateRangePickerModule.ctorParameters = [];
    return MyDateRangePickerModule;
}());
//# sourceMappingURL=my-date-range-picker.module.js.map