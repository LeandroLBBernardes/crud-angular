import { Component, Injector, OnInit } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IGetParams } from 'src/app/interfaces/get_params.interface';
import { IResponse } from 'src/app/interfaces/response.interface';
import { CrudServiceService } from 'src/app/services/crud-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-view-screen',
  templateUrl: './post-view-screen.component.html',
  styleUrls: ['./post-view-screen.component.scss']
})
export class PostViewScreenComponent implements OnInit{
  public postsList: Array<{
    _id: string,
    title: string,
    content: string
  }> = [];

  private crudService: CrudServiceService;

  constructor(private injector: Injector) {
    this.crudService = this.injector.get(CrudServiceService);
  }

  public ngOnInit(): void {
    this.getAllPosts();
  }

  private getAllPosts(): void {
    this.crudService.get().pipe(
      catchError((error: any, caught: Observable<IGetParams>): any => {
        this.showErrorAlert(error);
      })
    ).subscribe((data: any) => {
      data.forEach((element: any) => {
        this.postsList = [...this.postsList,{
          _id: element._id,
          title: element.title,
          content: element.content
        }]
      });
    }
    )
  }

  private showErrorAlert(msg: string): void {
    Swal.fire({
      title: 'Erro!',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Continuar'
    })
  } 

  public deleteVisualPost(event: string) {
    this.postsList = this.postsList.filter((element: any) => element._id != event);
  }
}
