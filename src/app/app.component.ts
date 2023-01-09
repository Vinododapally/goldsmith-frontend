import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models';
import { AuthenticationService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  user: User = new User();
  title = 'goldsmith-frontend';

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

    onSubmit() {
      console.log(this.user);
      this.authenticationService
      .login(this.user).subscribe(data => {
        console.log(data)
        this.user = new User();
        this.goto();
      },
      error => console.log(error));
    }
    goto() {
      this.router.navigate(['/home']);
    }

}
