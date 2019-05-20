import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as Prism from 'prismjs/prism';
import '../../components/highlight/prism-languages';
export class FuseHighlightComponent {
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {HttpClient} _httpClient
     */
    constructor(_elementRef, _httpClient) {
        this._elementRef = _elementRef;
        this._httpClient = _httpClient;
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
        // If there is no language defined, return...
        if (!this.lang) {
            return;
        }
        // If the path is defined...
        if (this.path) {
            // Get the source
            this._httpClient.get(this.path, { responseType: 'text' })
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((response) => {
                // Highlight it
                this.highlight(response);
            });
        }
        // If the path is not defined and the source element exists...
        if (!this.path && this.source) {
            // Highlight it
            this.highlight(this.source.nativeElement.value);
        }
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
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Highlight the given source code
     *
     * @param sourceCode
     */
    highlight(sourceCode) {
        // Split the source into lines
        const sourceLines = sourceCode.split('\n');
        // Remove the first and the last line of the source
        // code if they are blank lines. This way, the html
        // can be formatted properly while using fuse-highlight
        // component
        if (!sourceLines[0].trim()) {
            sourceLines.shift();
        }
        if (!sourceLines[sourceLines.length - 1].trim()) {
            sourceLines.pop();
        }
        // Find the first non-whitespace char index in
        // the first line of the source code
        const indexOfFirstChar = sourceLines[0].search(/\S|$/);
        // Generate the trimmed source
        let source = '';
        // Iterate through all the lines
        sourceLines.forEach((line, index) => {
            // Trim the beginning white space depending on the index
            // and concat the source code
            source = source + line.substr(indexOfFirstChar, line.length);
            // If it's not the last line...
            if (index !== sourceLines.length - 1) {
                // Add a line break at the end
                source = source + '\n';
            }
        });
        // Generate the highlighted code
        const highlightedCode = Prism.highlight(source, Prism.languages[this.lang]);
        // Replace the innerHTML of the component with the highlighted code
        this._elementRef.nativeElement.innerHTML =
            '<pre><code class="highlight language-' + this.lang + '">' + highlightedCode + '</code></pre>';
    }
}
FuseHighlightComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuse-highlight',
                template: '',
                styles: [":host{display:block;width:100%;padding:8px;background:#263238;cursor:text;overflow:auto;-webkit-overflow-scrolling:touch}"]
            }] }
];
/** @nocollapse */
FuseHighlightComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: HttpClient }
];
FuseHighlightComponent.propDecorators = {
    source: [{ type: ContentChild, args: ['source',] }],
    lang: [{ type: Input, args: ['lang',] }],
    path: [{ type: Input, args: ['path',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaGlnaGxpZ2h0L2hpZ2hsaWdodC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sS0FBSyxLQUFLLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sNENBQTRDLENBQUM7QUFPcEQsTUFBTSxPQUFPLHNCQUFzQjtJQWlCL0I7Ozs7O09BS0c7SUFDSCxZQUNZLFdBQXVCLEVBQ3ZCLFdBQXVCO1FBRHZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBRy9CLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELHdHQUF3RztJQUN4RyxvQkFBb0I7SUFDcEIsd0dBQXdHO0lBRXhHOztPQUVHO0lBQ0gsUUFBUTtRQUVKLDZDQUE2QztRQUM3QyxJQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFDZjtZQUNJLE9BQU87U0FDVjtRQUVELDRCQUE0QjtRQUM1QixJQUFLLElBQUksQ0FBQyxJQUFJLEVBQ2Q7WUFDSSxpQkFBaUI7WUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUMsQ0FBQztpQkFDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQ3JDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUVwQixlQUFlO2dCQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7U0FDVjtRQUVELDhEQUE4RDtRQUM5RCxJQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUM5QjtZQUNJLGVBQWU7WUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25EO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUVQLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELHdHQUF3RztJQUN4RyxtQkFBbUI7SUFDbkIsd0dBQXdHO0lBRXhHOzs7O09BSUc7SUFDSCxTQUFTLENBQUMsVUFBVTtRQUVoQiw4QkFBOEI7UUFDOUIsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQyxtREFBbUQ7UUFDbkQsbURBQW1EO1FBQ25ELHVEQUF1RDtRQUN2RCxZQUFZO1FBQ1osSUFBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFDM0I7WUFDSSxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdkI7UUFFRCxJQUFLLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQ2hEO1lBQ0ksV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3JCO1FBRUQsOENBQThDO1FBQzlDLG9DQUFvQztRQUNwQyxNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdkQsOEJBQThCO1FBQzlCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixnQ0FBZ0M7UUFDaEMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUVoQyx3REFBd0Q7WUFDeEQsNkJBQTZCO1lBQzdCLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFN0QsK0JBQStCO1lBQy9CLElBQUssS0FBSyxLQUFLLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUNyQztnQkFDSSw4QkFBOEI7Z0JBQzlCLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQzFCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxnQ0FBZ0M7UUFDaEMsTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUU1RSxtRUFBbUU7UUFDbkUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUztZQUNwQyx1Q0FBdUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxlQUFlLEdBQUcsZUFBZSxDQUFDO0lBQ3ZHLENBQUM7OztZQTNJSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFHLGdCQUFnQjtnQkFDM0IsUUFBUSxFQUFHLEVBQUU7O2FBRWhCOzs7O1lBWGlDLFVBQVU7WUFDbkMsVUFBVTs7O3FCQWNkLFlBQVksU0FBQyxRQUFRO21CQUlyQixLQUFLLFNBQUMsTUFBTTttQkFJWixLQUFLLFNBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBQcmlzbSBmcm9tICdwcmlzbWpzL3ByaXNtJztcbmltcG9ydCAnLi4vLi4vY29tcG9uZW50cy9oaWdobGlnaHQvcHJpc20tbGFuZ3VhZ2VzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3IgOiAnZnVzZS1oaWdobGlnaHQnLFxuICAgIHRlbXBsYXRlIDogJycsXG4gICAgc3R5bGVVcmxzOiBbJy4vaGlnaGxpZ2h0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRnVzZUhpZ2hsaWdodENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XG57XG4gICAgLy8gU291cmNlXG4gICAgQENvbnRlbnRDaGlsZCgnc291cmNlJylcbiAgICBzb3VyY2U6IEVsZW1lbnRSZWY7XG5cbiAgICAvLyBMYW5nXG4gICAgQElucHV0KCdsYW5nJylcbiAgICBsYW5nOiBzdHJpbmc7XG5cbiAgICAvLyBQYXRoXG4gICAgQElucHV0KCdwYXRoJylcbiAgICBwYXRoOiBzdHJpbmc7XG5cbiAgICAvLyBQcml2YXRlXG4gICAgcHJpdmF0ZSBfdW5zdWJzY3JpYmVBbGw6IFN1YmplY3Q8YW55PjtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnRSZWZ9IF9lbGVtZW50UmVmXG4gICAgICogQHBhcmFtIHtIdHRwQ2xpZW50fSBfaHR0cENsaWVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9odHRwQ2xpZW50OiBIdHRwQ2xpZW50XG4gICAgKVxuICAgIHtcbiAgICAgICAgLy8gU2V0IHRoZSBwcml2YXRlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsID0gbmV3IFN1YmplY3QoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgTGlmZWN5Y2xlIGhvb2tzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIE9uIGluaXRcbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBsYW5ndWFnZSBkZWZpbmVkLCByZXR1cm4uLi5cbiAgICAgICAgaWYgKCAhdGhpcy5sYW5nIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlIHBhdGggaXMgZGVmaW5lZC4uLlxuICAgICAgICBpZiAoIHRoaXMucGF0aCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgc291cmNlXG4gICAgICAgICAgICB0aGlzLl9odHRwQ2xpZW50LmdldCh0aGlzLnBhdGgsIHtyZXNwb25zZVR5cGU6ICd0ZXh0J30pXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX3Vuc3Vic2NyaWJlQWxsKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXNwb25zZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEhpZ2hsaWdodCBpdFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodChyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgcGF0aCBpcyBub3QgZGVmaW5lZCBhbmQgdGhlIHNvdXJjZSBlbGVtZW50IGV4aXN0cy4uLlxuICAgICAgICBpZiAoICF0aGlzLnBhdGggJiYgdGhpcy5zb3VyY2UgKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBIaWdobGlnaHQgaXRcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0KHRoaXMuc291cmNlLm5hdGl2ZUVsZW1lbnQudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT24gZGVzdHJveVxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFVuc3Vic2NyaWJlIGZyb20gYWxsIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwubmV4dCgpO1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBQdWJsaWMgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBIaWdobGlnaHQgdGhlIGdpdmVuIHNvdXJjZSBjb2RlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc291cmNlQ29kZVxuICAgICAqL1xuICAgIGhpZ2hsaWdodChzb3VyY2VDb2RlKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gU3BsaXQgdGhlIHNvdXJjZSBpbnRvIGxpbmVzXG4gICAgICAgIGNvbnN0IHNvdXJjZUxpbmVzID0gc291cmNlQ29kZS5zcGxpdCgnXFxuJyk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBmaXJzdCBhbmQgdGhlIGxhc3QgbGluZSBvZiB0aGUgc291cmNlXG4gICAgICAgIC8vIGNvZGUgaWYgdGhleSBhcmUgYmxhbmsgbGluZXMuIFRoaXMgd2F5LCB0aGUgaHRtbFxuICAgICAgICAvLyBjYW4gYmUgZm9ybWF0dGVkIHByb3Blcmx5IHdoaWxlIHVzaW5nIGZ1c2UtaGlnaGxpZ2h0XG4gICAgICAgIC8vIGNvbXBvbmVudFxuICAgICAgICBpZiAoICFzb3VyY2VMaW5lc1swXS50cmltKCkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBzb3VyY2VMaW5lcy5zaGlmdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAhc291cmNlTGluZXNbc291cmNlTGluZXMubGVuZ3RoIC0gMV0udHJpbSgpIClcbiAgICAgICAge1xuICAgICAgICAgICAgc291cmNlTGluZXMucG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaW5kIHRoZSBmaXJzdCBub24td2hpdGVzcGFjZSBjaGFyIGluZGV4IGluXG4gICAgICAgIC8vIHRoZSBmaXJzdCBsaW5lIG9mIHRoZSBzb3VyY2UgY29kZVxuICAgICAgICBjb25zdCBpbmRleE9mRmlyc3RDaGFyID0gc291cmNlTGluZXNbMF0uc2VhcmNoKC9cXFN8JC8pO1xuXG4gICAgICAgIC8vIEdlbmVyYXRlIHRoZSB0cmltbWVkIHNvdXJjZVxuICAgICAgICBsZXQgc291cmNlID0gJyc7XG5cbiAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGFsbCB0aGUgbGluZXNcbiAgICAgICAgc291cmNlTGluZXMuZm9yRWFjaCgobGluZSwgaW5kZXgpID0+IHtcblxuICAgICAgICAgICAgLy8gVHJpbSB0aGUgYmVnaW5uaW5nIHdoaXRlIHNwYWNlIGRlcGVuZGluZyBvbiB0aGUgaW5kZXhcbiAgICAgICAgICAgIC8vIGFuZCBjb25jYXQgdGhlIHNvdXJjZSBjb2RlXG4gICAgICAgICAgICBzb3VyY2UgPSBzb3VyY2UgKyBsaW5lLnN1YnN0cihpbmRleE9mRmlyc3RDaGFyLCBsaW5lLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIC8vIElmIGl0J3Mgbm90IHRoZSBsYXN0IGxpbmUuLi5cbiAgICAgICAgICAgIGlmICggaW5kZXggIT09IHNvdXJjZUxpbmVzLmxlbmd0aCAtIDEgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBhIGxpbmUgYnJlYWsgYXQgdGhlIGVuZFxuICAgICAgICAgICAgICAgIHNvdXJjZSA9IHNvdXJjZSArICdcXG4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgaGlnaGxpZ2h0ZWQgY29kZVxuICAgICAgICBjb25zdCBoaWdobGlnaHRlZENvZGUgPSBQcmlzbS5oaWdobGlnaHQoc291cmNlLCBQcmlzbS5sYW5ndWFnZXNbdGhpcy5sYW5nXSk7XG5cbiAgICAgICAgLy8gUmVwbGFjZSB0aGUgaW5uZXJIVE1MIG9mIHRoZSBjb21wb25lbnQgd2l0aCB0aGUgaGlnaGxpZ2h0ZWQgY29kZVxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICc8cHJlPjxjb2RlIGNsYXNzPVwiaGlnaGxpZ2h0IGxhbmd1YWdlLScgKyB0aGlzLmxhbmcgKyAnXCI+JyArIGhpZ2hsaWdodGVkQ29kZSArICc8L2NvZGU+PC9wcmU+JztcbiAgICB9XG59XG5cbiJdfQ==