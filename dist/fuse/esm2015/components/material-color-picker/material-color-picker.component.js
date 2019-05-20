import { Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../animations';
import { MatColors } from '../../mat-colors';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const FUSE_MATERIAL_COLOR_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FuseMaterialColorPickerComponent),
    multi: true
};
export class FuseMaterialColorPickerComponent {
    /**
     * Constructor
     */
    constructor() {
        // Set the defaults
        this.colorChanged = new EventEmitter();
        this.colors = MatColors.all;
        this.hues = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'A100', 'A200', 'A400', 'A700'];
        this.selectedHue = '500';
        this.view = 'palettes';
        // Set the private defaults
        this._color = '';
        this._modelChange = () => {
        };
        this._modelTouched = () => {
        };
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Selected class
     *
     * @param value
     */
    set color(value) {
        if (!value || value === '' || this._color === value) {
            return;
        }
        // Split the color value (red-400, blue-500, fuse-navy-700 etc.)
        const colorParts = value.split('-');
        // Take the very last part as the selected hue value
        this.selectedHue = colorParts[colorParts.length - 1];
        // Remove the last part
        colorParts.pop();
        // Rejoin the remaining parts as the selected palette name
        this.selectedPalette = colorParts.join('-');
        // Store the color value
        this._color = value;
    }
    get color() {
        return this._color;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Control Value Accessor implementation
    // -----------------------------------------------------------------------------------------------------
    /**
     * Register on change function
     *
     * @param fn
     */
    registerOnChange(fn) {
        this._modelChange = fn;
    }
    /**
     * Register on touched function
     *
     * @param fn
     */
    registerOnTouched(fn) {
        this._modelTouched = fn;
    }
    /**
     * Write value to the view from model
     *
     * @param color
     */
    writeValue(color) {
        // Return if null
        if (!color) {
            return;
        }
        // Set the color
        this.color = color;
        // Update the selected color
        this.updateSelectedColor();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Select palette
     *
     * @param event
     * @param palette
     */
    selectPalette(event, palette) {
        // Stop propagation
        event.stopPropagation();
        // Go to 'hues' view
        this.view = 'hues';
        // Update the selected palette
        this.selectedPalette = palette;
        // Update the selected color
        this.updateSelectedColor();
    }
    /**
     * Select hue
     *
     * @param event
     * @param hue
     */
    selectHue(event, hue) {
        // Stop propagation
        event.stopPropagation();
        // Update the selected huse
        this.selectedHue = hue;
        // Update the selected color
        this.updateSelectedColor();
    }
    /**
     * Remove color
     *
     * @param event
     */
    removeColor(event) {
        // Stop propagation
        event.stopPropagation();
        // Return to the 'palettes' view
        this.view = 'palettes';
        // Clear the selected palette and hue
        this.selectedPalette = '';
        this.selectedHue = '';
        // Update the selected color
        this.updateSelectedColor();
    }
    /**
     * Update selected color
     */
    updateSelectedColor() {
        if (this.selectedColor && this.selectedColor.palette === this.selectedPalette && this.selectedColor.hue === this.selectedHue) {
            return;
        }
        // Set the selected color object
        this.selectedColor = {
            palette: this.selectedPalette,
            hue: this.selectedHue,
            class: this.selectedPalette + '-' + this.selectedHue,
            bg: this.selectedPalette === '' ? '' : MatColors.getColor(this.selectedPalette)[this.selectedHue],
            fg: this.selectedPalette === '' ? '' : MatColors.getColor(this.selectedPalette).contrast[this.selectedHue]
        };
        // Emit the color changed event
        this.colorChanged.emit(this.selectedColor);
        // Mark the model as touched
        this._modelTouched(this.selectedColor.class);
        // Update the model
        this._modelChange(this.selectedColor.class);
    }
    /**
     * Go to palettes view
     *
     * @param event
     */
    goToPalettesView(event) {
        // Stop propagation
        event.stopPropagation();
        this.view = 'palettes';
    }
    /**
     * On menu open
     */
    onMenuOpen() {
        if (this.selectedPalette === '') {
            this.view = 'palettes';
        }
        else {
            this.view = 'hues';
        }
    }
}
FuseMaterialColorPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuse-material-color-picker',
                template: "<button mat-icon-button\n        class=\"mat-elevation-z1\"\n        [matMenuTriggerFor]=\"colorMenu\"\n        (menuOpened)=\"onMenuOpen()\"\n        [ngClass]=\"selectedPalette + '-' + selectedHue\">\n    <mat-icon>palette</mat-icon>\n</button>\n\n<mat-menu #colorMenu=\"matMenu\" class=\"fuse-material-color-picker-menu mat-elevation-z8\">\n\n    <header [ngClass]=\"selectedColor?.class || 'accent'\" class=\"mat-elevation-z4\"\n            fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n\n        <button mat-icon-button\n                class=\"secondary-text\"\n                [style.visibility]=\"view === 'hues' ? 'visible' : 'hidden'\"\n                (click)=\"goToPalettesView($event)\" aria-label=\"Palette\">\n            <mat-icon class=\"s-20\">arrow_back</mat-icon>\n        </button>\n\n        <span *ngIf=\"selectedColor?.palette\">\n            {{selectedColor.palette}} {{selectedColor.hue}}\n        </span>\n\n        <span *ngIf=\"!selectedColor?.palette\">\n            Select a Color\n        </span>\n\n        <button mat-icon-button\n                class=\"remove-color-button secondary-text\"\n                (click)=\"removeColor($event)\"\n                aria-label=\"Remove color\"\n                matTooltip=\"Remove color\">\n            <mat-icon class=\"s-20\">delete</mat-icon>\n        </button>\n    </header>\n\n    <div [ngSwitch]=\"view\" class=\"views\">\n\n        <div class=\"view\" *ngSwitchCase=\"'palettes'\">\n\n            <div fxLayout=\"row wrap\" fxLayoutAlign=\"start start\" class=\"colors\" fusePerfectScrollbar>\n                <div class=\"color\" fxLayout=\"row\" fxLayoutAlign=\"center center\"\n                     *ngFor=\"let color of (colors | keys)\"\n                     [ngClass]=\"color.key\"\n                     [class.selected]=\"selectedPalette === color.key\"\n                     (click)=\"selectPalette($event, color.key)\">\n                </div>\n            </div>\n        </div>\n\n        <div class=\"view\" *ngSwitchCase=\"'hues'\">\n            <div fxLayout=\"row wrap\" fxLayoutAlign=\"start start\" class=\"colors\" fusePerfectScrollbar>\n                <div class=\"color\" fxLayout=\"row\" fxLayoutAlign=\"center center\"\n                     *ngFor=\"let hue of hues\"\n                     [fxHide]=\"selectedPalette === 'fuse-white' && hue !== '500' || selectedPalette === 'fuse-black' && hue !== '500'\"\n                     [ngClass]=\"selectedPalette + '-' + hue\"\n                     [class.selected]=\"selectedHue === hue\"\n                     (click)=\"selectHue($event, hue)\">\n                </div>\n            </div>\n        </div>\n\n    </div>\n</mat-menu>\n",
                animations: fuseAnimations,
                encapsulation: ViewEncapsulation.None,
                providers: [FUSE_MATERIAL_COLOR_PICKER_VALUE_ACCESSOR],
                styles: [".fuse-material-color-picker-menu{width:245px}.fuse-material-color-picker-menu .mat-menu-content{padding:0}.fuse-material-color-picker-menu .mat-menu-content .views{display:flex;flex-direction:column;min-height:165px}.fuse-material-color-picker-menu .mat-menu-content .views .view{overflow:hidden}.fuse-material-color-picker-menu .mat-menu-content .views .view .colors{padding:1px 0 0;margin-left:-1px}.fuse-material-color-picker-menu .mat-menu-content .views .view .colors .color{width:40px;height:40px;margin:0 0 1px 1px;border-radius:0;cursor:pointer;transition:border-radius .4s cubic-bezier(.25,.8,.25,1)}.fuse-material-color-picker-menu .mat-menu-content .views .view .colors .color:hover{border-radius:20%}.fuse-material-color-picker-menu .mat-menu-content .views .view .colors .color.selected{border-radius:50%!important}"]
            }] }
];
/** @nocollapse */
FuseMaterialColorPickerComponent.ctorParameters = () => [];
FuseMaterialColorPickerComponent.propDecorators = {
    colorChanged: [{ type: Output }],
    color: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtY29sb3ItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWF0ZXJpYWwtY29sb3ItcGlja2VyL21hdGVyaWFsLWNvbG9yLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM3QyxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxDQUFDLE1BQU0seUNBQXlDLEdBQVE7SUFDMUQsT0FBTyxFQUFNLGlCQUFpQjtJQUM5QixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO0lBQy9ELEtBQUssRUFBUSxJQUFJO0NBQ3BCLENBQUM7QUFVRixNQUFNLE9BQU8sZ0NBQWdDO0lBa0J6Qzs7T0FFRztJQUNIO1FBRUksbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsSCxJQUFJLENBQUMsV0FBVyxH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SUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsZ0JBQWdCLENBQUMsS0FBSztRQUVsQixtQkFBbUI7UUFDbkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVU7UUFFTixJQUFLLElBQUksQ0FBQyxlQUFlLEtBQUssRUFBRSxFQUNoQztZQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1NBQzFCO2FBRUQ7WUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztTQUN0QjtJQUNMLENBQUM7OztZQXZQSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFPLDRCQUE0QjtnQkFDM0Msc3BGQUF1RDtnQkFFdkQsVUFBVSxFQUFLLGNBQWM7Z0JBQzdCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxTQUFTLEVBQU0sQ0FBQyx5Q0FBeUMsQ0FBQzs7YUFDN0Q7Ozs7OzJCQVdJLE1BQU07b0JBcUNOLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE91dHB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgZnVzZUFuaW1hdGlvbnMgfSBmcm9tICcuLi8uLi9hbmltYXRpb25zJztcbmltcG9ydCB7IE1hdENvbG9ycyB9IGZyb20gJy4uLy4uL21hdC1jb2xvcnMnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgRlVTRV9NQVRFUklBTF9DT0xPUl9QSUNLRVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlICAgIDogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRnVzZU1hdGVyaWFsQ29sb3JQaWNrZXJDb21wb25lbnQpLFxuICAgIG11bHRpICAgICAgOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvciAgICAgOiAnZnVzZS1tYXRlcmlhbC1jb2xvci1waWNrZXInLFxuICAgIHRlbXBsYXRlVXJsICA6ICcuL21hdGVyaWFsLWNvbG9yLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzICAgIDogWycuL21hdGVyaWFsLWNvbG9yLXBpY2tlci5jb21wb25lbnQuc2NzcyddLFxuICAgIGFuaW1hdGlvbnMgICA6IGZ1c2VBbmltYXRpb25zLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzICAgIDogW0ZVU0VfTUFURVJJQUxfQ09MT1JfUElDS0VSX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBGdXNlTWF0ZXJpYWxDb2xvclBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG57XG4gICAgY29sb3JzOiBhbnk7XG4gICAgaHVlczogc3RyaW5nW107XG4gICAgdmlldzogc3RyaW5nO1xuICAgIHNlbGVjdGVkQ29sb3I6IGFueTtcbiAgICBzZWxlY3RlZFBhbGV0dGU6IHN0cmluZztcbiAgICBzZWxlY3RlZEh1ZTogc3RyaW5nO1xuXG4gICAgLy8gQ29sb3IgY2hhbmdlZFxuICAgIEBPdXRwdXQoKVxuICAgIGNvbG9yQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT47XG5cbiAgICAvLyBQcml2YXRlXG4gICAgcHJpdmF0ZSBfY29sb3I6IHN0cmluZztcbiAgICBwcml2YXRlIF9tb2RlbENoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gICAgcHJpdmF0ZSBfbW9kZWxUb3VjaGVkOiAodmFsdWU6IGFueSkgPT4gdm9pZDtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgLy8gU2V0IHRoZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLmNvbG9yQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5jb2xvcnMgPSBNYXRDb2xvcnMuYWxsO1xuICAgICAgICB0aGlzLmh1ZXMgPSBbJzUwJywgJzEwMCcsICcyMDAnLCAnMzAwJywgJzQwMCcsICc1MDAnLCAnNjAwJywgJzcwMCcsICc4MDAnLCAnOTAwJywgJ0ExMDAnLCAnQTIwMCcsICdBNDAwJywgJ0E3MDAnXTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEh1ZSA9ICc1MDAnO1xuICAgICAgICB0aGlzLnZpZXcgPSAncGFsZXR0ZXMnO1xuXG4gICAgICAgIC8vIFNldCB0aGUgcHJpdmF0ZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLl9jb2xvciA9ICcnO1xuICAgICAgICB0aGlzLl9tb2RlbENoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fbW9kZWxUb3VjaGVkID0gKCkgPT4ge1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBBY2Nlc3NvcnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0ZWQgY2xhc3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IGNvbG9yKHZhbHVlKVxuICAgIHtcbiAgICAgICAgaWYgKCAhdmFsdWUgfHwgdmFsdWUgPT09ICcnIHx8IHRoaXMuX2NvbG9yID09PSB2YWx1ZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNwbGl0IHRoZSBjb2xvciB2YWx1ZSAocmVkLTQwMCwgYmx1ZS01MDAsIGZ1c2UtbmF2eS03MDAgZXRjLilcbiAgICAgICAgY29uc3QgY29sb3JQYXJ0cyA9IHZhbHVlLnNwbGl0KCctJyk7XG5cbiAgICAgICAgLy8gVGFrZSB0aGUgdmVyeSBsYXN0IHBhcnQgYXMgdGhlIHNlbGVjdGVkIGh1ZSB2YWx1ZVxuICAgICAgICB0aGlzLnNlbGVjdGVkSHVlID0gY29sb3JQYXJ0c1tjb2xvclBhcnRzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgbGFzdCBwYXJ0XG4gICAgICAgIGNvbG9yUGFydHMucG9wKCk7XG5cbiAgICAgICAgLy8gUmVqb2luIHRoZSByZW1haW5pbmcgcGFydHMgYXMgdGhlIHNlbGVjdGVkIHBhbGV0dGUgbmFtZVxuICAgICAgICB0aGlzLnNlbGVjdGVkUGFsZXR0ZSA9IGNvbG9yUGFydHMuam9pbignLScpO1xuXG4gICAgICAgIC8vIFN0b3JlIHRoZSBjb2xvciB2YWx1ZVxuICAgICAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBjb2xvcigpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvciBpbXBsZW1lbnRhdGlvblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBvbiBjaGFuZ2UgZnVuY3Rpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmblxuICAgICAqL1xuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuX21vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgb24gdG91Y2hlZCBmdW5jdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIGZuXG4gICAgICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuX21vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdyaXRlIHZhbHVlIHRvIHRoZSB2aWV3IGZyb20gbW9kZWxcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2xvclxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUoY29sb3I6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFJldHVybiBpZiBudWxsXG4gICAgICAgIGlmICggIWNvbG9yIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IHRoZSBjb2xvclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG5cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzZWxlY3RlZCBjb2xvclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkQ29sb3IoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgUHVibGljIG1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0IHBhbGV0dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqIEBwYXJhbSBwYWxldHRlXG4gICAgICovXG4gICAgc2VsZWN0UGFsZXR0ZShldmVudCwgcGFsZXR0ZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFN0b3AgcHJvcGFnYXRpb25cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgLy8gR28gdG8gJ2h1ZXMnIHZpZXdcbiAgICAgICAgdGhpcy52aWV3ID0gJ2h1ZXMnO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgc2VsZWN0ZWQgcGFsZXR0ZVxuICAgICAgICB0aGlzLnNlbGVjdGVkUGFsZXR0ZSA9IHBhbGV0dGU7XG5cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzZWxlY3RlZCBjb2xvclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkQ29sb3IoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgaHVlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKiBAcGFyYW0gaHVlXG4gICAgICovXG4gICAgc2VsZWN0SHVlKGV2ZW50LCBodWUpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBTdG9wIHByb3BhZ2F0aW9uXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgc2VsZWN0ZWQgaHVzZVxuICAgICAgICB0aGlzLnNlbGVjdGVkSHVlID0gaHVlO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgc2VsZWN0ZWQgY29sb3JcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZENvbG9yKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGNvbG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICByZW1vdmVDb2xvcihldmVudCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFN0b3AgcHJvcGFnYXRpb25cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgLy8gUmV0dXJuIHRvIHRoZSAncGFsZXR0ZXMnIHZpZXdcbiAgICAgICAgdGhpcy52aWV3ID0gJ3BhbGV0dGVzJztcblxuICAgICAgICAvLyBDbGVhciB0aGUgc2VsZWN0ZWQgcGFsZXR0ZSBhbmQgaHVlXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQYWxldHRlID0gJyc7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRIdWUgPSAnJztcblxuICAgICAgICAvLyBVcGRhdGUgdGhlIHNlbGVjdGVkIGNvbG9yXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRDb2xvcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBzZWxlY3RlZCBjb2xvclxuICAgICAqL1xuICAgIHVwZGF0ZVNlbGVjdGVkQ29sb3IoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKCB0aGlzLnNlbGVjdGVkQ29sb3IgJiYgdGhpcy5zZWxlY3RlZENvbG9yLnBhbGV0dGUgPT09IHRoaXMuc2VsZWN0ZWRQYWxldHRlICYmIHRoaXMuc2VsZWN0ZWRDb2xvci5odWUgPT09IHRoaXMuc2VsZWN0ZWRIdWUgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgdGhlIHNlbGVjdGVkIGNvbG9yIG9iamVjdFxuICAgICAgICB0aGlzLnNlbGVjdGVkQ29sb3IgPSB7XG4gICAgICAgICAgICBwYWxldHRlOiB0aGlzLnNlbGVjdGVkUGFsZXR0ZSxcbiAgICAgICAgICAgIGh1ZSAgICA6IHRoaXMuc2VsZWN0ZWRIdWUsXG4gICAgICAgICAgICBjbGFzcyAgOiB0aGlzLnNlbGVjdGVkUGFsZXR0ZSArICctJyArIHRoaXMuc2VsZWN0ZWRIdWUsXG4gICAgICAgICAgICBiZyAgICAgOiB0aGlzLnNlbGVjdGVkUGFsZXR0ZSA9PT0gJycgPyAnJyA6IE1hdENvbG9ycy5nZXRDb2xvcih0aGlzLnNlbGVjdGVkUGFsZXR0ZSlbdGhpcy5zZWxlY3RlZEh1ZV0sXG4gICAgICAgICAgICBmZyAgICAgOiB0aGlzLnNlbGVjdGVkUGFsZXR0ZSA9PT0gJycgPyAnJyA6IE1hdENvbG9ycy5nZXRDb2xvcih0aGlzLnNlbGVjdGVkUGFsZXR0ZSkuY29udHJhc3RbdGhpcy5zZWxlY3RlZEh1ZV1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBFbWl0IHRoZSBjb2xvciBjaGFuZ2VkIGV2ZW50XG4gICAgICAgIHRoaXMuY29sb3JDaGFuZ2VkLmVtaXQodGhpcy5zZWxlY3RlZENvbG9yKTtcblxuICAgICAgICAvLyBNYXJrIHRoZSBtb2RlbCBhcyB0b3VjaGVkXG4gICAgICAgIHRoaXMuX21vZGVsVG91Y2hlZCh0aGlzLnNlbGVjdGVkQ29sb3IuY2xhc3MpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgbW9kZWxcbiAgICAgICAgdGhpcy5fbW9kZWxDaGFuZ2UodGhpcy5zZWxlY3RlZENvbG9yLmNsYXNzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHbyB0byBwYWxldHRlcyB2aWV3XG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBnb1RvUGFsZXR0ZXNWaWV3KGV2ZW50KTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gU3RvcCBwcm9wYWdhdGlvblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLnZpZXcgPSAncGFsZXR0ZXMnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uIG1lbnUgb3BlblxuICAgICAqL1xuICAgIG9uTWVudU9wZW4oKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKCB0aGlzLnNlbGVjdGVkUGFsZXR0ZSA9PT0gJycgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSAncGFsZXR0ZXMnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy52aWV3ID0gJ2h1ZXMnO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19