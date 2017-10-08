export class ListDataModel {

    private itemPageCount: number;

    private itemTotalCount: number;

    private nextPageToken: string;

    private page: number;

    private pageItemCount: number;

    private prevPageToken: string;

    private searchQuery: string;

    getItemPageCount(): number {
        return this.itemPageCount;
    }

    getItemTotalCount(): number {
        return this.itemTotalCount;
    }

    public getNextPageToken(): string {
        return this.nextPageToken;
    }

    public getPage(): number {
        return this.page;
    }

    public getPrevPageToken(): string {
        return this.prevPageToken;
    }

    public getSearchQuery(): string {
        return this.searchQuery || '';
    }

    public setNextPageToken(token: string) {
        this.nextPageToken = token;
    }

    public setPage(page: number) {
        this.page = page;
    }

    public setPrevPageToken(token: string) {
        this.prevPageToken = token;
    }

    public setSearchQuery(query: string) {
        this.searchQuery = query;
    }

    public setItemTotalCount(count: number) {
        this.itemTotalCount = count;
    }

    public setItemPageCount(count: number) {
        this.itemPageCount = count;
    }
}
