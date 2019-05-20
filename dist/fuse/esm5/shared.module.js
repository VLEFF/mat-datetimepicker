import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseDirectivesModule } from './directives/directives';
import { FusePipesModule } from './pipes/pipes.module';
var FuseSharedModule = /** @class */ (function () {
    function FuseSharedModule() {
    }
    FuseSharedModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        FlexLayoutModule,
                        FuseDirectivesModule,
                        FusePipesModule
                    ],
                    exports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        FlexLayoutModule,
                        FuseDirectivesModule,
                        FusePipesModule
                    ]
                },] }
    ];
    return FuseSharedModule;
}());
export { FuseSharedModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXhELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RDtJQUFBO0lBd0JBLENBQUM7O2dCQXhCQSxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFJO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxtQkFBbUI7d0JBRW5CLGdCQUFnQjt3QkFFaEIsb0JBQW9CO3dCQUNwQixlQUFlO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUk7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFFbkIsZ0JBQWdCO3dCQUVoQixvQkFBb0I7d0JBQ3BCLGVBQWU7cUJBQ2xCO2lCQUNKOztJQUdELHVCQUFDO0NBQUEsQUF4QkQsSUF3QkM7U0FGWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuXG5pbXBvcnQgeyBGdXNlRGlyZWN0aXZlc01vZHVsZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9kaXJlY3RpdmVzJztcbmltcG9ydCB7IEZ1c2VQaXBlc01vZHVsZSB9IGZyb20gJy4vcGlwZXMvcGlwZXMubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzICA6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcblxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuXG4gICAgICAgIEZ1c2VEaXJlY3RpdmVzTW9kdWxlLFxuICAgICAgICBGdXNlUGlwZXNNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHMgIDogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG5cbiAgICAgICAgRnVzZURpcmVjdGl2ZXNNb2R1bGUsXG4gICAgICAgIEZ1c2VQaXBlc01vZHVsZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRnVzZVNoYXJlZE1vZHVsZVxue1xufVxuIl19