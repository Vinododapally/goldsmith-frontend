
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { User } from "src/app/models";
import { UserService, AlertService } from "src/app/services";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  users: Observable<User[]>;

  constructor(private userService: UserService,
    private router: Router,private alertService: AlertService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.users = this.userService.getAll();
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
    this.router.navigate(['update', id]);
  }
  addUser(){
  this.router.navigate(['register']);
  }
}
