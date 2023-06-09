import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { GameroomService } from 'src/app/gameroom/gameroom.service';
import { Gameroom } from 'src/app/shared/models/gameroom';
import { UserGameRooms } from 'src/app/shared/models/userGameRooms';
import { UserGameroomsAndSheetsService } from '../user-gamerooms-and-sheets.service';

@Component({
  selector: 'app-user-gamerooms',
  templateUrl: './user-gamerooms.component.html',
  styleUrls: ['./user-gamerooms.component.scss'],
})
export class UserGameroomsComponent implements OnInit {
  userGameRoomsId: string[];
  userGameRooms: Gameroom[] = [];
  constructor(
    private userGameroomsService: UserGameroomsAndSheetsService,
    private accountService: AccountService,
    private gameRoomService: GameroomService
  ) {}
  ngOnInit(): void {
    this.loadGameRooms(this.accountService.getCurrentUser().id);
    console.log(this.userGameRooms);
  }
  loadGameRooms(id: string) {
    this.userGameroomsService.getUserGameroomsAndSheets(id).subscribe(
      (response: UserGameRooms) => {
        console.log(response);
        this.userGameroomsService.setGamerooms(response);
        this.userGameRoomsId = response.gameRooms;
        this.userGameRoomsId.forEach((uGR) => {
          this.gameRoomService.getGameRoom(uGR).subscribe(
            (response: Gameroom) => {
              console.log(response);
              this.userGameRooms.push(response);
            },
            (error) => {
              console.log(error);
            }
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
