import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import { ShowRoom } from '../models/showRoom';

@Injectable({ providedIn: 'root' })
export class ShowRoomService {
    constructor(private http: HttpClient) { }

    private apiUrl = "http://shirngarjewellers-env.eba-smazfu8u.ap-northeast-1.elasticbeanstalk.com/api"

    getAll() {
        return this.http.get<ShowRoom[]>(`${this.apiUrl}/showrooms`);
    }

    getById(id: number) {
        return this.http.get(`${this.apiUrl}/showroom/${id}`);
    }

    create(showRoom: ShowRoom) {
        return this.http.post(`${this.apiUrl}/showroom`, showRoom);
    }

    update(showRoom: ShowRoom) {
        return this.http.put(`${this.apiUrl}/showroom/${showRoom.id}`, showRoom);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/showroom/${id}`);
    }
}
