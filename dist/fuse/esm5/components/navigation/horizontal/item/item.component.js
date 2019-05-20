import { Component, HostBinding, Input } from '@angular/core';
var FuseNavHorizontalItemComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function FuseNavHorizontalItemComponent() {
        this.classes = 'nav-item';
    }
    FuseNavHorizontalItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-nav-horizontal-item',
                    template: "<ng-container *ngIf=\"!item.hidden\">\n\n    <!-- item.url -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && !item.function\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\"\n       [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && !item.function\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.function -->\n    <span class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"!item.url && item.function\"\n          (click)=\"item.function()\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </span>\n\n    <!-- item.url && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && item.function\"\n       (click)=\"item.function()\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\"\n       [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && item.function\"\n       (click)=\"item.function()\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <ng-template #itemContent>\n        <mat-icon class=\"nav-link-icon\" *ngIf=\"item.icon\">{{item.icon}}</mat-icon>\n        <span class=\"nav-link-title\" [translate]=\"item.translate\">{{item.title}}</span>\n        <span class=\"nav-link-badge\" *ngIf=\"item.badge\" [translate]=\"item.badge.translate\"\n              [ngStyle]=\"{'background-color': item.badge.bg,'color': item.badge.fg}\">\n            {{item.badge.title}}\n        </span>\n    </ng-template>\n\n</ng-container>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    FuseNavHorizontalItemComponent.ctorParameters = function () { return []; };
    FuseNavHorizontalItemComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ['class',] }],
        item: [{ type: Input }]
    };
    return FuseNavHorizontalItemComponent;
}());
export { FuseNavHorizontalItemComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25hdmlnYXRpb24vaG9yaXpvbnRhbC9pdGVtL2l0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RDtJQWFJOztPQUVHO0lBQ0g7UUFSQSxZQUFPLEdBQUcsVUFBVSxDQUFDO0lBV3JCLENBQUM7O2dCQW5CSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFLLDBCQUEwQjtvQkFDdkMseTBFQUFvQzs7aUJBRXZDOzs7OzswQkFHSSxXQUFXLFNBQUMsT0FBTzt1QkFHbkIsS0FBSzs7SUFVVixxQ0FBQztDQUFBLEFBcEJELElBb0JDO1NBZlksOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3IgICA6ICdmdXNlLW5hdi1ob3Jpem9udGFsLWl0ZW0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHMgIDogWycuL2l0ZW0uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGdXNlTmF2SG9yaXpvbnRhbEl0ZW1Db21wb25lbnRcbntcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgICBjbGFzc2VzID0gJ25hdi1pdGVtJztcblxuICAgIEBJbnB1dCgpXG4gICAgaXRlbTogYW55O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuXG4gICAgfVxufVxuIl19