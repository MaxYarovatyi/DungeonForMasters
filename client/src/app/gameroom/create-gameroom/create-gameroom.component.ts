import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
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
    const nameOptions: AbstractControlOptions = {
      validators: [Validators.required],
      asyncValidators: [this.validateNameNotTaken()],
    };
    this.gameroomForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9._]+$')],
        [this.validateNameNotTaken()],
      ],
      password: [null, [Validators.required]],
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
              return res ? { nameExists: true } : null;
            })
          );
        })
      );
    };
  }
}
