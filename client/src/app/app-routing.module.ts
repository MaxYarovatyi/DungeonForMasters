import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { CreateGameroomComponent } from './gameroom/create-gameroom/create-gameroom.component';
import { HomeComponent } from './home/home.component';
import { SheetComponent } from './sheet/sheet.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'create_room',
    component: CreateGameroomComponent,
    canActivate: [AuthGuard],
  },
  { path: 'create_sheet', component: SheetComponent },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((mod) => mod.AccountModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
