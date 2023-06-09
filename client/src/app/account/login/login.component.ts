import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  ngOnInit(): void {
    this.createLoginForm();
  }
  constructor(private accountService: AccountService, private router: Router) {}

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-.]+@([\\w-]+.)+[\\w-]{2,4}$'),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe(
      (response) => this.router.navigateByUrl(''),
      (error) => console.log(error)
    );
  }
}
