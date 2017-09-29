import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'downloadStateIcon'
})
export class DownloadStateIcon implements PipeTransform {

    public transform(state: string): string {

        let icon = '';

        switch ( state ) {
            case 'pending':
                icon = 'fa-bars border border-2 border-top-0 p-1';
                break;
            case 'progress':
                icon = 'fa-download';
                break;
        }

        return icon;
    }
}
