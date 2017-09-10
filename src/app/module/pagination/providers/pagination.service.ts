import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PaginationService {

    public static readonly CONFIGURED = 'configurepagination';

    public static readonly DISPLAY_PAGE = 'displaypage';

    public static readonly UPDATE = 'updatepagination';

    private currentPage: number;

    private itemTotalCount: number;

    private itemPageCount: number;

    private pageCount: number;

    private pageSubject: Subject<string>;

    private isConfigured: boolean;

    constructor() {
        // set default values
        this.itemTotalCount = 1;
        this.currentPage = 1;
        this.itemPageCount = 10;

        this.pageSubject = new Subject<string>();

        this.isConfigured = false;
    }

    /**
     * configure service
     *
     * @param {({} | string)} data
     * @param {number} [value]
     */
    public configure(data: {} | string, value?: number): void {

        if ( !this.isConfigured ) {
            this.setData(data, value);
            this.notifyObserver( PaginationService.CONFIGURED );
            this.isConfigured = true;
        }
    }

    /**
     * returns a property
     *
     * @param {string} property
     * @returns {number}
     */
    public get(property: string): number {
        if (this.hasOwnProperty(property)) {
            return this[property];
        }
        return -1;
    }

    public getCurrentPage(): number {
        return this.currentPage;
    }

    /**
     * get pageNotifier to subscribe for events
     *
     * @returns {Observable<string>}
     */
    public getNotifier(): Observable<string> {
        return this.pageSubject
            .asObservable();
    }

    /**
     * notfiy observer on update or show page
     *
     * @private
     * @param {string} event
     */
    private notifyObserver(event: string): void {
        this.pageSubject.next(event);
    }

    /**
     * display specific page
     *
     * @param {number} page
     */
    public showPage(page: number): void {

        let validPage = false;

        validPage = this.pageCount >= page;
        validPage = validPage && page > 0;

        if (validPage) {
            this.setData('currentPage', page);
            this.notifyObserver(PaginationService.DISPLAY_PAGE);
        }
    }

    /**
     * update data this will trigger PaginationService.UPDATE event
     *
     * @param {({} | string)} data
     * @param {number} [value]
     */
    public update(data: {} | string, value?: number): void {
        this.setData(data, value);
        this.notifyObserver(PaginationService.UPDATE);
    }

    /**
     * write data
     *
     * @private
     * @param {({} | string)} data
     * @param {number} [value]
     */
    private setData(data: {} | string, value?: number): void {

        switch (Object.prototype.toString.apply(data).match(/\s([^\]]+)/)[1].toLowerCase()) {
            case 'object':
                for (const key of Object.keys(data as Object)) {
                    this.setProperty(key, data[key]);
                }
                break;
            case 'string':
                this.setProperty(data, value);
                break;
            default:
                console.error('no valid value');
        }

        this.pageCount = Math.ceil(this.itemTotalCount / this.itemPageCount);
    }

    private setProperty(property, value): void {

        if (this.hasOwnProperty(property) && value) {
            this[property] = value;
        }
    }
}
