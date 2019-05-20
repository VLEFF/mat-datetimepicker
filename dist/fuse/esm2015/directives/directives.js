import { NgModule } from '@angular/core';
import { FuseIfOnDomDirective } from './fuse-if-on-dom/fuse-if-on-dom.directive';
import { FuseInnerScrollDirective } from './fuse-inner-scroll/fuse-inner-scroll.directive';
import { FusePerfectScrollbarDirective } from './fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseMatSidenavHelperDirective, FuseMatSidenavTogglerDirective } from './fuse-mat-sidenav/fuse-mat-sidenav.directive';
export class FuseDirectivesModule {
}
FuseDirectivesModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FuseIfOnDomDirective,
                    FuseInnerScrollDirective,
                    FuseMatSidenavHelperDirective,
                    FuseMatSidenavTogglerDirective,
                    FusePerfectScrollbarDirective
                ],
                imports: [],
                exports: [
                    FuseIfOnDomDirective,
                    FuseInnerScrollDirective,
                    FuseMatSidenavHelperDirective,
                    FuseMatSidenavTogglerDirective,
                    FusePerfectScrollbarDirective
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQzFHLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSw4QkFBOEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBbUI5SCxNQUFNLE9BQU8sb0JBQW9COzs7WUFqQmhDLFFBQVEsU0FBQztnQkFDTixZQUFZLEVBQUU7b0JBQ1Ysb0JBQW9CO29CQUNwQix3QkFBd0I7b0JBQ3hCLDZCQUE2QjtvQkFDN0IsOEJBQThCO29CQUM5Qiw2QkFBNkI7aUJBQ2hDO2dCQUNELE9BQU8sRUFBTyxFQUFFO2dCQUNoQixPQUFPLEVBQU87b0JBQ1Ysb0JBQW9CO29CQUNwQix3QkFBd0I7b0JBQ3hCLDZCQUE2QjtvQkFDN0IsOEJBQThCO29CQUM5Qiw2QkFBNkI7aUJBQ2hDO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGdXNlSWZPbkRvbURpcmVjdGl2ZSB9IGZyb20gJy4vZnVzZS1pZi1vbi1kb20vZnVzZS1pZi1vbi1kb20uZGlyZWN0aXZlJztcbmltcG9ydCB7IEZ1c2VJbm5lclNjcm9sbERpcmVjdGl2ZSB9IGZyb20gJy4vZnVzZS1pbm5lci1zY3JvbGwvZnVzZS1pbm5lci1zY3JvbGwuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZ1c2VQZXJmZWN0U2Nyb2xsYmFyRGlyZWN0aXZlIH0gZnJvbSAnLi9mdXNlLXBlcmZlY3Qtc2Nyb2xsYmFyL2Z1c2UtcGVyZmVjdC1zY3JvbGxiYXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZ1c2VNYXRTaWRlbmF2SGVscGVyRGlyZWN0aXZlLCBGdXNlTWF0U2lkZW5hdlRvZ2dsZXJEaXJlY3RpdmUgfSBmcm9tICcuL2Z1c2UtbWF0LXNpZGVuYXYvZnVzZS1tYXQtc2lkZW5hdi5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBGdXNlSWZPbkRvbURpcmVjdGl2ZSxcbiAgICAgICAgRnVzZUlubmVyU2Nyb2xsRGlyZWN0aXZlLFxuICAgICAgICBGdXNlTWF0U2lkZW5hdkhlbHBlckRpcmVjdGl2ZSxcbiAgICAgICAgRnVzZU1hdFNpZGVuYXZUb2dnbGVyRGlyZWN0aXZlLFxuICAgICAgICBGdXNlUGVyZmVjdFNjcm9sbGJhckRpcmVjdGl2ZVxuICAgIF0sXG4gICAgaW1wb3J0cyAgICAgOiBbXSxcbiAgICBleHBvcnRzICAgICA6IFtcbiAgICAgICAgRnVzZUlmT25Eb21EaXJlY3RpdmUsXG4gICAgICAgIEZ1c2VJbm5lclNjcm9sbERpcmVjdGl2ZSxcbiAgICAgICAgRnVzZU1hdFNpZGVuYXZIZWxwZXJEaXJlY3RpdmUsXG4gICAgICAgIEZ1c2VNYXRTaWRlbmF2VG9nZ2xlckRpcmVjdGl2ZSxcbiAgICAgICAgRnVzZVBlcmZlY3RTY3JvbGxiYXJEaXJlY3RpdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEZ1c2VEaXJlY3RpdmVzTW9kdWxlXG57XG59XG4iXX0=