import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameroomComponent } from './gameroom/create-gameroom/create-gameroom.component';
import { HomeComponent } from './home/home.component';
import { SheetComponent } from './sheet/sheet.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create_room', component: CreateGameroomComponent },
  { path: 'create_sheet', component: SheetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
