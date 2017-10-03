import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
// import { IItem } from '../../api/data/item.interface';

@Component({
  selector: 'app-video-list-item-component',
  templateUrl: './video-list-item.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./video-list-item.component.scss']
})
export class VideoListItemComponent implements OnInit {

  @Input()
  public item: any; // IItem;

  public description: string;

  public title: string;

  public thumbUrl: string;

  constructor() {}

  ngOnInit() {
    this.description = this.item.snippet.description;
    this.title = this.item.snippet.title;
    this.thumbUrl = this.item.snippet.thumbnails.medium.url;
  }
}
