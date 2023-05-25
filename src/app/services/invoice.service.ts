import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice, User } from '../models';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
    constructor(private http: HttpClient) { }

    private apiUrl = "http://localhost:8080/goldsmith/api"

    getAll() {
        return this.http.get<Invoice[]>(`${this.apiUrl}/invoices`);
    }

    getById(id: number) {
        return this.http.get(`${this.apiUrl}/invoice/${id}`);
    }

    create(invoice: Invoice) {
        return this.http.post(`${this.apiUrl}/invoice`, invoice);
    }

    update(invoice: Invoice) {
        return this.http.put(`${this.apiUrl}/invoice/${invoice.refId}`, invoice);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/invoice/${id}`);
    }

    getInvoicesBasedOnTheparams(showroom:String,fromDate:Date,toDate:Date){
            const object = {
              showroom : showroom,
              deliveryDate : fromDate,
              toDate : toDate
            }
        return this.http.post(`${this.apiUrl}/invoice/filters`, object);
        }


}
