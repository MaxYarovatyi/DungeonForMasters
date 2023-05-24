import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CreateGameroomComponent } from './create-gameroom/create-gameroom.component';
import { AppModule } from '../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    AppModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ReactiveFormsModule, SharedModule],
})
export class GameroomModule {}
