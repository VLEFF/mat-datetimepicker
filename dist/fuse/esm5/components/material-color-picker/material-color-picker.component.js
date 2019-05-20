import { Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../animations';
import { MatColors } from '../../mat-colors';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var FUSE_MATERIAL_COLOR_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return FuseMaterialColorPickerComponent; }),
    multi: true
};
var FuseMaterialColorPickerComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function FuseMaterialColorPickerComponent() {
        // Set the defaults
        this.colorChanged = new EventEmitter();
        this.colors = MatColors.all;
        this.hues = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'A100', 'A200', 'A400', 'A700'];
        this.selectedHue = '500';
        this.view = 'palettes';
        // Set the private defaults
        this._color = '';
        this._modelChange = function () {
        };
        this._modelTouched = function () {
        };
    }
    Object.defineProperty(FuseMaterialColorPickerComponent.prototype, "color", {
        get: function () {
            return this._color;
        },
        // -----------------------------------------------------------------------------------------------------
        // @ Accessors
        // -----------------------------------------------------------------------------------------------------
        /**
         * Selected class
         *
         * @param value
         */
        set: function (value) {
            if (!value || value === '' || this._color === value) {
                return;
            }
            // Split the color value (red-400, blue-500, fuse-navy-700 etc.)
            var colorParts = value.split('-');
            // Take the very last part as the selected hue value
            this.selectedHue = colorParts[colorParts.length - 1];
            // Remove the last part
            colorParts.pop();
            // Rejoin the remaining parts as the selected palette name
            this.selectedPalette = colorParts.join('-');
            // Store the color value
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    // -----------------------------------------------------------------------------------------------------
    // @ Control Value Accessor implementation
    // -----------------------------------------------------------------------------------------------------
    /**
     * Register on change function
     *
     * @param fn
     */
    FuseMaterialColorPickerComponent.prototype.registerOnChange = function (fn) {
        this._modelChange = fn;
    };
    /**
     * Register on touched function
     *
     * @param fn
     */
    FuseMaterialColorPickerComponent.prototype.registerOnTouched = function (fn) {
        this._modelTouched = fn;
    };
    /**
     * Write value to the view from model
     *
     * @param color
     */
    FuseMaterialColorPickerComponent.prototype.writeValue = function (color) {
        // Return if null
        if (!color) {
            return;
        }
        // Set the color
        this.color = color;
        // Update the selected color
        this.updateSelectedColor();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Select palette
     *
     * @param event
     * @param palette
     */
    FuseMaterialColorPickerComponent.prototype.selectPalette = function (event, palette) {
        // Stop propagation
        event.stopPropagation();
        // Go to 'hues' view
        this.view = 'hues';
        // Update the selected palette
        this.selectedPalette = palette;
        // Update the selected color
        this.updateSelectedColor();
    };
    /**
     * Select hue
     *
     * @param event
     * @param hue
     */
    FuseMaterialColorPickerComponent.prototype.selectHue = function (event, hue) {
        // Stop propagation
        event.stopPropagation();
        // Update the selected huse
        this.selectedHue = hue;
        // Update the selected color
        this.updateSelectedColor();
    };
    /**
     * Remove color
     *
     * @param event
     */
    FuseMaterialColorPickerComponent.prototype.removeColor = function (event) {
        // Stop propagation
        event.stopPropagation();
        // Return to the 'palettes' view
        this.view = 'palettes';
        // Clear the selected palette and hue
        this.selectedPalette = '';
        this.selectedHue = '';
        // Update the selected color
        this.updateSelectedColor();
    };
    /**
     * Update selected color
     */
    FuseMaterialColorPickerComponent.prototype.updateSelectedColor = function () {
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
    };
    /**
     * Go to palettes view
     *
     * @param event
     */
    FuseMaterialColorPickerComponent.prototype.goToPalettesView = function (event) {
        // Stop propagation
        event.stopPropagation();
        this.view = 'palettes';
    };
    /**
     * On menu open
     */
    FuseMaterialColorPickerComponent.prototype.onMenuOpen = function () {
        if (this.selectedPalette === '') {
            this.view = 'palettes';
        }
        else {
            this.view = 'hues';
        }
    };
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
    FuseMaterialColorPickerComponent.ctorParameters = function () { return []; };
    FuseMaterialColorPickerComponent.propDecorators = {
        colorChanged: [{ type: Output }],
        color: [{ type: Input }]
    };
    return FuseMaterialColorPickerComponent;
}());
export { FuseMaterialColorPickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtY29sb3ItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWF0ZXJpYWwtY29sb3ItcGlja2VyL21hdGVyaWFsLWNvbG9yLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM3QyxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxDQUFDLElBQU0seUNBQXlDLEdBQVE7SUFDMUQsT0FBTyxFQUFNLGlCQUFpQjtJQUM5QixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxnQ0FBZ0MsRUFBaEMsQ0FBZ0MsQ0FBQztJQUMvRCxLQUFLLEVBQVEsSUFBSTtDQUNwQixDQUFDO0FBRUY7SUEwQkk7O09BRUc7SUFDSDtRQUVJLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEgsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENB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O1FBRTdDLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwyREFBZ0IsR0FBaEIsVUFBaUIsS0FBSztRQUVsQixtQkFBbUI7UUFDbkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNILHFEQUFVLEdBQVY7UUFFSSxJQUFLLElBQUksQ0FBQyxlQUFlLEtBQUssRUFBRSxFQUNoQztZQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1NBQzFCO2FBRUQ7WUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztTQUN0QjtJQUNMLENBQUM7O2dCQXZQSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFPLDRCQUE0QjtvQkFDM0Msc3BGQUF1RDtvQkFFdkQsVUFBVSxFQUFLLGNBQWM7b0JBQzdCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxTQUFTLEVBQU0sQ0FBQyx5Q0FBeUMsQ0FBQzs7aUJBQzdEOzs7OzsrQkFXSSxNQUFNO3dCQXFDTixLQUFLOztJQWlNVix1Q0FBQztDQUFBLEFBeFBELElBd1BDO1NBaFBZLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT3V0cHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBmdXNlQW5pbWF0aW9ucyB9IGZyb20gJy4uLy4uL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWF0Q29sb3JzIH0gZnJvbSAnLi4vLi4vbWF0LWNvbG9ycyc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBGVVNFX01BVEVSSUFMX0NPTE9SX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGUgICAgOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBGdXNlTWF0ZXJpYWxDb2xvclBpY2tlckNvbXBvbmVudCksXG4gICAgbXVsdGkgICAgICA6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yICAgICA6ICdmdXNlLW1hdGVyaWFsLWNvbG9yLXBpY2tlcicsXG4gICAgdGVtcGxhdGVVcmwgIDogJy4vbWF0ZXJpYWwtY29sb3ItcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHMgICAgOiBbJy4vbWF0ZXJpYWwtY29sb3ItcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgYW5pbWF0aW9ucyAgIDogZnVzZUFuaW1hdGlvbnMsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnMgICAgOiBbRlVTRV9NQVRFUklBTF9DT0xPUl9QSUNLRVJfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIEZ1c2VNYXRlcmlhbENvbG9yUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3JcbntcbiAgICBjb2xvcnM6IGFueTtcbiAgICBodWVzOiBzdHJpbmdbXTtcbiAgICB2aWV3OiBzdHJpbmc7XG4gICAgc2VsZWN0ZWRDb2xvcjogYW55O1xuICAgIHNlbGVjdGVkUGFsZXR0ZTogc3RyaW5nO1xuICAgIHNlbGVjdGVkSHVlOiBzdHJpbmc7XG5cbiAgICAvLyBDb2xvciBjaGFuZ2VkXG4gICAgQE91dHB1dCgpXG4gICAgY29sb3JDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PjtcblxuICAgIC8vIFByaXZhdGVcbiAgICBwcml2YXRlIF9jb2xvcjogc3RyaW5nO1xuICAgIHByaXZhdGUgX21vZGVsQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZDtcbiAgICBwcml2YXRlIF9tb2RlbFRvdWNoZWQ6ICh2YWx1ZTogYW55KSA9PiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICAvLyBTZXQgdGhlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuY29sb3JDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLmNvbG9ycyA9IE1hdENvbG9ycy5hbGw7XG4gICAgICAgIHRoaXMuaHVlcyA9IFsnNTAnLCAnMTAwJywgJzIwMCcsICczMDAnLCAnNDAwJywgJzUwMCcsICc2MDAnLCAnNzAwJywgJzgwMCcsICc5MDAnLCAnQTEwMCcsICdBMjAwJywgJ0E0MDAnLCAnQTcwMCddO1xuICAgICAgICB0aGlzLnNlbGVjdGVkSHVlID0gJzUwMCc7XG4gICAgICAgIHRoaXMudmlldyA9ICdwYWxldHRlcyc7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBwcml2YXRlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuX2NvbG9yID0gJyc7XG4gICAgICAgIHRoaXMuX21vZGVsQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9tb2RlbFRvdWNoZWQgPSAoKSA9PiB7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIEFjY2Vzc29yc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3RlZCBjbGFzc1xuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZXQgY29sb3IodmFsdWUpXG4gICAge1xuICAgICAgICBpZiAoICF2YWx1ZSB8fCB2YWx1ZSA9PT0gJycgfHwgdGhpcy5fY29sb3IgPT09IHZhbHVlIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3BsaXQgdGhlIGNvbG9yIHZhbHVlIChyZWQtNDAwLCBibHVlLTUwMCwgZnVzZS1uYXZ5LTcwMCBldGMuKVxuICAgICAgICBjb25zdCBjb2xvclBhcnRzID0gdmFsdWUuc3BsaXQoJy0nKTtcblxuICAgICAgICAvLyBUYWtlIHRoZSB2ZXJ5IGxhc3QgcGFydCBhcyB0aGUgc2VsZWN0ZWQgaHVlIHZhbHVlXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRIdWUgPSBjb2xvclBhcnRzW2NvbG9yUGFydHMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBsYXN0IHBhcnRcbiAgICAgICAgY29sb3JQYXJ0cy5wb3AoKTtcblxuICAgICAgICAvLyBSZWpvaW4gdGhlIHJlbWFpbmluZyBwYXJ0cyBhcyB0aGUgc2VsZWN0ZWQgcGFsZXR0ZSBuYW1lXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQYWxldHRlID0gY29sb3JQYXJ0cy5qb2luKCctJyk7XG5cbiAgICAgICAgLy8gU3RvcmUgdGhlIGNvbG9yIHZhbHVlXG4gICAgICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGNvbG9yKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBDb250cm9sIFZhbHVlIEFjY2Vzc29yIGltcGxlbWVudGF0aW9uXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIG9uIGNoYW5nZSBmdW5jdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIGZuXG4gICAgICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5fbW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBvbiB0b3VjaGVkIGZ1bmN0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZm5cbiAgICAgKi9cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5fbW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV3JpdGUgdmFsdWUgdG8gdGhlIHZpZXcgZnJvbSBtb2RlbFxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbG9yXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZShjb2xvcjogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gUmV0dXJuIGlmIG51bGxcbiAgICAgICAgaWYgKCAhY29sb3IgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgdGhlIGNvbG9yXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcblxuICAgICAgICAvLyBVcGRhdGUgdGhlIHNlbGVjdGVkIGNvbG9yXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRDb2xvcigpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBQdWJsaWMgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgcGFsZXR0ZVxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICogQHBhcmFtIHBhbGV0dGVcbiAgICAgKi9cbiAgICBzZWxlY3RQYWxldHRlKGV2ZW50LCBwYWxldHRlKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gU3RvcCBwcm9wYWdhdGlvblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAvLyBHbyB0byAnaHVlcycgdmlld1xuICAgICAgICB0aGlzLnZpZXcgPSAnaHVlcyc7XG5cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzZWxlY3RlZCBwYWxldHRlXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQYWxldHRlID0gcGFsZXR0ZTtcblxuICAgICAgICAvLyBVcGRhdGUgdGhlIHNlbGVjdGVkIGNvbG9yXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRDb2xvcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCBodWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqIEBwYXJhbSBodWVcbiAgICAgKi9cbiAgICBzZWxlY3RIdWUoZXZlbnQsIGh1ZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFN0b3AgcHJvcGFnYXRpb25cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzZWxlY3RlZCBodXNlXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRIdWUgPSBodWU7XG5cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzZWxlY3RlZCBjb2xvclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkQ29sb3IoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgY29sb3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIHJlbW92ZUNvbG9yKGV2ZW50KTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gU3RvcCBwcm9wYWdhdGlvblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAvLyBSZXR1cm4gdG8gdGhlICdwYWxldHRlcycgdmlld1xuICAgICAgICB0aGlzLnZpZXcgPSAncGFsZXR0ZXMnO1xuXG4gICAgICAgIC8vIENsZWFyIHRoZSBzZWxlY3RlZCBwYWxldHRlIGFuZCBodWVcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBhbGV0dGUgPSAnJztcbiAgICAgICAgdGhpcy5zZWxlY3RlZEh1ZSA9ICcnO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgc2VsZWN0ZWQgY29sb3JcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZENvbG9yKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHNlbGVjdGVkIGNvbG9yXG4gICAgICovXG4gICAgdXBkYXRlU2VsZWN0ZWRDb2xvcigpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoIHRoaXMuc2VsZWN0ZWRDb2xvciAmJiB0aGlzLnNlbGVjdGVkQ29sb3IucGFsZXR0ZSA9PT0gdGhpcy5zZWxlY3RlZFBhbGV0dGUgJiYgdGhpcy5zZWxlY3RlZENvbG9yLmh1ZSA9PT0gdGhpcy5zZWxlY3RlZEh1ZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCB0aGUgc2VsZWN0ZWQgY29sb3Igb2JqZWN0XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDb2xvciA9IHtcbiAgICAgICAgICAgIHBhbGV0dGU6IHRoaXMuc2VsZWN0ZWRQYWxldHRlLFxuICAgICAgICAgICAgaHVlICAgIDogdGhpcy5zZWxlY3RlZEh1ZSxcbiAgICAgICAgICAgIGNsYXNzICA6IHRoaXMuc2VsZWN0ZWRQYWxldHRlICsgJy0nICsgdGhpcy5zZWxlY3RlZEh1ZSxcbiAgICAgICAgICAgIGJnICAgICA6IHRoaXMuc2VsZWN0ZWRQYWxldHRlID09PSAnJyA/ICcnIDogTWF0Q29sb3JzLmdldENvbG9yKHRoaXMuc2VsZWN0ZWRQYWxldHRlKVt0aGlzLnNlbGVjdGVkSHVlXSxcbiAgICAgICAgICAgIGZnICAgICA6IHRoaXMuc2VsZWN0ZWRQYWxldHRlID09PSAnJyA/ICcnIDogTWF0Q29sb3JzLmdldENvbG9yKHRoaXMuc2VsZWN0ZWRQYWxldHRlKS5jb250cmFzdFt0aGlzLnNlbGVjdGVkSHVlXVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEVtaXQgdGhlIGNvbG9yIGNoYW5nZWQgZXZlbnRcbiAgICAgICAgdGhpcy5jb2xvckNoYW5nZWQuZW1pdCh0aGlzLnNlbGVjdGVkQ29sb3IpO1xuXG4gICAgICAgIC8vIE1hcmsgdGhlIG1vZGVsIGFzIHRvdWNoZWRcbiAgICAgICAgdGhpcy5fbW9kZWxUb3VjaGVkKHRoaXMuc2VsZWN0ZWRDb2xvci5jbGFzcyk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBtb2RlbFxuICAgICAgICB0aGlzLl9tb2RlbENoYW5nZSh0aGlzLnNlbGVjdGVkQ29sb3IuY2xhc3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdvIHRvIHBhbGV0dGVzIHZpZXdcbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIGdvVG9QYWxldHRlc1ZpZXcoZXZlbnQpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBTdG9wIHByb3BhZ2F0aW9uXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMudmlldyA9ICdwYWxldHRlcyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT24gbWVudSBvcGVuXG4gICAgICovXG4gICAgb25NZW51T3BlbigpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoIHRoaXMuc2VsZWN0ZWRQYWxldHRlID09PSAnJyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudmlldyA9ICdwYWxldHRlcyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSAnaHVlcyc7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=