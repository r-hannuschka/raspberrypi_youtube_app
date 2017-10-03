import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IListItem } from '../../api';

@Component({
  selector: 'app-video-list-item-component',
  templateUrl: './video-list-item.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./video-list-item.component.scss']
})
export class VideoListItemComponent implements OnInit {

  @Input()
  public item: IListItem;

  constructor() {}

  ngOnInit() {
  }
}
