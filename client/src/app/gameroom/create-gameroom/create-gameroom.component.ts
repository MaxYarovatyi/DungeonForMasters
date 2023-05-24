import { Component, OnInit } from '@angular/core';
import {
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map, of, switchMap, timer } from 'rxjs';
import { GameroomService } from '../gameroom.service';

@Component({
  selector: 'app-create-gameroom',
  templateUrl: './create-gameroom.component.html',
  styleUrls: ['./create-gameroom.component.scss'],
})
export class CreateGameroomComponent implements OnInit {
  gameroomForm: FormGroup;
  constructor(
    private gameRoomService: GameroomService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.createGameroomForm();
  }

  createGameroomForm() {
    this.gameroomForm = this.fb.group({
      name: [null, Validators.required, [this.validateNameNotTaken()]],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    this.gameRoomService
      .createGameRoom({
        name: this.gameroomForm.value.name,
        password: this.gameroomForm.value.password,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigateByUrl('');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  validateNameNotTaken(): AsyncValidatorFn {
    return (control) => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.gameRoomService.checkNameExists(control.value).pipe(
            map((res) => {
              console.log(res);
              return res ? { emailExists: true } : null;
            })
          );
        })
      );
    };
  }
}
