import { Component, Input, ViewEncapsulation } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as moment_ from 'moment';
var moment = moment_;
var FuseCountdownComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function FuseCountdownComponent() {
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
    FuseCountdownComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currDate = moment();
        var eventDate = moment(this.eventDate);
        // Get the difference in between the current date and event date in seconds
        var diff = eventDate.diff(currDate, 'seconds');
        // Calculate the remaining time for the first time so there will be no
        // delay on the countdown
        this.countdown = this._secondsToRemaining(diff);
        // Create a subscribable interval
        var countDown = interval(1000)
            .pipe(map(function (value) {
            return diff = diff - 1;
        }), map(function (value) {
            return _this._secondsToRemaining(value);
        }));
        // Subscribe to the countdown interval
        countDown
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (value) {
            _this.countdown = value;
        });
    };
    /**
     * On destroy
     */
    FuseCountdownComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Converts given seconds to a remaining time
     *
     * @param seconds
     * @private
     */
    FuseCountdownComponent.prototype._secondsToRemaining = function (seconds) {
        var timeLeft = moment.duration(seconds, 'seconds');
        return {
            days: timeLeft.asDays().toFixed(0),
            hours: timeLeft.hours(),
            minutes: timeLeft.minutes(),
            seconds: timeLeft.seconds()
        };
    };
    FuseCountdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-countdown',
                    template: "<div class=\"fuse-countdown\">\n\n    <div class=\"time days\">\n        <div class=\"value\">\n            {{countdown.days}}\n        </div>\n        <div class=\"title\">\n            days\n        </div>\n    </div>\n\n    <div class=\"time hours\">\n        <div class=\"value\">\n            {{countdown.hours}}\n        </div>\n        <div class=\"title\">\n            hours\n        </div>\n    </div>\n\n    <div class=\"time minutes\">\n        <div class=\"value\">\n            {{countdown.minutes}}\n        </div>\n        <div class=\"title\">\n            minutes\n        </div>\n    </div>\n\n    <div class=\"time seconds\">\n        <div class=\"value\">\n            {{countdown.seconds}}\n        </div>\n        <div class=\"title\">\n            seconds\n        </div>\n    </div>\n\n</div>",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["fuse-countdown{display:flex;flex-direction:row;align-items:center;justify-content:center}fuse-countdown .fuse-countdown{display:flex;flex-direction:row;align-items:center;justify-content:center;text-align:center}fuse-countdown .fuse-countdown .time{display:flex;flex-direction:column;padding:0 12px}fuse-countdown .fuse-countdown .time .value{font-size:34px;line-height:34px;padding-bottom:8px}fuse-countdown .fuse-countdown .time .title{color:rgba(0,0,0,.54)}"]
                }] }
    ];
    /** @nocollapse */
    FuseCountdownComponent.ctorParameters = function () { return []; };
    FuseCountdownComponent.propDecorators = {
        eventDate: [{ type: Input, args: ['eventDate',] }]
    };
    return FuseCountdownComponent;
}());
export { FuseCountdownComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY291bnRkb3duL2NvdW50ZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBRXZCO0lBaUJJOztPQUVHO0lBQ0g7UUFFSSxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNiLElBQUksRUFBSyxFQUFFO1lBQ1gsS0FBSyxFQUFJLEVBQUU7WUFDWCxPQUFPLEVBQUUsRUFBRTtZQUNYLE9BQU8sRUFBRSxFQUFFO1NBQ2QsQ0FBQztRQUVGLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELHdHQUF3RztJQUN4RyxvQkFBb0I7SUFDcEIsd0dBQXdHO0lBRXhHOztPQUVHO0lBQ0gseUNBQVEsR0FBUjtRQUFBLGlCQTZCQztRQTNCRyxJQUFNLFFBQVEsR0FBRyxNQUFNLEVBQUUsQ0FBQztRQUMxQixJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXpDLDJFQUEyRTtRQUMzRSxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUUvQyxzRUFBc0U7UUFDdEUseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhELGlDQUFpQztRQUNqQyxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO2FBQzNCLElBQUksQ0FDRCxHQUFHLENBQUMsVUFBQSxLQUFLO1lBQ0wsT0FBTyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsRUFDRixHQUFHLENBQUMsVUFBQSxLQUFLO1lBQ0wsT0FBTyxLQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQ0wsQ0FBQztRQUVOLHNDQUFzQztRQUN0QyxTQUFTO2FBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDckMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUNaLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsNENBQVcsR0FBWDtRQUVJLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELHdHQUF3RztJQUN4RyxvQkFBb0I7SUFDcEIsd0dBQXdHO0lBRXhHOzs7OztPQUtHO0lBQ0ssb0RBQW1CLEdBQTNCLFVBQTRCLE9BQU87UUFFL0IsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFckQsT0FBTztZQUNILElBQUksRUFBSyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNyQyxLQUFLLEVBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtZQUN6QixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUMzQixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRTtTQUM5QixDQUFDO0lBQ04sQ0FBQzs7Z0JBdEdKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUssZ0JBQWdCO29CQUM3Qiw2ekJBQXlDO29CQUV6QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3hDOzs7Ozs0QkFJSSxLQUFLLFNBQUMsV0FBVzs7SUErRnRCLDZCQUFDO0NBQUEsQUF4R0QsSUF3R0M7U0FsR1ksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpbnRlcnZhbCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvciAgIDogJ2Z1c2UtY291bnRkb3duJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY291bnRkb3duLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHMgICAgOiBbJy4vY291bnRkb3duLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBGdXNlQ291bnRkb3duQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcbntcbiAgICAvLyBFdmVudCBkYXRlXG4gICAgQElucHV0KCdldmVudERhdGUnKVxuICAgIGV2ZW50RGF0ZTtcblxuICAgIGNvdW50ZG93bjogYW55O1xuXG4gICAgLy8gUHJpdmF0ZVxuICAgIHByaXZhdGUgX3Vuc3Vic2NyaWJlQWxsOiBTdWJqZWN0PGFueT47XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIC8vIFNldCB0aGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5jb3VudGRvd24gPSB7XG4gICAgICAgICAgICBkYXlzICAgOiAnJyxcbiAgICAgICAgICAgIGhvdXJzICA6ICcnLFxuICAgICAgICAgICAgbWludXRlczogJycsXG4gICAgICAgICAgICBzZWNvbmRzOiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNldCB0aGUgcHJpdmF0ZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIExpZmVjeWNsZSBob29rc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBPbiBpbml0XG4gICAgICovXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgY29uc3QgY3VyckRhdGUgPSBtb21lbnQoKTtcbiAgICAgICAgY29uc3QgZXZlbnREYXRlID0gbW9tZW50KHRoaXMuZXZlbnREYXRlKTtcblxuICAgICAgICAvLyBHZXQgdGhlIGRpZmZlcmVuY2UgaW4gYmV0d2VlbiB0aGUgY3VycmVudCBkYXRlIGFuZCBldmVudCBkYXRlIGluIHNlY29uZHNcbiAgICAgICAgbGV0IGRpZmYgPSBldmVudERhdGUuZGlmZihjdXJyRGF0ZSwgJ3NlY29uZHMnKTtcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIHJlbWFpbmluZyB0aW1lIGZvciB0aGUgZmlyc3QgdGltZSBzbyB0aGVyZSB3aWxsIGJlIG5vXG4gICAgICAgIC8vIGRlbGF5IG9uIHRoZSBjb3VudGRvd25cbiAgICAgICAgdGhpcy5jb3VudGRvd24gPSB0aGlzLl9zZWNvbmRzVG9SZW1haW5pbmcoZGlmZik7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgc3Vic2NyaWJhYmxlIGludGVydmFsXG4gICAgICAgIGNvbnN0IGNvdW50RG93biA9IGludGVydmFsKDEwMDApXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGlmZiA9IGRpZmYgLSAxO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG1hcCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZWNvbmRzVG9SZW1haW5pbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byB0aGUgY291bnRkb3duIGludGVydmFsXG4gICAgICAgIGNvdW50RG93blxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX3Vuc3Vic2NyaWJlQWxsKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnRkb3duID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbiBkZXN0cm95XG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gVW5zdWJzY3JpYmUgZnJvbSBhbGwgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbC5uZXh0KCk7XG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIFByaXZhdGUgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBnaXZlbiBzZWNvbmRzIHRvIGEgcmVtYWluaW5nIHRpbWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzZWNvbmRzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zZWNvbmRzVG9SZW1haW5pbmcoc2Vjb25kcyk6IGFueVxuICAgIHtcbiAgICAgICAgY29uc3QgdGltZUxlZnQgPSBtb21lbnQuZHVyYXRpb24oc2Vjb25kcywgJ3NlY29uZHMnKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF5cyAgIDogdGltZUxlZnQuYXNEYXlzKCkudG9GaXhlZCgwKSxcbiAgICAgICAgICAgIGhvdXJzICA6IHRpbWVMZWZ0LmhvdXJzKCksXG4gICAgICAgICAgICBtaW51dGVzOiB0aW1lTGVmdC5taW51dGVzKCksXG4gICAgICAgICAgICBzZWNvbmRzOiB0aW1lTGVmdC5zZWNvbmRzKClcbiAgICAgICAgfTtcbiAgICB9XG5cbn1cbiJdfQ==