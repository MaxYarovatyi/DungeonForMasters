import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Gameroom } from 'src/app/shared/models/gameroom';
import { GameroomService } from '../gameroom.service';

@Component({
  selector: 'app-open-gameroom',
  templateUrl: './open-gameroom.component.html',
  styleUrls: ['./open-gameroom.component.scss'],
})
export class OpenGameroomComponent implements OnInit {
  gameroomForm: FormGroup;
  constructor(
    private gameroomService: GameroomService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit() {
    this.createGameroomForm();
  }

  createGameroomForm() {
    this.gameroomForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._]+$')]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.gameroomService
      .checkPassword(
        this.gameroomForm.get('name').value,
        this.gameroomForm.get('password').value
      )
      .subscribe((res) => {
        if (res) {
          this.gameroomService
            .getGameRoom(this.gameroomForm.get('name').value)
            .subscribe((response: Gameroom) => {
              this.gameroomService.setCurrentGameRoom(response);
              this.router.navigateByUrl('/sheet/create_sheet');
            });
        } else {
        }
      });
  }
}
