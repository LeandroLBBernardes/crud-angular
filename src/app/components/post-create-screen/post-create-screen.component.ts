import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { IPostParams } from 'src/app/interfaces/post-params.interface';
import { IResponse } from 'src/app/interfaces/response.interface';
import { CrudServiceService } from 'src/app/services/crud-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-create-screen',
  templateUrl: './post-create-screen.component.html',
  styleUrls: ['./post-create-screen.component.scss']
})
export class PostCreateScreenComponent {

  public router: Router;
  public crudService: CrudServiceService;

  constructor(private injector: Injector) {
    this.router = this.injector.get(Router);
    this.crudService = this.injector.get(CrudServiceService);
  }

  public redirectToMainScreen(): void {
    this.router.navigate(
      ['/main']
    );
  }

  public post(event: IPostParams): void {
    this.crudService.post(event).pipe(
      catchError((error: any, caught: Observable<IResponse>): any => {
        this.showErrorAlert(error);
      })
    ).subscribe((data: any) => {
      this.showSucessAlert();
    })
  }

  public showSucessAlert(): void {
    Swal.fire({
      title: 'Sucesso!',
      text: 'Post cadastrado com sucesso.',
      icon: 'success',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.redirectToMainScreen();
      }
    });
  }

  public showErrorAlert(msg: string): void {
    Swal.fire({
      title: 'Erro!',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Continuar'
    })
  }
}
