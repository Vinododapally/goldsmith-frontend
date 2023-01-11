import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, AlertService } from 'src/app/services';
import { ShowRoomService } from 'src/app/services/showroom.service';



@Component({templateUrl: 'create-showroom.component.html'})
export class CreateShowRoomComponent implements OnInit {
    showRoomForm: FormGroup;
    loading = false;
    submitted = false;
    ImagePath: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private showRoomService: ShowRoomService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            //this.router.navigate(['/']);
        }
        this.ImagePath = '/assets/images/bg.jpg'
    }

    ngOnInit() {
        this.showRoomForm = this.formBuilder.group({
            name: ['', Validators.required],
            mobileNumber: [''],
            address: [''],
            contactName: ['']

        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.showRoomForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.showRoomForm.invalid) {
            return;
        }
        console.log(JSON.stringify(this.showRoomForm.value));
        this.loading = true;
        this.showRoomService.register(this.showRoomForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/showrooms']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
