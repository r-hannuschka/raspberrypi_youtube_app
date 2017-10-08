import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IItem } from '../../api/data/item.interface';

@Component({
  selector: 'app-youtube-item-card',
  templateUrl: './item-card.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input()
  public item: IItem;

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
