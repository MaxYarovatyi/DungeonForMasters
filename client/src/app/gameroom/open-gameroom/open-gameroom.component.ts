import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Gameroom } from 'src/app/shared/models/gameroom';
import { Sheet } from 'src/app/shared/models/sheet';
import { SheetService } from 'src/app/sheet/sheet.service';
import { GameroomService } from '../gameroom.service';

@Component({
  selector: 'app-open-gameroom',
  templateUrl: './open-gameroom.component.html',
  styleUrls: ['./open-gameroom.component.scss'],
})
export class OpenGameroomComponent implements OnInit {
  currentGameRoom: Gameroom;
  currentSheets: number[];
  ngOnInit(): void {
    this.loadGameRoom();
  }
  constructor(
    private gameroomService: GameroomService,
    private sheetService: SheetService
  ) {}

  loadGameRoom() {
    this.gameroomService
      .getGameRoom('maxmax')
      .subscribe((response: Gameroom) => {
        console.log(response);
        this.gameroomService.setCurrentGameRoom(response);
        this.currentGameRoom = this.gameroomService.getCurrentGameRoom();
        this.currentSheets = this.currentGameRoom.sheets;
      });
  }
}
