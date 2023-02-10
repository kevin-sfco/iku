import { Component } from '@angular/core';

import { navItems } from './_nav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default.componet.scss']
})
export class DefaultLayoutComponent {

  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private router: Router,) {}

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }
}
