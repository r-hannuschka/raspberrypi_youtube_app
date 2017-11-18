import { Component, OnInit, Inject } from '@angular/core';
import { IMenuItem } from '../../api/menu-item.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public menuItems: IMenuItem[];

  constructor( @Inject('MenuItems') menuItems: IMenuItem[] ) {
    this.menuItems = menuItems;
  }

  ngOnInit() {
  }
}
