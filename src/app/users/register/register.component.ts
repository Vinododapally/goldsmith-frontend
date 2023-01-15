import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, UserService, AlertService } from 'src/app/services';


@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            mobileNumber: ['', Validators.required, Validators.minLength(10)],
            email: ['', Validators.required],
            role: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        if(this.userService.getByUserName(this.registerForm.get("username").value)){
           return  this.alertService.error('User name is already exist', true);
        }
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        console.log(JSON.stringify(this.registerForm.value));
        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('User Created successfully', true);
                    this.router.navigate(['/users']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
