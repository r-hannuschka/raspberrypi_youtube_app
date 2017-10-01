import { Injectable } from '@angular/core';
import { DataService } from '../../list/api/data-provider.interface';
import { ApiService } from '../provider/api.service';
import { IResponseList } from '../../api/http/response/response-list.interface';

@Injectable()
export class YoutubeDataService implements DataService {

    private apiService: ApiService;

    private response: any;

    /**
     *
     * @param {ApiService} apiService
     * @memberof YoutubeDataService
     */
    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    /**
     *
     * @memberof YoutubeDataService
     */
    public loadData(param: { [key: string]: any }) {

        this.apiService
          .list(param).subscribe((res: IResponseList) => {
            this.handleResponse(res);
          });
    }

    /**
     * must return observable
     *
     * @memberof YoutubeDataService
     */
    public getData() { }

    /**
     * handle list response
     *
     * @private
     * @param {IResponseList} res
     * @memberof ListComponent
     */
    private handleResponse(res: IResponseList) {

        if (res.success) {
            this.response = res;
        }
    }
}
