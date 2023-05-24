import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gameroom } from '../shared/models/gameroom';

@Injectable({
  providedIn: 'root',
})
export class GameroomService {
  baseUrl = 'https://localhost:7071/api/';
  private currentGameRoomSource = new BehaviorSubject<Gameroom>(null);
  currentGameroom$ = this.currentGameRoomSource.asObservable();
  constructor(private http: HttpClient) {}

  createGameRoom(formValues: any) {
    let gameroom = new Gameroom();
    gameroom.id = formValues.name;
    gameroom.password = formValues.password;
    console.log(gameroom);
    return this.http.post(this.baseUrl + 'gameroom', gameroom);
  }

  checkNameExists(name: string) {
    return this.http.get(this.baseUrl + 'gameroom/name_exists?id=' + name);
  }
}
