import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services';
import { User } from './models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: String;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {
      this.currentUser=localStorage.getItem('currentUser')
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/']);

    }
}
