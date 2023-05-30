import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';
import { Gameroom } from '../shared/models/gameroom';

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
    console.log(gameroom);
    this.addGameRoomToUsersGameRooms(gameroom.mastersId, gameroom).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    return this.http.post(this.baseUrl + 'gameroom', gameroom);
  }

  checkNameExists(name: string) {
    return this.http.get(this.baseUrl + 'gameroom/name_exists?id=' + name);
  }

  addGameRoomToUsersGameRooms(id: string, gameroom: Gameroom) {
    return this.http.post(this.baseUrl + 'usergamerooms?id=' + id, gameroom);
  }
}
