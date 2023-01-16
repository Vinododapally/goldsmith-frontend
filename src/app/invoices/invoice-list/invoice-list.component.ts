
import { Observable, Subject } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Invoice } from "src/app/models";
import { AlertService } from "src/app/services";
import { InvoiceService } from "src/app/services/invoice.service";
import { ExportToExcelService } from "src/app/services/export-to-excel.service";
import { PageChangedEvent } from "ngx-bootstrap";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-invoice-list",
  templateUrl: "./invoice-list.component.html",
  styleUrls: ["./invoice-list.component.css"]
})
export class InvoiceListComponent implements OnInit {
  //invoices: Observable<Invoice[]>;
  invoices: any = [];

  // filtering changes starts
  returnedArray?: any[];
  returnedArrayCopy?: string[];
  startCount = 0;
  endCount = 12;
  itemsPerPage = [5, 10, 20, 50];
  selectedItemsPerPage: number = 5;

  searchField: Subject<any> = new Subject();
  users: any = [];
  usersCopy: any = [];

  exporting: any = false;

  userid: any;
  id: any;
  title: any = '';
  selectCompleted: any = '';
// filtering changes end


  constructor(private invoiceService: InvoiceService,
    private router: Router,private alertService: AlertService,
    private exportToExcel: ExportToExcelService) {


    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.invoiceService.getAll().subscribe((res) => {
      // if (res) {
      //   this.hideLoader();
      // }
      console.log('from the backend date===>'+JSON.stringify(res))
      this.users = res;
      this.returnedArray = this.users.slice(0, this.selectedItemsPerPage);
      this.returnedArrayCopy = JSON.parse(JSON.stringify(this.returnedArray));
    });
  }

  deleteUser(id: number) {
    this.invoiceService.delete(id)
      .subscribe(
        data => {
          this.alertService.error('Invoice deleted successfully', true);
          this.reloadData();
        },
        error => console.log(error));
  }

  invoiceDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateInvoice(id: number){
    this.router.navigate(['update', id]);
  }
  addInvoice(){
  this.router.navigate(['invoice']);
  }

// filtering changes starts
  pageChanged(event: PageChangedEvent): void {
    console.log(event);
    this.startCount = (event.page - 1) * event.itemsPerPage;
    this.endCount = event.page * event.itemsPerPage;
    this.returnedArray = this.users.slice(this.startCount, this.endCount);
    console.log(this.users.length / 2);
  }

  onChangePagination(event) {
    console.log(event.target.value);
    this.selectedItemsPerPage = event.target.value;
    this.returnedArray = this.users.slice(0, this.selectedItemsPerPage);
  }

    // Hide The Loader
    hideLoader() {
      document.getElementById('loading').style.display = 'none';
    }

     // On Filter Of Data
  onFilterChange(event, key) {

    const filterValue = event.target.value;
    console.log(filterValue);
    this.returnedArray = this.returnedArrayCopy.filter((res) =>
      res[key].toString().toLowerCase().startsWith(filterValue)
    );
  }

       // On Filter Of Data
       onFilterChangeForDate(event, key) {

        const filterValue = event.target.value;

        console.log('==================='+filterValue);
        const format = 'yyyy-MM-dd';
        //const myDate = '2019-06-29';
        const locale = 'en-US';
        const formattedDate = formatDate(filterValue, format, locale);
       // SimpleDateFormat("yyyy-MM-dd").;
        //2023-01-09T18:30:00.000+00:00
        console.log(formattedDate);
        this.returnedArray = this.returnedArrayCopy.filter((res) =>
          res[key].toString().toLowerCase().startsWith(formattedDate)
        );
      }

  // Export To Excel
  exportToExcelFun() {
    this.exporting = true;
    this.exportToExcel.exportAsExcelFile(this.getDataToExport(), 'Todos');
    setTimeout(() => {
      this.exporting = false;
    }, 3000);
  }

  getDataToExport() {
    const exportData = [];
    this.returnedArray.forEach((el) => {
      const obj = {
        'Delivery Date': el.deliveryDate,
        'Order Number': el.orderNumber,
        'Show Room': el.showroom,
        'item Name': el.itemName,
        'Gross Weight': el.grossWeight,
        'Total Stones': el.totalStones,
        'StoneWeight InCarat': el.stoneWeightInCarat,
        'StoneWeight InGrams': el.stoneWeightInGrams,
        'Net Weight': el.netWeight,
        'Gold (92 %)': el.gold92Per,
        'Gold (12 %)': el.gold12Per,
        'Making Charges': el.makingCharges,
      };
      exportData.push(obj);
    });
    return exportData;
  }

//    date_TO_String(date_Object) {
//     // get the year, month, date, hours, and minutes seprately and append to the string.
//     var date_String = date_Object.getFullYear() +
//        "/" +
//        (date_Object.getMonth() + 1) +
//        "/" +
//        +date_Object.getDate() +
//        " " +
//        +date_Object.getHours() +
//        ":" +
//        +date_Object.getMinutes();
//     return date_String;
//  }
//   const new_date = new Date();
//  // calling the date_TO_String function
//   const date_string = this.date_TO_String(new_date);

}
function SimpleDateFormat(arg0: string) {
  throw new Error("Function not implemented.");
}

