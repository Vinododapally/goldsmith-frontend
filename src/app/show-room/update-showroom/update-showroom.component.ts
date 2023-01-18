import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/models";
import { AlertService, UserService } from "src/app/services";
import { ShowRoomService } from "src/app/services/showroom.service";

@Component({
selector: 'app-update-showroom',
templateUrl: './update-showroom.component.html',
styleUrls: ['./update-showroom.component.css']
})
export class UpdateShowRoomComponent implements OnInit {

id: number;
showroom: any;

constructor(private route: ActivatedRoute,private router: Router,
private showroomService: ShowRoomService, private alertService: AlertService) { }

ngOnInit() {
this.showroom = new User();
this.id = this.route.snapshot.params['id'];
this.showroomService.getById(this.id)
.subscribe(data => {
this.showroom = data;
}, error => console.log(error));
}

updateShowRoom() {
this.showroomService.update(this.showroom)
.subscribe(data => {
this.showroom = new User();
this.alertService.success('ShowRoom Updated successfully', true);
this.gotoList();
}, error => console.log(error));
}

onSubmit() {
this.updateShowRoom();
}

gotoList() {
this.router.navigate(['/showrooms']);
}
}
