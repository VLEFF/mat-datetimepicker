import { Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseProgressBarService } from './progress-bar.service';
export class FuseProgressBarComponent {
    /**
     * Constructor
     *
     * @param {FuseProgressBarService} _fuseProgressBarService
     */
    constructor(_fuseProgressBarService) {
        // Set the defaults
        this._fuseProgressBarService = _fuseProgressBarService;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Subscribe to the progress bar service properties
        // Buffer value
        this._fuseProgressBarService.bufferValue
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((bufferValue) => {
            this.bufferValue = bufferValue;
        });
        // Mode
        this._fuseProgressBarService.mode
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mode) => {
            this.mode = mode;
        });
        // Value
        this._fuseProgressBarService.value
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) => {
            this.value = value;
        });
        // Visible
        this._fuseProgressBarService.visible
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((visible) => {
            this.visible = visible;
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
FuseProgressBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuse-progress-bar',
                template: "<ng-container *ngIf=\"visible\">\n\n    <mat-progress-bar color=\"accent\" [bufferValue]=\"bufferValue\" [mode]=\"mode\" [value]=\"value\"></mat-progress-bar>\n\n</ng-container>\n",
                encapsulation: ViewEncapsulation.None,
                styles: ["fuse-progress-bar{position:absolute;top:0;left:0;right:0;width:100%;z-index:99998}fuse-progress-bar mat-progress-bar .mat-progress-bar-buffer{background-color:#c5c6cb!important}"]
            }] }
];
/** @nocollapse */
FuseProgressBarComponent.ctorParameters = () => [
    { type: FuseProgressBarService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcHJvZ3Jlc3MtYmFyL3Byb2dyZXNzLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFRaEUsTUFBTSxPQUFPLHdCQUF3QjtJQVVqQzs7OztPQUlHO0lBQ0gsWUFDWSx1QkFBK0M7UUFHdkQsbUJBQW1CO1FBSFgsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUt2RCwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsb0JBQW9CO0lBQ3BCLHdHQUF3RztJQUV4Rzs7T0FFRztJQUNILFFBQVE7UUFFSixtREFBbUQ7UUFFbkQsZUFBZTtRQUNmLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXO2FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3JDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRVAsT0FBTztRQUNQLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJO2FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3JDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBRVAsUUFBUTtRQUNSLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLO2FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3JDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBRVAsVUFBVTtRQUNWLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPO2FBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3JDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBRVgsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUVQLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7O1lBaEZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQU8sbUJBQW1CO2dCQUNsQywrTEFBOEM7Z0JBRTlDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN4Qzs7OztZQVBRLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEZ1c2VQcm9ncmVzc0JhclNlcnZpY2UgfSBmcm9tICcuL3Byb2dyZXNzLWJhci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3IgICAgIDogJ2Z1c2UtcHJvZ3Jlc3MtYmFyJyxcbiAgICB0ZW1wbGF0ZVVybCAgOiAnLi9wcm9ncmVzcy1iYXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJscyAgICA6IFsnLi9wcm9ncmVzcy1iYXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEZ1c2VQcm9ncmVzc0JhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XG57XG4gICAgYnVmZmVyVmFsdWU6IG51bWJlcjtcbiAgICBtb2RlOiAnZGV0ZXJtaW5hdGUnIHwgJ2luZGV0ZXJtaW5hdGUnIHwgJ2J1ZmZlcicgfCAncXVlcnknO1xuICAgIHZhbHVlOiBudW1iZXI7XG4gICAgdmlzaWJsZTogYm9vbGVhbjtcblxuICAgIC8vIFByaXZhdGVcbiAgICBwcml2YXRlIF91bnN1YnNjcmliZUFsbDogU3ViamVjdDxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVzZVByb2dyZXNzQmFyU2VydmljZX0gX2Z1c2VQcm9ncmVzc0JhclNlcnZpY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZnVzZVByb2dyZXNzQmFyU2VydmljZTogRnVzZVByb2dyZXNzQmFyU2VydmljZVxuICAgIClcbiAgICB7XG4gICAgICAgIC8vIFNldCB0aGUgZGVmYXVsdHNcblxuICAgICAgICAvLyBTZXQgdGhlIHByaXZhdGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwgPSBuZXcgU3ViamVjdCgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBMaWZlY3ljbGUgaG9va3NcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogT24gaW5pdFxuICAgICAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFN1YnNjcmliZSB0byB0aGUgcHJvZ3Jlc3MgYmFyIHNlcnZpY2UgcHJvcGVydGllc1xuXG4gICAgICAgIC8vIEJ1ZmZlciB2YWx1ZVxuICAgICAgICB0aGlzLl9mdXNlUHJvZ3Jlc3NCYXJTZXJ2aWNlLmJ1ZmZlclZhbHVlXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fdW5zdWJzY3JpYmVBbGwpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoYnVmZmVyVmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlclZhbHVlID0gYnVmZmVyVmFsdWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBNb2RlXG4gICAgICAgIHRoaXMuX2Z1c2VQcm9ncmVzc0JhclNlcnZpY2UubW9kZVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX3Vuc3Vic2NyaWJlQWxsKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKG1vZGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGUgPSBtb2RlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVmFsdWVcbiAgICAgICAgdGhpcy5fZnVzZVByb2dyZXNzQmFyU2VydmljZS52YWx1ZVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX3Vuc3Vic2NyaWJlQWxsKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVmlzaWJsZVxuICAgICAgICB0aGlzLl9mdXNlUHJvZ3Jlc3NCYXJTZXJ2aWNlLnZpc2libGVcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl91bnN1YnNjcmliZUFsbCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2aXNpYmxlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gdmlzaWJsZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT24gZGVzdHJveVxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFVuc3Vic2NyaWJlIGZyb20gYWxsIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwubmV4dCgpO1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBQdWJsaWMgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbn1cbiJdfQ==