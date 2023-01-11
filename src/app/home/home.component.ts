import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../models';
import { AuthenticationService, UserService } from '../services';


@Component({   selector: 'app-home',templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: String;
    currentUserSubscription: Subscription;
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private router: Router,
    
    ) {
        // this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        //     console.log('stored user?'+JSON.stringify(user));
        //     this.currentUser = JSON.stringify(user);
        // });
        this.currentUser=localStorage.getItem('currentUser')
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        //this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
    }
}