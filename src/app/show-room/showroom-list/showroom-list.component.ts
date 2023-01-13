
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ShowRoom } from "src/app/models/showRoom";
import { ShowRoomService } from "src/app/services/showroom.service";
import { AlertService } from "src/app/services";


@Component({
  selector: "app-showroom-list",
  templateUrl: "./showroom-list.component.html",
  styleUrls: ["./showroom-list.component.css"]
})
export class ShowRoomListComponent implements OnInit {
  showrooms: Observable<ShowRoom[]>;
  loading = false;
  submitted = false;

  constructor(private showRoomService: ShowRoomService,
    private router: Router,private alertService: AlertService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.showrooms = this.showRoomService.getAll();
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
    this.router.navigate(['update', id]);
  }
  addShowRoom(){
  this.router.navigate(['showroom']);
  }
}
