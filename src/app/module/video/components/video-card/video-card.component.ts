import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IVideoFile } from '../../api/data/video.file';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {

  @Input()
  public video: IVideoFile;

  constructor() {}

  ngOnInit() {
  }
}
