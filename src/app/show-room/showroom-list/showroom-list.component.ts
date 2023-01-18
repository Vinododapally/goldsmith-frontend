
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ShowRoomService } from "src/app/services/showroom.service";
import { AlertService } from "src/app/services";
import { PageChangedEvent } from "ngx-bootstrap";


@Component({
  selector: "app-showroom-list",
  templateUrl: "./showroom-list.component.html",
  styleUrls: ["./showroom-list.component.css"]
})
export class ShowRoomListComponent implements OnInit {
  loading = false;
  submitted = false;

  showrooms:any = [];
  returnedShowRoomArray?: any[];
  returnedShowRoomArrayCopy?: any[];
  startCount = 0;
  endCount = 12;
  itemsPerPage = [5, 10, 20, 50];
  selectedItemsPerPage: number = 5;
  name: any;
  contactName: any;

  constructor(private showRoomService: ShowRoomService,
    private router: Router,private alertService: AlertService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.showRoomService.getAll().subscribe((res) => {
      this.showrooms = res;
      this.returnedShowRoomArray = this.showrooms.slice(0, this.selectedItemsPerPage);
      this.returnedShowRoomArrayCopy = JSON.parse(JSON.stringify(this.returnedShowRoomArray));
    });
  }

  deleteShowRoom(id: number) {
    this.showRoomService.delete(id)
      .subscribe(
        data => {
          this.alertService.error('Showroom deleted successfully', true);
          this.reloadData();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
      });
  }

  showRoomDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateShowRoom(id: number){
    this.router.navigate(['updateshowroom', id]);
  }
  addShowRoom(){
  this.router.navigate(['showroom']);
  }

  pageChanged(event: PageChangedEvent): void {
    this.startCount = (event.page - 1) * event.itemsPerPage;
    this.endCount = event.page * event.itemsPerPage;
    this.returnedShowRoomArray = this.showrooms.slice(this.startCount, this.endCount);
  }

  onChangePagination(event) {
    this.selectedItemsPerPage = event.target.value;
    this.returnedShowRoomArray = this.showrooms.slice(0, this.selectedItemsPerPage);
  }

  onFilterChange(event, key) {
    const filterValue = event.target.value;
    console.log(filterValue);
    this.returnedShowRoomArray = this.returnedShowRoomArrayCopy.filter((res) =>
      res[key].toString().toLowerCase().startsWith(filterValue)
    );
  }
}
