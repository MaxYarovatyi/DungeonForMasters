import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameroomService } from '../gameroom.service';

@Component({
  selector: 'app-create-gameroom',
  templateUrl: './create-gameroom.component.html',
  styleUrls: ['./create-gameroom.component.scss'],
})
export class CreateGameroomComponent implements OnInit {
  gameroomForm: FormGroup;
  constructor(private gameRoomService: GameroomService) {}
  ngOnInit() {
    this.createGameroomForm();
  }

  createGameroomForm() {
    this.gameroomForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.gameRoomService
      .createGameRoom({
        name: this.gameroomForm.value.name,
        password: this.gameroomForm.value.password,
      })
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
