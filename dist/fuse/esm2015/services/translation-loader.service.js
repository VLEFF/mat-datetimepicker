import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export class FuseTranslationLoaderService {
    /**
     * Constructor
     *
     * @param {TranslateService} _translateService
     */
    constructor(_translateService) {
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
    loadTranslations(...args) {
        const locales = [...args];
        locales.forEach((locale) => {
            // use setTranslation() with the third argument set to true
            // to append translations instead of replacing them
            this._translateService.setTranslation(locale.lang, locale.data, true);
        });
    }
}
FuseTranslationLoaderService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
FuseTranslationLoaderService.ctorParameters = () => [
    { type: TranslateService }
];
FuseTranslationLoaderService.ngInjectableDef = i0.defineInjectable({ factory: function FuseTranslationLoaderService_Factory() { return new FuseTranslationLoaderService(i0.inject(i1.TranslateService)); }, token: FuseTranslationLoaderService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb24tbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJzZXJ2aWNlcy90cmFuc2xhdGlvbi1sb2FkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7QUFXdkQsTUFBTSxPQUFPLDRCQUE0QjtJQUVyQzs7OztPQUlHO0lBQ0gsWUFDWSxpQkFBbUM7UUFBbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtJQUcvQyxDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG1CQUFtQjtJQUNuQix3R0FBd0c7SUFFeEc7Ozs7T0FJRztJQUNILGdCQUFnQixDQUFDLEdBQUcsSUFBYztRQUU5QixNQUFNLE9BQU8sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFMUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3ZCLDJEQUEyRDtZQUMzRCxtREFBbUQ7WUFDbkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7WUFsQ0osVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7O1lBVlEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvY2FsZVxue1xuICAgIGxhbmc6IHN0cmluZztcbiAgICBkYXRhOiBPYmplY3Q7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRnVzZVRyYW5zbGF0aW9uTG9hZGVyU2VydmljZVxue1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1RyYW5zbGF0ZVNlcnZpY2V9IF90cmFuc2xhdGVTZXJ2aWNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3RyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApXG4gICAge1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBQdWJsaWMgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRyYW5zbGF0aW9uc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtMb2NhbGV9IGFyZ3NcbiAgICAgKi9cbiAgICBsb2FkVHJhbnNsYXRpb25zKC4uLmFyZ3M6IExvY2FsZVtdKTogdm9pZFxuICAgIHtcbiAgICAgICAgY29uc3QgbG9jYWxlcyA9IFsuLi5hcmdzXTtcblxuICAgICAgICBsb2NhbGVzLmZvckVhY2goKGxvY2FsZSkgPT4ge1xuICAgICAgICAgICAgLy8gdXNlIHNldFRyYW5zbGF0aW9uKCkgd2l0aCB0aGUgdGhpcmQgYXJndW1lbnQgc2V0IHRvIHRydWVcbiAgICAgICAgICAgIC8vIHRvIGFwcGVuZCB0cmFuc2xhdGlvbnMgaW5zdGVhZCBvZiByZXBsYWNpbmcgdGhlbVxuICAgICAgICAgICAgdGhpcy5fdHJhbnNsYXRlU2VydmljZS5zZXRUcmFuc2xhdGlvbihsb2NhbGUubGFuZywgbG9jYWxlLmRhdGEsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=