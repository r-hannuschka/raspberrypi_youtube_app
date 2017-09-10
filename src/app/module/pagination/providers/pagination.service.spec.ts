import { TestBed, async, inject } from '@angular/core/testing';
import { PaginationService } from './pagination.service';

describe('PaginationService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PaginationService]
        });
    });

    // you can also wrap inject() with async() for asynchronous tasks
    // it('...', async(inject([...], (...) => {}));
    it('expect default configuration to be set',
        inject([PaginationService], (service: PaginationService) => {

            expect(service.get('itemPageCount')).toBe(10);
            expect(service.get('currentPage')).toBe(1);
            expect(service.get('itemTotalCount')).toBe(1);
        })
    );

    it('expect itemTotalCount to be 10',
        inject([PaginationService], (service: PaginationService) => {

            service.configure('itemTotalCount', 10);
            expect(service.get('itemTotalCount')).toBe(10);
        })
    );

    // wir wollen benachrichtig werden wenn sich etwas ändert
    it('expect to get be notfied with update if page count changes',
        inject([PaginationService], (service) => {

            const spy = jasmine.createSpy('onUpdate');

            const subscriber =
                service.getNotifier().subscribe(spy);

            service.update('itemTotalCount', 100);

            expect(spy).toHaveBeenCalledWith(PaginationService.UPDATE);
            expect(service.get('itemTotalCount')).toBe(100);
            subscriber.unsubscribe(subscriber);
        })
    );

    it('expect to get be notfied if if we show a new page',
        inject([PaginationService], (service) => {

            const spy = jasmine.createSpy('onDisplayPage');

            const subscriber =
                service.getNotifier().subscribe(spy);

            service.configure('itemTotalCount', 100);
            service.showPage(2);

            expect(spy).toHaveBeenCalledWith(PaginationService.DISPLAY_PAGE);
            subscriber.unsubscribe(subscriber);
        })
    );

    it('expect not to be notfied if we call a invalid page',
        inject([PaginationService], (service) => {

            const spy = jasmine.createSpy('onDisplayPage');

            const subscriber =
                service.getNotifier().subscribe(spy);

            // initialize service with 100 items
            service.configure('itemTotalCount', 100);
            service.showPage(200);

            expect(spy).not.toHaveBeenCalledWith( PaginationService.DISPLAY_PAGE );
            subscriber.unsubscribe(subscriber);
        })
    );

    it('expect we could not got notified page after update',
        inject([PaginationService], (service) => {

            const spy = jasmine.createSpy('onDisplayPage');
            const subscriber =
                service.getNotifier().subscribe(spy);

            // configure service with 100 items
            service.configure('itemTotalCount', 100);
            service.showPage(4);
            expect(spy).toHaveBeenCalledWith( PaginationService.DISPLAY_PAGE );

            // update to total of 30 items that means 2 pages
            service.update('itemTotalCount', 30);
            expect(spy).toHaveBeenCalledWith( PaginationService.UPDATE );

            service.showPage(4);
            // spy could not be called now, so this method has only called 3 times,
            // 1. configured
            // 2. showPage
            // 3. update
            expect(spy).toHaveBeenCalledTimes( 3 );

            // unsubscribe
            subscriber.unsubscribe(subscriber);
        })
    );
});
