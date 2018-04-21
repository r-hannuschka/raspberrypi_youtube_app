import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player-info',
  templateUrl: './video-info.component.html'
})
export class VideoInfoComponent implements OnInit {

  @Input()
  public video: any;

  public ngOnInit() {
  }
}
