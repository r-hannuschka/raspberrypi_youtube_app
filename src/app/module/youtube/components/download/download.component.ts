import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../provider/api.service';
import { SocketManager } from '../../../socket/provider/socket.manager.service';

@Component({
    selector: 'app-youtube-download',
    templateUrl: './download.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DownloadComponent implements OnInit {

    public description: string;

    private socketManager: SocketManager;

    private api: ApiService;

    constructor(
        api: ApiService,
        socketManager: SocketManager
    ) {
        this.api = api;
        this.socketManager = socketManager;
    }

    ngOnInit() {
        this.registerEvents();

        // get channel id for download
        // register first
    }

    public downloadVideo() {
        this.api
            .downloadVideo()
            .subscribe((res) => {
                const channelID = res.data.socket.channelID;
                this.socketManager
                    .getMessages(channelID)
                    .subscribe( (message) => {
                        console.log (message);
                    });
            });
    }

    private registerEvents() {
    }
}
