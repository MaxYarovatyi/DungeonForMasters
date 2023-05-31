import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AccountService } from './account/account.service';
import { CreateGameroomComponent } from './gameroom/create-gameroom/create-gameroom.component';
import { NavBarService } from './nav-bar/nav-bar.service';
import { CreateSheetComponent } from './sheet/create-sheet/create-sheet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.loadCurrentUser();
  }
  title = 'DungeonForMasters';
  constructor(
    private accountService: AccountService,
    private navBarService: NavBarService
  ) {}

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe(
      (response) => {
        console.log('loaded user');
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public onRouterOutletActivate(event: any) {
    if (event instanceof CreateSheetComponent) this.navBarService.hide();
    else return this.navBarService.show();
  }
}
