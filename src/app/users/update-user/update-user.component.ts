import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/models";
import { AlertService, UserService } from "src/app/services";

@Component({
selector: 'app-update-user',
templateUrl: './update-user.component.html',
styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

id: number;
user: any;

constructor(private route: ActivatedRoute,private router: Router,
private userService: UserService, private alertService: AlertService) { }

ngOnInit() {
this.user = new User();
this.id = this.route.snapshot.params['id'];
this.userService.getById(this.id)
.subscribe(data => {
this.user = data;
}, error => console.log(error));
}

updateUser() {
this.userService.update(this.user)
.subscribe(data => {
this.user = new User();
this.alertService.success('User Updated successfully', true);
this.gotoList();
}, error => console.log(error));
}

onSubmit() {
this.updateUser();
}

gotoList() {
this.router.navigate(['/users']);
}
}
