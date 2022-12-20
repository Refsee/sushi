import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isOpenMenu = false;
  private skipClick = false;

  constructor() {}

  ngOnInit(): void {}

  showMenu(): void {
    this.isOpenMenu = true;
    this.skipClick = true;
  }

  @HostListener('window:click')
  hide(): void {
    if (this.skipClick) {
      this.skipClick = false;
      return;
    }
    this.isOpenMenu = false;
  }
}
