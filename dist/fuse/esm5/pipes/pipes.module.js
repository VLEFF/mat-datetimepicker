import { NgModule } from '@angular/core';
import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
var FusePipesModule = /** @class */ (function () {
    function FusePipesModule() {
    }
    FusePipesModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        KeysPipe,
                        GetByIdPipe,
                        HtmlToPlaintextPipe,
                        FilterPipe,
                        CamelCaseToDashPipe
                    ],
                    imports: [],
                    exports: [
                        KeysPipe,
                        GetByIdPipe,
                        HtmlToPlaintextPipe,
                        FilterPipe,
                        CamelCaseToDashPipe
                    ]
                },] }
    ];
    return FusePipesModule;
}());
export { FusePipesModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsicGlwZXMvcGlwZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RDtJQUFBO0lBbUJBLENBQUM7O2dCQW5CQSxRQUFRLFNBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNWLFFBQVE7d0JBQ1IsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLFVBQVU7d0JBQ1YsbUJBQW1CO3FCQUN0QjtvQkFDRCxPQUFPLEVBQU8sRUFBRTtvQkFDaEIsT0FBTyxFQUFPO3dCQUNWLFFBQVE7d0JBQ1IsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLFVBQVU7d0JBQ1YsbUJBQW1CO3FCQUN0QjtpQkFDSjs7SUFHRCxzQkFBQztDQUFBLEFBbkJELElBbUJDO1NBRlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEtleXNQaXBlIH0gZnJvbSAnLi9rZXlzLnBpcGUnO1xuaW1wb3J0IHsgR2V0QnlJZFBpcGUgfSBmcm9tICcuL2dldEJ5SWQucGlwZSc7XG5pbXBvcnQgeyBIdG1sVG9QbGFpbnRleHRQaXBlIH0gZnJvbSAnLi9odG1sVG9QbGFpbnRleHQucGlwZSc7XG5pbXBvcnQgeyBGaWx0ZXJQaXBlIH0gZnJvbSAnLi9maWx0ZXIucGlwZSc7XG5pbXBvcnQgeyBDYW1lbENhc2VUb0Rhc2hQaXBlIH0gZnJvbSAnLi9jYW1lbENhc2VUb0Rhc2gucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEtleXNQaXBlLFxuICAgICAgICBHZXRCeUlkUGlwZSxcbiAgICAgICAgSHRtbFRvUGxhaW50ZXh0UGlwZSxcbiAgICAgICAgRmlsdGVyUGlwZSxcbiAgICAgICAgQ2FtZWxDYXNlVG9EYXNoUGlwZVxuICAgIF0sXG4gICAgaW1wb3J0cyAgICAgOiBbXSxcbiAgICBleHBvcnRzICAgICA6IFtcbiAgICAgICAgS2V5c1BpcGUsXG4gICAgICAgIEdldEJ5SWRQaXBlLFxuICAgICAgICBIdG1sVG9QbGFpbnRleHRQaXBlLFxuICAgICAgICBGaWx0ZXJQaXBlLFxuICAgICAgICBDYW1lbENhc2VUb0Rhc2hQaXBlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBGdXNlUGlwZXNNb2R1bGVcbntcbn1cbiJdfQ==