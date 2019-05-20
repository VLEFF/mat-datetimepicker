import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as Prism from 'prismjs/prism';
import '../../components/highlight/prism-languages';
var FuseHighlightComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {HttpClient} _httpClient
     */
    function FuseHighlightComponent(_elementRef, _httpClient) {
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
    FuseHighlightComponent.prototype.ngOnInit = function () {
        var _this = this;
        // If there is no language defined, return...
        if (!this.lang) {
            return;
        }
        // If the path is defined...
        if (this.path) {
            // Get the source
            this._httpClient.get(this.path, { responseType: 'text' })
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(function (response) {
                // Highlight it
                _this.highlight(response);
            });
        }
        // If the path is not defined and the source element exists...
        if (!this.path && this.source) {
            // Highlight it
            this.highlight(this.source.nativeElement.value);
        }
    };
    /**
     * On destroy
     */
    FuseHighlightComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Highlight the given source code
     *
     * @param sourceCode
     */
    FuseHighlightComponent.prototype.highlight = function (sourceCode) {
        // Split the source into lines
        var sourceLines = sourceCode.split('\n');
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
        var indexOfFirstChar = sourceLines[0].search(/\S|$/);
        // Generate the trimmed source
        var source = '';
        // Iterate through all the lines
        sourceLines.forEach(function (line, index) {
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
        var highlightedCode = Prism.highlight(source, Prism.languages[this.lang]);
        // Replace the innerHTML of the component with the highlighted code
        this._elementRef.nativeElement.innerHTML =
            '<pre><code class="highlight language-' + this.lang + '">' + highlightedCode + '</code></pre>';
    };
    FuseHighlightComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-highlight',
                    template: '',
                    styles: [":host{display:block;width:100%;padding:8px;background:#263238;cursor:text;overflow:auto;-webkit-overflow-scrolling:touch}"]
                }] }
    ];
    /** @nocollapse */
    FuseHighlightComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: HttpClient }
    ]; };
    FuseHighlightComponent.propDecorators = {
        source: [{ type: ContentChild, args: ['source',] }],
        lang: [{ type: Input, args: ['lang',] }],
        path: [{ type: Input, args: ['path',] }]
    };
    return FuseHighlightComponent;
}());
export { FuseHighlightComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaGlnaGxpZ2h0L2hpZ2hsaWdodC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sS0FBSyxLQUFLLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sNENBQTRDLENBQUM7QUFFcEQ7SUFzQkk7Ozs7O09BS0c7SUFDSCxnQ0FDWSxXQUF1QixFQUN2QixXQUF1QjtRQUR2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUcvQiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsb0JBQW9CO0lBQ3BCLHdHQUF3RztJQUV4Rzs7T0FFRztJQUNILHlDQUFRLEdBQVI7UUFBQSxpQkEyQkM7UUF6QkcsNkNBQTZDO1FBQzdDLElBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUNmO1lBQ0ksT0FBTztTQUNWO1FBRUQsNEJBQTRCO1FBQzVCLElBQUssSUFBSSxDQUFDLElBQUksRUFDZDtZQUNJLGlCQUFpQjtZQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFDO2lCQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLElB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cHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIFByaXNtIGZyb20gJ3ByaXNtanMvcHJpc20nO1xuaW1wb3J0ICcuLi8uLi9jb21wb25lbnRzL2hpZ2hsaWdodC9wcmlzbS1sYW5ndWFnZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvciA6ICdmdXNlLWhpZ2hsaWdodCcsXG4gICAgdGVtcGxhdGUgOiAnJyxcbiAgICBzdHlsZVVybHM6IFsnLi9oaWdobGlnaHQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGdXNlSGlnaGxpZ2h0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcbntcbiAgICAvLyBTb3VyY2VcbiAgICBAQ29udGVudENoaWxkKCdzb3VyY2UnKVxuICAgIHNvdXJjZTogRWxlbWVudFJlZjtcblxuICAgIC8vIExhbmdcbiAgICBASW5wdXQoJ2xhbmcnKVxuICAgIGxhbmc6IHN0cmluZztcblxuICAgIC8vIFBhdGhcbiAgICBASW5wdXQoJ3BhdGgnKVxuICAgIHBhdGg6IHN0cmluZztcblxuICAgIC8vIFByaXZhdGVcbiAgICBwcml2YXRlIF91bnN1YnNjcmliZUFsbDogU3ViamVjdDxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudFJlZn0gX2VsZW1lbnRSZWZcbiAgICAgKiBAcGFyYW0ge0h0dHBDbGllbnR9IF9odHRwQ2xpZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX2h0dHBDbGllbnQ6IEh0dHBDbGllbnRcbiAgICApXG4gICAge1xuICAgICAgICAvLyBTZXQgdGhlIHByaXZhdGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwgPSBuZXcgU3ViamVjdCgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBMaWZlY3ljbGUgaG9va3NcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogT24gaW5pdFxuICAgICAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIGxhbmd1YWdlIGRlZmluZWQsIHJldHVybi4uLlxuICAgICAgICBpZiAoICF0aGlzLmxhbmcgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgcGF0aCBpcyBkZWZpbmVkLi4uXG4gICAgICAgIGlmICggdGhpcy5wYXRoIClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBzb3VyY2VcbiAgICAgICAgICAgIHRoaXMuX2h0dHBDbGllbnQuZ2V0KHRoaXMucGF0aCwge3Jlc3BvbnNlVHlwZTogJ3RleHQnfSlcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fdW5zdWJzY3JpYmVBbGwpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3BvbnNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSGlnaGxpZ2h0IGl0XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0KHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSBwYXRoIGlzIG5vdCBkZWZpbmVkIGFuZCB0aGUgc291cmNlIGVsZW1lbnQgZXhpc3RzLi4uXG4gICAgICAgIGlmICggIXRoaXMucGF0aCAmJiB0aGlzLnNvdXJjZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEhpZ2hsaWdodCBpdFxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQodGhpcy5zb3VyY2UubmF0aXZlRWxlbWVudC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbiBkZXN0cm95XG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gVW5zdWJzY3JpYmUgZnJvbSBhbGwgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbC5uZXh0KCk7XG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIFB1YmxpYyBtZXRob2RzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEhpZ2hsaWdodCB0aGUgZ2l2ZW4gc291cmNlIGNvZGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzb3VyY2VDb2RlXG4gICAgICovXG4gICAgaGlnaGxpZ2h0KHNvdXJjZUNvZGUpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBTcGxpdCB0aGUgc291cmNlIGludG8gbGluZXNcbiAgICAgICAgY29uc3Qgc291cmNlTGluZXMgPSBzb3VyY2VDb2RlLnNwbGl0KCdcXG4nKTtcblxuICAgICAgICAvLyBSZW1vdmUgdGhlIGZpcnN0IGFuZCB0aGUgbGFzdCBsaW5lIG9mIHRoZSBzb3VyY2VcbiAgICAgICAgLy8gY29kZSBpZiB0aGV5IGFyZSBibGFuayBsaW5lcy4gVGhpcyB3YXksIHRoZSBodG1sXG4gICAgICAgIC8vIGNhbiBiZSBmb3JtYXR0ZWQgcHJvcGVybHkgd2hpbGUgdXNpbmcgZnVzZS1oaWdobGlnaHRcbiAgICAgICAgLy8gY29tcG9uZW50XG4gICAgICAgIGlmICggIXNvdXJjZUxpbmVzWzBdLnRyaW0oKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNvdXJjZUxpbmVzLnNoaWZ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICFzb3VyY2VMaW5lc1tzb3VyY2VMaW5lcy5sZW5ndGggLSAxXS50cmltKCkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBzb3VyY2VMaW5lcy5wb3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbmQgdGhlIGZpcnN0IG5vbi13aGl0ZXNwYWNlIGNoYXIgaW5kZXggaW5cbiAgICAgICAgLy8gdGhlIGZpcnN0IGxpbmUgb2YgdGhlIHNvdXJjZSBjb2RlXG4gICAgICAgIGNvbnN0IGluZGV4T2ZGaXJzdENoYXIgPSBzb3VyY2VMaW5lc1swXS5zZWFyY2goL1xcU3wkLyk7XG5cbiAgICAgICAgLy8gR2VuZXJhdGUgdGhlIHRyaW1tZWQgc291cmNlXG4gICAgICAgIGxldCBzb3VyY2UgPSAnJztcblxuICAgICAgICAvLyBJdGVyYXRlIHRocm91Z2ggYWxsIHRoZSBsaW5lc1xuICAgICAgICBzb3VyY2VMaW5lcy5mb3JFYWNoKChsaW5lLCBpbmRleCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBUcmltIHRoZSBiZWdpbm5pbmcgd2hpdGUgc3BhY2UgZGVwZW5kaW5nIG9uIHRoZSBpbmRleFxuICAgICAgICAgICAgLy8gYW5kIGNvbmNhdCB0aGUgc291cmNlIGNvZGVcbiAgICAgICAgICAgIHNvdXJjZSA9IHNvdXJjZSArIGxpbmUuc3Vic3RyKGluZGV4T2ZGaXJzdENoYXIsIGxpbmUubGVuZ3RoKTtcblxuICAgICAgICAgICAgLy8gSWYgaXQncyBub3QgdGhlIGxhc3QgbGluZS4uLlxuICAgICAgICAgICAgaWYgKCBpbmRleCAhPT0gc291cmNlTGluZXMubGVuZ3RoIC0gMSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGEgbGluZSBicmVhayBhdCB0aGUgZW5kXG4gICAgICAgICAgICAgICAgc291cmNlID0gc291cmNlICsgJ1xcbic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEdlbmVyYXRlIHRoZSBoaWdobGlnaHRlZCBjb2RlXG4gICAgICAgIGNvbnN0IGhpZ2hsaWdodGVkQ29kZSA9IFByaXNtLmhpZ2hsaWdodChzb3VyY2UsIFByaXNtLmxhbmd1YWdlc1t0aGlzLmxhbmddKTtcblxuICAgICAgICAvLyBSZXBsYWNlIHRoZSBpbm5lckhUTUwgb2YgdGhlIGNvbXBvbmVudCB3aXRoIHRoZSBoaWdobGlnaHRlZCBjb2RlXG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPVxuICAgICAgICAgICAgJzxwcmU+PGNvZGUgY2xhc3M9XCJoaWdobGlnaHQgbGFuZ3VhZ2UtJyArIHRoaXMubGFuZyArICdcIj4nICsgaGlnaGxpZ2h0ZWRDb2RlICsgJzwvY29kZT48L3ByZT4nO1xuICAgIH1cbn1cblxuIl19