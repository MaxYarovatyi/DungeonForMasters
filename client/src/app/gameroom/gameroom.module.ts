import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CreateGameroomComponent } from './create-gameroom/create-gameroom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpenGameroomComponent } from './open-gameroom/open-gameroom.component';
import { GameroomRoutingModule } from './gameroom-routing.module';
import { JoinGameroomComponent } from './join-gameroom/join-gameroom.component';
import { SheetModule } from '../sheet/sheet.module';

@NgModule({
  declarations: [
    OpenGameroomComponent,
    CreateGameroomComponent,
    JoinGameroomComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    GameroomRoutingModule,
    SheetModule,
  ],
})
export class GameroomModule {}
