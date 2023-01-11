
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ShowRoom } from "src/app/models/showRoom";
import { ShowRoomService } from "src/app/services/showroom.service";


@Component({
  selector: "app-showroom-list",
  templateUrl: "./showroom-list.component.html",
  styleUrls: ["./showroom-list.component.css"]
})
export class ShowRoomListComponent implements OnInit {
  showrooms: Observable<ShowRoom[]>;

  constructor(private showRoomService: ShowRoomService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.showrooms = this.showRoomService.getAll();
  }

  deleteUser(id: number) {
    this.showRoomService.delete(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  showRoomDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateShowRoom(id: number){
    this.router.navigate(['update', id]);
  }
  addShowRoom(){
  this.router.navigate(['showroom']);
  }
}
