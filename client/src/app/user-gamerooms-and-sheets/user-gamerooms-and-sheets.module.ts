import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGameroomsComponent } from './user-gamerooms/user-gamerooms.component';
import { UserSheetsComponent } from './user-sheets/user-sheets.component';
import { SharedModule } from '../shared/shared.module';
import { UserGameroomsAndSheetsRoutingModule } from './user-gamerooms-and-sheets-routing.module';
import { SheetModule } from '../sheet/sheet.module';

@NgModule({
  declarations: [UserGameroomsComponent, UserSheetsComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserGameroomsAndSheetsRoutingModule,
    SheetModule,
  ],
})
export class UserGameroomsAndSheetsModule {}
