import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AuthenticationService } from './services';
import { User } from './models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    loading = false;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.alertService.success('logged out successfully', true);
        this.router.navigate(['/']);

    }
}
