import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, Injector } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IGetParams } from 'src/app/interfaces/get_params.interface';
import { IPostData } from 'src/app/interfaces/post-data.interface';
import { IPostParams } from 'src/app/interfaces/post-params.interface';
import { CrudServiceService } from 'src/app/services/crud-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent implements OnInit{

  public formTitle: string = '';
  public contentTitle: string = '';
  public contentText: string = '';

  private crudService: CrudServiceService;
  
  constructor(public dialogRef: DialogRef<IPostParams>,
    private injector: Injector, 
    @Inject(DIALOG_DATA) public data: IPostData) {
      this.crudService = this.injector.get(CrudServiceService);
  }

  public ngOnInit(): void {
    this.formTitle = 'Editar';
    this.contentTitle = this.data.titleContent;
    this.contentText = this.data.textContent;
  }

  public closeModal(event: boolean): void {
    if(event)
      this.dialogRef.close();
  }

  public editPost(event: IPostParams): void {
    const dataUpdate: IPostParams = this.fillDataToUpdate(event);

    this.crudService.patch(this.data._id, dataUpdate).pipe(
      catchError((error: any, caught: Observable<IPostParams>): any => {
        this.showErrorAlert(error.message);
      })
    ).subscribe(
      (data: any) => {
        setTimeout(() => {
          this.dialogRef.close({
            title: event.title,
            content: event.content
          } as IPostParams);
        }, 300);

        this.showSucessAlert();
      }
    );
  }

  private fillDataToUpdate(event: IPostParams): IPostParams{
    return {
      title: event.title,
      content: event.content
    } as IPostParams;
  }

  private showErrorAlert(msg: string): void {
    Swal.fire({
      title: 'Erro!',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Continuar'
    })
  }

  private showSucessAlert(): void {
    Swal.fire({
      title: 'Sucesso!',
      text: 'Post editado com sucesso.',
      icon: 'success',
      confirmButtonText: 'Continuar'
    });
  }
}
