import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, AlertService } from '../services';
import { InvoiceService } from '../services/invoice.service';


@Component({templateUrl: 'invoice.component.html'})
export class InvoiceComponent implements OnInit {
    invoiceForm: FormGroup;
    loading = false;
    submitted = false;
    ImagePath: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private invoiceService: InvoiceService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
        this.ImagePath = '/assets/images/bg.jpg'
    }

    ngOnInit() {
        this.invoiceForm = this.formBuilder.group({
            orderNumber: ['', Validators.required],
            showroom: ['', Validators.required],
            itemName: ['', Validators.required],
            grossWeight: ['', Validators.required],
            totalStones: ['', Validators.required],
            netWeight: ['', Validators.required],
            stoneWeight: ['', Validators.required],
            makingCharges: ['', Validators.required],
            gold92Per: ['', Validators.required],
            gold12Per: ['', Validators.required],
            deliveryDate: ['', [Validators.required]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.invoiceForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.invoiceForm.invalid) {
            return;
        }
        console.log(JSON.stringify(this.invoiceForm.value));
        this.loading = true;
        this.invoiceService.create(this.invoiceForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Invoices saved successfully', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
