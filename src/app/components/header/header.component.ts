import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isOpenMenu = false;
  private skipClick = false;

  public isLogin = false;
  public loginUrl = '/login';
  public loginName = '';

  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    this.checkUserLogin()
    this.checkUpdatesUserLogin()
  }

  showMenu(): void {
    this.isOpenMenu = true;
    this.skipClick = true;
  }


  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if(currentUser){
      this.isLogin = true;
      this.loginName = currentUser.name;
      currentUser.role === 'ADMIN'?this.loginUrl = '/admin':this.loginUrl = '/cabinet';
    } else {
      this.isLogin = false;
      this.loginUrl = '/login';
      this.loginName = '';
    }
  }
  // checkUserLogin(): void {
  //   const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  //   if(currentUser && currentUser.role === ROLE.ADMIN){
  //     this.isLogin = true;
  //     this.loginUrl = 'admin';
  //     this.loginPage = 'Admin';
  //   } else if(currentUser && currentUser.role === ROLE.USER) {
  //     this.isLogin = true;
  //     this.loginUrl = 'cabinet';
  //     this.loginPage = 'Cabinet';
  //   } else {
  //     this.isLogin = false;
  //     this.loginUrl = '';
  //     this.loginPage = '';
  //   }
  // }

  checkUpdatesUserLogin(): void {
    this.authService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
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
