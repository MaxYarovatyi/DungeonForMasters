import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  baseUrl = 'https://localhost:7071/api/';
  constructor(private http: HttpClient) {}

  getSheetById(id: number) {
    return this.http.get(this.baseUrl + 'sheets/' + id);
  }
}
