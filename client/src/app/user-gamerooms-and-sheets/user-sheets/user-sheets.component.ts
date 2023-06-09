import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { UserGameRooms } from 'src/app/shared/models/userGameRooms';
import { UserGameroomsAndSheetsService } from '../user-gamerooms-and-sheets.service';

@Component({
  selector: 'app-user-sheets',
  templateUrl: './user-sheets.component.html',
  styleUrls: ['./user-sheets.component.scss'],
})
export class UserSheetsComponent implements OnInit {
  userSheets: number[];
  ngOnInit(): void {
    this.loadSheets();
  }
  constructor(
    private userGameRoomsService: UserGameroomsAndSheetsService,
    private accountService: AccountService
  ) {}
  loadSheets() {
    this.userGameRoomsService
      .getUserGameroomsAndSheets(this.accountService.getCurrentUser().id)
      .subscribe((response: UserGameRooms) => {
        console.log(response);
        this.userSheets = response.sheets;
      });
  }
}
