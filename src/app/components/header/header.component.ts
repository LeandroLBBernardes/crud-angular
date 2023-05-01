import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public router: Router;

  constructor(private injector: Injector) {
    this.router = injector.get(Router);
  }

  public redirectToMainScreen(): void {
    this.router.navigate(
      ['/main']
    );
  }

  public redirectToPostScreen(): void {
    this.router.navigate(
      ['/post']
    );
  }
}
