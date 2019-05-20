import { Component, Input, ViewEncapsulation } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as moment_ from 'moment';
const moment = moment_;
export class FuseCountdownComponent {
    /**
     * Constructor
     */
    constructor() {
        // Set the defaults
        this.countdown = {
            days: '',
            hours: '',
            minutes: '',
            seconds: ''
        };
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
        const currDate = moment();
        const eventDate = moment(this.eventDate);
        // Get the difference in between the current date and event date in seconds
        let diff = eventDate.diff(currDate, 'seconds');
        // Calculate the remaining time for the first time so there will be no
        // delay on the countdown
        this.countdown = this._secondsToRemaining(diff);
        // Create a subscribable interval
        const countDown = interval(1000)
            .pipe(map(value => {
            return diff = diff - 1;
        }), map(value => {
            return this._secondsToRemaining(value);
        }));
        // Subscribe to the countdown interval
        countDown
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(value => {
            this.countdown = value;
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
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Converts given seconds to a remaining time
     *
     * @param seconds
     * @private
     */
    _secondsToRemaining(seconds) {
        const timeLeft = moment.duration(seconds, 'seconds');
        return {
            days: timeLeft.asDays().toFixed(0),
            hours: timeLeft.hours(),
            minutes: timeLeft.minutes(),
            seconds: timeLeft.seconds()
        };
    }
}
FuseCountdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuse-countdown',
                template: "<div class=\"fuse-countdown\">\n\n    <div class=\"time days\">\n        <div class=\"value\">\n            {{countdown.days}}\n        </div>\n        <div class=\"title\">\n            days\n        </div>\n    </div>\n\n    <div class=\"time hours\">\n        <div class=\"value\">\n            {{countdown.hours}}\n        </div>\n        <div class=\"title\">\n            hours\n        </div>\n    </div>\n\n    <div class=\"time minutes\">\n        <div class=\"value\">\n            {{countdown.minutes}}\n        </div>\n        <div class=\"title\">\n            minutes\n        </div>\n    </div>\n\n    <div class=\"time seconds\">\n        <div class=\"value\">\n            {{countdown.seconds}}\n        </div>\n        <div class=\"title\">\n            seconds\n        </div>\n    </div>\n\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: ["fuse-countdown{display:flex;flex-direction:row;align-items:center;justify-content:center}fuse-countdown .fuse-countdown{display:flex;flex-direction:row;align-items:center;justify-content:center;text-align:center}fuse-countdown .fuse-countdown .time{display:flex;flex-direction:column;padding:0 12px}fuse-countdown .fuse-countdown .time .value{font-size:34px;line-height:34px;padding-bottom:8px}fuse-countdown .fuse-countdown .time .title{color:rgba(0,0,0,.54)}"]
            }] }
];
/** @nocollapse */
FuseCountdownComponent.ctorParameters = () => [];
FuseCountdownComponent.propDecorators = {
    eventDate: [{ type: Input, args: ['eventDate',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY291bnRkb3duL2NvdW50ZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBUXZCLE1BQU0sT0FBTyxzQkFBc0I7SUFXL0I7O09BRUc7SUFDSDtRQUVJLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2IsSUFBSSxFQUFLLEVBQUU7WUFDWCxLQUFLLEVBQUksRUFBRTtZQUNYLE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLEVBQUU7U0FDZCxDQUFDO1FBRUYsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG9CQUFvQjtJQUNwQix3R0FBd0c7SUFFeEc7O09BRUc7SUFDSCxRQUFRO1FBRUosTUFBTSxRQUFRLEdBQUcsTUFBTSxFQUFFLENBQUM7UUFDMUIsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV6QywyRUFBMkU7UUFDM0UsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFL0Msc0VBQXNFO1FBQ3RFLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoRCxpQ0FBaUM7UUFDakMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQzthQUMzQixJQUFJLENBQ0QsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ1IsT0FBTyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsRUFDRixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDUixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FDTCxDQUFDO1FBRU4sc0NBQXNDO1FBQ3RDLFNBQVM7YUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNyQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDZixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFFUCxxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsb0JBQW9CO0lBQ3BCLHdHQUF3RztJQUV4Rzs7Ozs7T0FLRztJQUNLLG1CQUFtQixDQUFDLE9BQU87UUFFL0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFckQsT0FBTztZQUNILElBQUksRUFBSyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNyQyxLQUFLLEVBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtZQUN6QixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUMzQixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRTtTQUM5QixDQUFDO0lBQ04sQ0FBQzs7O1lBdEdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUssZ0JBQWdCO2dCQUM3Qiw2ekJBQXlDO2dCQUV6QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDeEM7Ozs7O3dCQUlJLEtBQUssU0FBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpbnRlcnZhbCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvciAgIDogJ2Z1c2UtY291bnRkb3duJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY291bnRkb3duLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHMgICAgOiBbJy4vY291bnRkb3duLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBGdXNlQ291bnRkb3duQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcbntcbiAgICAvLyBFdmVudCBkYXRlXG4gICAgQElucHV0KCdldmVudERhdGUnKVxuICAgIGV2ZW50RGF0ZTtcblxuICAgIGNvdW50ZG93bjogYW55O1xuXG4gICAgLy8gUHJpdmF0ZVxuICAgIHByaXZhdGUgX3Vuc3Vic2NyaWJlQWxsOiBTdWJqZWN0PGFueT47XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIC8vIFNldCB0aGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5jb3VudGRvd24gPSB7XG4gICAgICAgICAgICBkYXlzICAgOiAnJyxcbiAgICAgICAgICAgIGhvdXJzICA6ICcnLFxuICAgICAgICAgICAgbWludXRlczogJycsXG4gICAgICAgICAgICBzZWNvbmRzOiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNldCB0aGUgcHJpdmF0ZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIExpZmVjeWNsZSBob29rc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBPbiBpbml0XG4gICAgICovXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgY29uc3QgY3VyckRhdGUgPSBtb21lbnQoKTtcbiAgICAgICAgY29uc3QgZXZlbnREYXRlID0gbW9tZW50KHRoaXMuZXZlbnREYXRlKTtcblxuICAgICAgICAvLyBHZXQgdGhlIGRpZmZlcmVuY2UgaW4gYmV0d2VlbiB0aGUgY3VycmVudCBkYXRlIGFuZCBldmVudCBkYXRlIGluIHNlY29uZHNcbiAgICAgICAgbGV0IGRpZmYgPSBldmVudERhdGUuZGlmZihjdXJyRGF0ZSwgJ3NlY29uZHMnKTtcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIHJlbWFpbmluZyB0aW1lIGZvciB0aGUgZmlyc3QgdGltZSBzbyB0aGVyZSB3aWxsIGJlIG5vXG4gICAgICAgIC8vIGRlbGF5IG9uIHRoZSBjb3VudGRvd25cbiAgICAgICAgdGhpcy5jb3VudGRvd24gPSB0aGlzLl9zZWNvbmRzVG9SZW1haW5pbmcoZGlmZik7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgc3Vic2NyaWJhYmxlIGludGVydmFsXG4gICAgICAgIGNvbnN0IGNvdW50RG93biA9IGludGVydmFsKDEwMDApXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGlmZiA9IGRpZmYgLSAxO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG1hcCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZWNvbmRzVG9SZW1haW5pbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byB0aGUgY291bnRkb3duIGludGVydmFsXG4gICAgICAgIGNvdW50RG93blxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX3Vuc3Vic2NyaWJlQWxsKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnRkb3duID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbiBkZXN0cm95XG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gVW5zdWJzY3JpYmUgZnJvbSBhbGwgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbC5uZXh0KCk7XG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIFByaXZhdGUgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBnaXZlbiBzZWNvbmRzIHRvIGEgcmVtYWluaW5nIHRpbWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzZWNvbmRzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zZWNvbmRzVG9SZW1haW5pbmcoc2Vjb25kcyk6IGFueVxuICAgIHtcbiAgICAgICAgY29uc3QgdGltZUxlZnQgPSBtb21lbnQuZHVyYXRpb24oc2Vjb25kcywgJ3NlY29uZHMnKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF5cyAgIDogdGltZUxlZnQuYXNEYXlzKCkudG9GaXhlZCgwKSxcbiAgICAgICAgICAgIGhvdXJzICA6IHRpbWVMZWZ0LmhvdXJzKCksXG4gICAgICAgICAgICBtaW51dGVzOiB0aW1lTGVmdC5taW51dGVzKCksXG4gICAgICAgICAgICBzZWNvbmRzOiB0aW1lTGVmdC5zZWNvbmRzKClcbiAgICAgICAgfTtcbiAgICB9XG5cbn1cbiJdfQ==