import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PaginationService } from '../../providers/pagination.service';
import { PageNavigationComponent } from '../page-navigation/page-navigation.component';
import { PaginationComponent } from './pagination.component';

@Component({
    selector: 'app-page-navigation',
    template: `<p>page navigation</p>`,
})
class PageNavigationMockComponent {}

@Component({
    selector: 'app-test-list',
    template: `<p>test list</p>`
})
class TestListComponent {}

@Component({
    selector: 'app-pagination-test',
    template: `
        <app-pagination>
            <app-test-list></app-test-list>
        </app-pagination>
    `
})
class PaginationTestComponent {}

describe('PaginationComponent', () => {
    let fixture: ComponentFixture<PaginationTestComponent>;
    let comp: PaginationComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                PageNavigationMockComponent,
                PaginationComponent,
                PaginationTestComponent,
                TestListComponent
            ],
            providers: [
                PaginationService
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(PaginationTestComponent);
            comp = fixture.componentInstance;
        });
    }));

    it('expect to have 2 page navigation components', () => {
        expect (
            fixture.debugElement.queryAll( By.directive(PageNavigationMockComponent) ).length
        ).toBe( 2 );
    });

    it('expect to have 1 page list component', () => {

        const paginationComponent: DebugElement =
            fixture.debugElement.children[0];

        expect(
            paginationComponent.query( By.directive(TestListComponent) )
        ).not.toBe(null);
    });
});
