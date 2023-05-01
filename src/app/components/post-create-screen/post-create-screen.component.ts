import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create-screen',
  templateUrl: './post-create-screen.component.html',
  styleUrls: ['./post-create-screen.component.scss']
})
export class PostCreateScreenComponent {
  public router: Router;

  constructor(private injector: Injector) {
    this.router = injector.get(Router);
  }

  public redirectToMainScreen(event: boolean): void {
    if(event)
      this.router.navigate(
        ['/main']
      );
  }
}
