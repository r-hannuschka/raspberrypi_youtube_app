export interface IDownload {
    isPending: boolean;
    isRunning: boolean;
    loaded: number;
    name: string;
    path: string;
    pid: string;
    size: number;
    state: string;
    uri: string;
}