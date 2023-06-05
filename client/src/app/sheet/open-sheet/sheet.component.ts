import { Component, OnInit } from '@angular/core';
import { Sheet } from '../../shared/models/sheet';
import { SheetService } from '../sheet.service';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
})
export class SheetComponent implements OnInit {
  sheets: Sheet[];

  ngOnInit(): void {
    this.getSheets();
  }

  constructor(private sheetService: SheetService) {}

  getSheets() {
    this.sheetService.getSheetById(1).subscribe(
      (sheets: Sheet[]) => {
        this.sheets = sheets;
        console.log(this.sheets);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
