import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IListItem } from '../../api';

@Component({
  selector: 'app-youtube-item-card',
  templateUrl: './item-card.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input()
  public item: IListItem;

  constructor() {}

  ngOnInit() {
  }
}
