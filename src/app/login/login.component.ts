import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../models';
import { AuthenticationService, AlertService } from '../services';



@Component({templateUrl: 'login.component.html',styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {
     user: User = new User();
    loading = false;
    submitted = false;
    returnUrl: string;
    loginForm: FormGroup;
   

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/home']);
        }
       
    }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.loading = true;
        this.authenticationService.login(this.loginForm.value)
            .subscribe(
                data => {
                    this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
     }
}

