import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FUSE_CONFIG } from './services/config.service';
var FuseModule = /** @class */ (function () {
    function FuseModule(parentModule) {
        if (parentModule) {
            throw new Error('FuseModule is already loaded. Import it in the AppModule only!');
        }
    }
    FuseModule.forRoot = function (config) {
        return {
            ngModule: FuseModule,
            providers: [
                {
                    provide: FUSE_CONFIG,
                    useValue: config
                }
            ]
        };
    };
    FuseModule.decorators = [
        { type: NgModule }
    ];
    /** @nocollapse */
    FuseModule.ctorParameters = function () { return [
        { type: FuseModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    return FuseModule;
}());
export { FuseModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVzZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJmdXNlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWxGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUV4RDtJQUdJLG9CQUFvQyxZQUF3QjtRQUV4RCxJQUFLLFlBQVksRUFDakI7WUFDSSxNQUFNLElBQUksS0FBSyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7U0FDckY7SUFDTCxDQUFDO0lBRU0sa0JBQU8sR0FBZCxVQUFlLE1BQU07UUFFakIsT0FBTztZQUNILFFBQVEsRUFBRyxVQUFVO1lBQ3JCLFNBQVMsRUFBRTtnQkFDUDtvQkFDSSxPQUFPLEVBQUcsV0FBVztvQkFDckIsUUFBUSxFQUFFLE1BQU07aUJBQ25CO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQzs7Z0JBdEJKLFFBQVE7Ozs7Z0JBRzZDLFVBQVUsdUJBQS9DLFFBQVEsWUFBSSxRQUFROztJQW9CckMsaUJBQUM7Q0FBQSxBQXZCRCxJQXVCQztTQXRCWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGVVNFX0NPTkZJRyB9IGZyb20gJy4vc2VydmljZXMvY29uZmlnLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoKVxuZXhwb3J0IGNsYXNzIEZ1c2VNb2R1bGVcbntcbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IEZ1c2VNb2R1bGUpXG4gICAge1xuICAgICAgICBpZiAoIHBhcmVudE1vZHVsZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRnVzZU1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGl0IGluIHRoZSBBcHBNb2R1bGUgb25seSEnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBmb3JSb290KGNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnNcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZSA6IEZ1c2VNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGUgOiBGVVNFX0NPTkZJRyxcbiAgICAgICAgICAgICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=