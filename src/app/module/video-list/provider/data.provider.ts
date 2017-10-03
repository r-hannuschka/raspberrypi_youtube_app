import { Observable} from 'rxjs/Observable';
import { IListData } from '../api/list-data.interface';

export interface IRequest {

    action: string;

    param: {[key: string]: any};
}

export  abstract class DataProvider {

    public static readonly ACTION_SEARCH = 'search';

    public static readonly ACTION_GET = 'get';

    public abstract fetch(req: IRequest): Observable<IListData>;
}