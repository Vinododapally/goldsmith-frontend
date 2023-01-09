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
   

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
       
    }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields


    onSubmit() {
        this.submitted = true;
        this.loading = true;
        if(this.user.username && this.user.password){
        this.authenticationService.login(this.user)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    console.log('invalid username or password '+data.status);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }else{
        alert("please enter the valid inputs");
    }
}
}
