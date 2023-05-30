import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account/account.service';

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
  constructor(private accountService: AccountService) {}

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
}
