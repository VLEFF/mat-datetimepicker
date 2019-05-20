import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
var FuseTranslationLoaderService = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {TranslateService} _translateService
     */
    function FuseTranslationLoaderService(_translateService) {
        this._translateService = _translateService;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Load translations
     *
     * @param {Locale} args
     */
    FuseTranslationLoaderService.prototype.loadTranslations = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var locales = tslib_1.__spread(args);
        locales.forEach(function (locale) {
            // use setTranslation() with the third argument set to true
            // to append translations instead of replacing them
            _this._translateService.setTranslation(locale.lang, locale.data, true);
        });
    };
    FuseTranslationLoaderService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FuseTranslationLoaderService.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
    FuseTranslationLoaderService.ngInjectableDef = i0.defineInjectable({ factory: function FuseTranslationLoaderService_Factory() { return new FuseTranslationLoaderService(i0.inject(i1.TranslateService)); }, token: FuseTranslationLoaderService, providedIn: "root" });
    return FuseTranslationLoaderService;
}());
export { FuseTranslationLoaderService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb24tbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJzZXJ2aWNlcy90cmFuc2xhdGlvbi1sb2FkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBUXZEO0lBS0k7Ozs7T0FJRztJQUNILHNDQUNZLGlCQUFtQztRQUFuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO0lBRy9DLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsbUJBQW1CO0lBQ25CLHdHQUF3RztJQUV4Rzs7OztPQUlHO0lBQ0gsdURBQWdCLEdBQWhCO1FBQUEsaUJBU0M7UUFUZ0IsY0FBaUI7YUFBakIsVUFBaUIsRUFBakIscUJBQWlCLEVBQWpCLElBQWlCO1lBQWpCLHlCQUFpQjs7UUFFOUIsSUFBTSxPQUFPLG9CQUFPLElBQUksQ0FBQyxDQUFDO1FBRTFCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO1lBQ25CLDJEQUEyRDtZQUMzRCxtREFBbUQ7WUFDbkQsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztnQkFsQ0osVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7OztnQkFWUSxnQkFBZ0I7Ozt1Q0FEekI7Q0E0Q0MsQUFuQ0QsSUFtQ0M7U0FoQ1ksNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvY2FsZVxue1xuICAgIGxhbmc6IHN0cmluZztcbiAgICBkYXRhOiBPYmplY3Q7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRnVzZVRyYW5zbGF0aW9uTG9hZGVyU2VydmljZVxue1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1RyYW5zbGF0ZVNlcnZpY2V9IF90cmFuc2xhdGVTZXJ2aWNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3RyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApXG4gICAge1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBQdWJsaWMgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRyYW5zbGF0aW9uc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtMb2NhbGV9IGFyZ3NcbiAgICAgKi9cbiAgICBsb2FkVHJhbnNsYXRpb25zKC4uLmFyZ3M6IExvY2FsZVtdKTogdm9pZFxuICAgIHtcbiAgICAgICAgY29uc3QgbG9jYWxlcyA9IFsuLi5hcmdzXTtcblxuICAgICAgICBsb2NhbGVzLmZvckVhY2goKGxvY2FsZSkgPT4ge1xuICAgICAgICAgICAgLy8gdXNlIHNldFRyYW5zbGF0aW9uKCkgd2l0aCB0aGUgdGhpcmQgYXJndW1lbnQgc2V0IHRvIHRydWVcbiAgICAgICAgICAgIC8vIHRvIGFwcGVuZCB0cmFuc2xhdGlvbnMgaW5zdGVhZCBvZiByZXBsYWNpbmcgdGhlbVxuICAgICAgICAgICAgdGhpcy5fdHJhbnNsYXRlU2VydmljZS5zZXRUcmFuc2xhdGlvbihsb2NhbGUubGFuZywgbG9jYWxlLmRhdGEsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=