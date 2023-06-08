import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSheetComponent } from './create-sheet/create-sheet.component';
import { SheetComponent } from './open-sheet/sheet.component';
import { SheetRoutingModule } from './sheet-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CreateSheetComponent, SheetComponent],
  imports: [CommonModule, SheetRoutingModule, SharedModule],
  exports: [SheetComponent],
})
export class SheetModule {}
