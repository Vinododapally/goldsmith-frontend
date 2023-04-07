import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    private apiUrl = "http://shirngarjewellers-env.eba-smazfu8u.ap-northeast-1.elasticbeanstalk.com/api"

    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${this.apiUrl}/user/${id}`);
    }

    register(user: User) {
        return this.http.post(`${this.apiUrl}/user`, user);
    }

    update(user: User) {
        return this.http.put(`${this.apiUrl}/user/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/user/${id}`);
    }

    getByUserName(name: String) {
        return this.http.get(`${this.apiUrl}/user/${name}`);
    }
}
