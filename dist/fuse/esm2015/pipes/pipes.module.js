import { NgModule } from '@angular/core';
import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
export class FusePipesModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsicGlwZXMvcGlwZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQW1CN0QsTUFBTSxPQUFPLGVBQWU7OztZQWpCM0IsUUFBUSxTQUFDO2dCQUNOLFlBQVksRUFBRTtvQkFDVixRQUFRO29CQUNSLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixVQUFVO29CQUNWLG1CQUFtQjtpQkFDdEI7Z0JBQ0QsT0FBTyxFQUFPLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBTztvQkFDVixRQUFRO29CQUNSLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixVQUFVO29CQUNWLG1CQUFtQjtpQkFDdEI7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEtleXNQaXBlIH0gZnJvbSAnLi9rZXlzLnBpcGUnO1xuaW1wb3J0IHsgR2V0QnlJZFBpcGUgfSBmcm9tICcuL2dldEJ5SWQucGlwZSc7XG5pbXBvcnQgeyBIdG1sVG9QbGFpbnRleHRQaXBlIH0gZnJvbSAnLi9odG1sVG9QbGFpbnRleHQucGlwZSc7XG5pbXBvcnQgeyBGaWx0ZXJQaXBlIH0gZnJvbSAnLi9maWx0ZXIucGlwZSc7XG5pbXBvcnQgeyBDYW1lbENhc2VUb0Rhc2hQaXBlIH0gZnJvbSAnLi9jYW1lbENhc2VUb0Rhc2gucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEtleXNQaXBlLFxuICAgICAgICBHZXRCeUlkUGlwZSxcbiAgICAgICAgSHRtbFRvUGxhaW50ZXh0UGlwZSxcbiAgICAgICAgRmlsdGVyUGlwZSxcbiAgICAgICAgQ2FtZWxDYXNlVG9EYXNoUGlwZVxuICAgIF0sXG4gICAgaW1wb3J0cyAgICAgOiBbXSxcbiAgICBleHBvcnRzICAgICA6IFtcbiAgICAgICAgS2V5c1BpcGUsXG4gICAgICAgIEdldEJ5SWRQaXBlLFxuICAgICAgICBIdG1sVG9QbGFpbnRleHRQaXBlLFxuICAgICAgICBGaWx0ZXJQaXBlLFxuICAgICAgICBDYW1lbENhc2VUb0Rhc2hQaXBlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBGdXNlUGlwZXNNb2R1bGVcbntcbn1cbiJdfQ==