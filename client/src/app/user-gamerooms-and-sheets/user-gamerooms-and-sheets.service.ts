import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserGameRooms } from '../shared/models/userGameRooms';

@Injectable({
  providedIn: 'root',
})
export class UserGameroomsAndSheetsService {
  private UserGameroomsAndSheetsSource = new BehaviorSubject<UserGameRooms>(
    null
  );
  $currentUserGamerooms = this.UserGameroomsAndSheetsSource.asObservable();
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUserGameroomsAndSheets(id: string) {
    return this.http.get(this.baseUrl + 'userGameRooms?id=' + id);
  }
  setGamerooms(userGameRooms: UserGameRooms) {
    this.UserGameroomsAndSheetsSource.next(userGameRooms);
  }
  getGameRooms() {
    return this.UserGameroomsAndSheetsSource.getValue();
  }
}
