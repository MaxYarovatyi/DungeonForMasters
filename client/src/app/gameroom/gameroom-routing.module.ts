import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameroomComponent } from './create-gameroom/create-gameroom.component';
import { OpenGameroomComponent } from './open-gameroom/open-gameroom.component';

const routes: Routes = [
  { path: 'create', component: CreateGameroomComponent },
  { path: 'open', component: OpenGameroomComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameroomRoutingModule {}
