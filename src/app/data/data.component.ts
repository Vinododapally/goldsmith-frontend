import { Component, OnInit } from '@angular/core';
import { ExportToExcelService } from '../services/export-to-excel.service';
import { TodosService } from '../services/todos.service';


import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
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

  constructor(
    private todoService: TodosService,
    private exportToExcel: ExportToExcelService
  ) {
    this.searchField
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((res) => {
        console.log(res);
      });
  }

  ngOnInit() {
    this.getData();
    // this.commaSeparated();
    console.log('selectedItemsPerPage', this.selectedItemsPerPage);
  }

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

  // get all data from API
  getData() {
    this.todoService.getTodos().subscribe((res) => {
      if (res) {
        this.hideLoader();
      }
      this.users = res;
      console.log(this.users);
      this.usersCopy = JSON.parse(JSON.stringify(res));
      this.returnedArray = this.users.slice(0, this.selectedItemsPerPage);
      this.returnedArrayCopy = JSON.parse(JSON.stringify(this.returnedArray));
      console.log(this.returnedArray);
    });
    console.log('returnedArray', this.returnedArray);
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

  // Backend Api search
  searchTitle(event) {
    this.searchField.next(event.target.value);
    // console.log(this.searchField);
  }

  //On Dropdown Change
  onDropdownChange(event) {
    if (this.selectCompleted != '') {
      this.users = this.usersCopy.filter(
        (res) => res.completed.toString() == this.selectCompleted
      );
    } else {
      this.users = this.usersCopy;
    }
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
        'USER ID': el.userId,
        ID: el.id,
        TITLE: el.title,
        COMPLETED: el.completed,
      };
      exportData.push(obj);
    });
    return exportData;
  }

  //Export To PPT
  // exportToPpt(): void {
  //   const container = document.getElementById('table');
  //   html2canvas(container, { scrollY: -window.scrollY }).then((canvas) => {
  //     const link = document.createElement('a');
  //     document.body.appendChild(link);
  //     link.download = 'Table Data.jpg';
  //     link.href = canvas.toDataURL();
  //     const pres = new pptxgen();
  //     const slide = pres.addSlide();
  //     slide.addText(
  //       [
  //         {
  //           text: 'Table Data',
  //           options: { color: '#3e87e8' },
  //         },
  //       ],
  //       { x: 0.2, y: 0.2 }
  //     );
  //     slide.addImage({ data: link.href, x: 0, y: 0.6, w: 4.5, h: 5.2 });
  //     pres.writeFile({ fileName: 'Table-Data.pptx' });
  //   });
  // }
}
