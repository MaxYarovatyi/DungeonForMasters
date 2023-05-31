import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSheetComponent } from './create-sheet/create-sheet.component';
import { SheetComponent } from './sheet.component';
import { SheetRoutingModule } from './sheet-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CreateSheetComponent, SheetComponent],
  imports: [CommonModule, SheetRoutingModule, SharedModule],
})
export class SheetModule {}
