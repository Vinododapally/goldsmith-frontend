import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<String>;
    public currentUser: Observable<String>;
      private apiUrl = "http://localhost:8081"
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<String>(localStorage.getItem('currentUser'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): String {
        return this.currentUserSubject.value;
    }

    login(user:User) {
        const username=user.username;
        const password=user.password;
           
        return this.http.post<any>(`${this.apiUrl}/authenticate`, {username, password },{ observe: 'response' })
            .pipe(map(user => {
                let jwt =JSON.stringify(user);
                let jwtData = jwt.split('.')[1]
                let decodedJwtJsonData = window.atob(jwtData)
                let decodedJwtData = JSON.parse(decodedJwtJsonData)
                let currentUsr = decodedJwtData.sub
                console.log('current user logged in:'+currentUsr)
                console.log('current user status:'+user.status);
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', currentUsr);
                   //this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        //this.currentUserSubject.next(null);
    }
}
