import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';
import { Gameroom } from '../shared/models/gameroom';
import { Sheet } from '../shared/models/sheet';

@Injectable({
  providedIn: 'root',
})
export class GameroomService {
  baseUrl = environment.apiUrl;
  private currentGameRoomSource = new BehaviorSubject<Gameroom>(null);
  currentGameroom$ = this.currentGameRoomSource.asObservable();
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  createGameRoom(formValues: any) {
    let gameroom = new Gameroom();
    gameroom.id = formValues.name;
    gameroom.password = formValues.password;
    this.accountService.currentUser$.subscribe(
      (response) => (gameroom.mastersId = response.id)
    );
    this.addGameRoomToUsersGameRooms(gameroom.mastersId, gameroom).subscribe(
      (response) => {},
      (error) => {
        console.log(error);
      }
    );
    return this.http.post(this.baseUrl + 'gameroom', gameroom).pipe(
      map((gameroom: Gameroom) => {
        this.currentGameRoomSource.next(gameroom);
      })
    );
  }
  addSheetToGameRoom(id: string, sheet: Sheet) {
    return this.http.post(
      this.baseUrl + 'gameroom/addSheetToGameRoom?id=' + id,
      sheet
    );
  }
  getGameRoom(id: string) {
    return this.http.get(this.baseUrl + 'gameroom?id=' + id);
  }
  getCurrentGameRoom() {
    return this.currentGameRoomSource.value;
  }
  setCurrentGameRoom(gameroom: Gameroom) {
    this.currentGameRoomSource.next(gameroom);
  }
  checkNameExists(name: string) {
    return this.http.get(this.baseUrl + 'gameroom/name_exists?id=' + name);
  }

  addGameRoomToUsersGameRooms(id: string, gameroom: Gameroom) {
    return this.http.post(this.baseUrl + 'usergamerooms?id=' + id, gameroom);
  }
  getUserGamerooms(id: string) {
    return this.http.get(this.baseUrl + 'usergamerooms?id=' + id);
  }
  checkPassword(id: string, password: string) {
    return this.http.get(
      this.baseUrl + 'gameRoom/checkPassword?id=' + id + '&password=' + password
    );
  }
}
