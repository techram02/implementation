import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  items: MenuItem[] = [];

  ngOnInit() {
    // Menu Items
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: 'home'
      },
      {
        label: 'Employees',
        icon: 'pi pi-fw pi-users',
        routerLink: 'list',
        routerLinkActiveOptions: 'active'
      },
      {
        label: 'Create',
        icon: 'pi pi-fw pi-plus',
        items: [
          {
            label: 'Template driven form',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: 'createtd'
          },
          {
            label: 'Reactive Form',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: 'createrf'
          }
        ]
      }
    ];
  }

}
