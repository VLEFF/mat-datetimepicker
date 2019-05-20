import { Pipe } from '@angular/core';
import { FuseUtils } from '../utils';
export class FilterPipe {
    /**
     * Transform
     *
     * @param {any[]} mainArr
     * @param {string} searchText
     * @param {string} property
     * @returns {any}
     */
    transform(mainArr, searchText, property) {
        return FuseUtils.filterArrayByString(mainArr, searchText);
    }
}
FilterPipe.decorators = [
    { type: Pipe, args: [{ name: 'filter' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJwaXBlcy9maWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR3JDLE1BQU0sT0FBTyxVQUFVO0lBRW5COzs7Ozs7O09BT0c7SUFDSCxTQUFTLENBQUMsT0FBYyxFQUFFLFVBQWtCLEVBQUUsUUFBZ0I7UUFFMUQsT0FBTyxTQUFTLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzlELENBQUM7OztZQWRKLElBQUksU0FBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGdXNlVXRpbHMgfSBmcm9tICcuLi91dGlscyc7XG5cbkBQaXBlKHtuYW1lOiAnZmlsdGVyJ30pXG5leHBvcnQgY2xhc3MgRmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm1cbntcbiAgICAvKipcbiAgICAgKiBUcmFuc2Zvcm1cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55W119IG1haW5BcnJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGV4dFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eVxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgdHJhbnNmb3JtKG1haW5BcnI6IGFueVtdLCBzZWFyY2hUZXh0OiBzdHJpbmcsIHByb3BlcnR5OiBzdHJpbmcpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiBGdXNlVXRpbHMuZmlsdGVyQXJyYXlCeVN0cmluZyhtYWluQXJyLCBzZWFyY2hUZXh0KTtcbiAgICB9XG59XG4iXX0=