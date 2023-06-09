import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { Gameroom } from 'src/app/shared/models/gameroom';
import { Sheet } from 'src/app/shared/models/sheet';
import { User } from 'src/app/shared/models/user';
import { UserGameRooms } from 'src/app/shared/models/userGameRooms';
import { SheetService } from 'src/app/sheet/sheet.service';
import { GameroomService } from '../gameroom.service';

@Component({
  selector: 'app-open-gameroom',
  templateUrl: './open-gameroom.component.html',
  styleUrls: ['./open-gameroom.component.scss'],
})
export class OpenGameroomComponent implements OnInit {
  gameRoomId: string;
  currentGameRoom: Gameroom;
  currentSheets: number[];
  currentMasterId: string;
  currentUser: User;
  currentUserSheetId: string;
  currentUserSheets: number[];
  ngOnInit(): void {
    this.currentUser = this.accountService.getCurrentUser();
    this.loadGameRoom();
    this.loadUserSheet();
  }
  constructor(
    private gameroomService: GameroomService,
    private sheetService: SheetService,
    private accountService: AccountService,
    private activatedRoot: ActivatedRoute
  ) {
    activatedRoot.queryParams.subscribe(
      (params) => (this.gameRoomId = params['gameRoomId'])
    );
  }

  loadGameRoom() {
    this.gameroomService
      .getGameRoom(
        this.gameRoomId == undefined
          ? this.gameroomService.getCurrentGameRoom().id
          : this.gameRoomId
      )
      .subscribe((response: Gameroom) => {
        this.currentGameRoom = response;
        this.currentMasterId = this.currentGameRoom.mastersId;
        this.currentSheets = this.currentGameRoom.sheets;
      });
  }
  loadUserSheet() {
    this.gameroomService
      .getUserGamerooms(this.currentUser.id)
      .subscribe((resp: UserGameRooms) => {
        this.currentUserSheets = resp.sheets;
        if (this.currentMasterId != this.currentUser.id) {
          for (let us of this.currentUserSheets) {
            for (let gs of this.currentSheets) {
              if (us === gs) {
                this.currentUserSheetId = us.toString();
                break;
              }
            }
          }
        }
      });
  }
}
