import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { CharacterRace } from '../shared/models/characterRace';
import { Sheet } from '../shared/models/sheet';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  private currentSheetSource = new BehaviorSubject<Sheet>(null);
  currentSheet = this.currentSheetSource.asObservable();

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
    this.getRaces();
  }

  getSheetById(id: string) {
    return this.http.get(this.baseUrl + 'sheets/' + id);
  }
  getRaces() {
    return this.http.get(this.baseUrl + 'sheets/races');
  }
  getClasses() {
    return this.http.get(this.baseUrl + 'sheets/classes');
  }
  createSheet(sheet: Sheet) {
    return this.http.post(this.baseUrl + 'sheets', sheet);
  }
}
