import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { CharacterRace } from '../shared/models/characterRace';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
    this.getRaces();
  }

  getSheetById(id: number) {
    return this.http.get(this.baseUrl + 'sheets/' + id);
  }
  getRaces() {
    return this.http.get(this.baseUrl + 'sheets/races');
  }
  getClasses() {
    return this.http.get(this.baseUrl + 'sheets/classes');
  }
}
