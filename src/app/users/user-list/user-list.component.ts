
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { UserService, AlertService } from "src/app/services";
import { PageChangedEvent } from "ngx-bootstrap";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  users:any = [];
  returnedUserArray?: any[];
  returnedUserArrayCopy?: any[];
  startCount = 0;
  endCount = 12;
  itemsPerPage = [5, 10, 20, 50];
  selectedItemsPerPage: number = 5;
  username: any;
  mobileNumber: any;

  constructor(private userService: UserService,
    private router: Router,private alertService: AlertService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.userService.getAll().subscribe((res) => {
      this.users = res;
      this.returnedUserArray = this.users.slice(0, this.selectedItemsPerPage);
      this.returnedUserArrayCopy = JSON.parse(JSON.stringify(this.returnedUserArray));
    });
  }

  deleteUser(id: number) {
    this.userService.delete(id)
      .subscribe(
        data => {
          this.alertService.error('User deleted successfully', true);
          this.reloadData();
        },
        error => console.log(error));
  }

  userDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateUser(id: number){
    this.router.navigate(['/updateUser', id]);
  }
  addUser(){
  this.router.navigate(['register']);
  }

  pageChanged(event: PageChangedEvent): void {
    this.startCount = (event.page - 1) * event.itemsPerPage;
    this.endCount = event.page * event.itemsPerPage;
    this.returnedUserArray = this.users.slice(this.startCount, this.endCount);
  }

  onChangePagination(event) {
    this.selectedItemsPerPage = event.target.value;
    this.returnedUserArray = this.users.slice(0, this.selectedItemsPerPage);
  }

  onFilterChange(event, key) {
    const filterValue = event.target.value;
    console.log(filterValue);
    this.returnedUserArray = this.returnedUserArrayCopy.filter((res) =>
      res[key].toString().toLowerCase().startsWith(filterValue)
    );
  }
}
