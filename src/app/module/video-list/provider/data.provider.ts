import { Observable} from 'rxjs/Observable';

export interface IRequest {

    action: string;

    param: {[key: string]: any};
}

export  abstract class DataProvider {

    public static readonly ACTION_SEARCH = 'search';

    public static readonly ACTION_GET = 'get';

    // @todo Observable should return list data
    public abstract fetch(req: IRequest): Observable<any>;
}