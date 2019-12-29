import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: UserService
  ) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      uid: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const signup = this.signupForm.value;
    signup.role = 'user';
    this.authService.emailSignup(signup);
  }
}
