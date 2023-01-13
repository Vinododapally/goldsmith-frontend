import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, AlertService } from '../services';
import { InvoiceService } from '../services/invoice.service';
import { ShowRoomService } from '../services/showroom.service';
import { Observable } from 'rxjs';
import { ShowRoom } from '../models/showRoom';


@Component({templateUrl: 'invoice.component.html'})
export class InvoiceComponent implements OnInit {
    invoiceForm: FormGroup;
    loading = false;
    submitted = false;
    ImagePath: string;
    showrooms: Observable<ShowRoom[]>;
    stoneWtInGrams: number = 0;
    netWeight = 0;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private invoiceService: InvoiceService,
        private alertService: AlertService,
        private showRoomService: ShowRoomService
    ) {
        /* if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        } */
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
            makingCharges: ['', Validators.required],
            gold92Per: ['', Validators.required],
            gold12Per: ['', Validators.required],
            deliveryDate: ['', [Validators.required]],
            stoneWeightInCarat: ['', [Validators.required]],
            stoneWeightInGrams: ['']
        });

        this.showrooms = this.showRoomService.getAll();
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
                    this.router.navigate(['/invoices']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    onChange(stoneWtCarat: number) {
    let stoneWtField = this.invoiceForm.get('stoneWeightInGrams');
        stoneWtField.setValue((stoneWtCarat * 200)/1000);

    let stoneWtGm = stoneWtField.value;
    let grossWt = this.invoiceForm.get('grossWeight').value;
    let netWtField = this.invoiceForm.get('netWeight');
    netWtField.setValue(grossWt - stoneWtGm);
    let netWt = netWtField.value;
    let nineTwoPerField = this.invoiceForm.get('gold92Per');
        nineTwoPerField.setValue((netWt * 92)/100);
    let nineTwoPer = nineTwoPerField.value;
    let twelvePerField = this.invoiceForm.get('gold12Per');
        twelvePerField.setValue((nineTwoPer * 12)/100);
    let mcField = this.invoiceForm.get('makingCharges');
        mcField.setValue((nineTwoPer + twelvePerField.value) * 100);
    }
}
