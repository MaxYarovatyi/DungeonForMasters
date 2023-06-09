import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserSheetsComponent } from './user-sheets/user-sheets.component';
import { UserGameroomsComponent } from './user-gamerooms/user-gamerooms.component';

const routes: Routes = [
  { path: 'sheets', component: UserSheetsComponent },
  {
    path: 'gamerooms',
    component: UserGameroomsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserGameroomsAndSheetsRoutingModule {}
