import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateSheetComponent } from './create-sheet/create-sheet.component';
import { SheetComponent } from './sheet.component';

const routes: Routes = [
  { path: 'create_sheet', component: CreateSheetComponent },
  { path: 'sheet', component: SheetComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SheetRoutingModule {}
