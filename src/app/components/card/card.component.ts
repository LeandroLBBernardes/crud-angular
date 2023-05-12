import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { PostModalComponent } from '../post-modal/post-modal.component';
import { IPostData } from 'src/app/interfaces/post-data.interface';
import Swal from 'sweetalert2';
import { CrudServiceService } from 'src/app/services/crud-service.service';
import { Observable, catchError } from 'rxjs';
import { IResponse } from 'src/app/interfaces/response.interface';
import { IPostParams } from 'src/app/interfaces/post-params.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input('card-id') cardId: string = '';
  @Input('card-title') cardTitle: string = '';
  @Input('card-text') cardText: string = '';

  @Output() wasErased = new EventEmitter<string>();

  private crudService: CrudServiceService;
  
  constructor(public dialog: Dialog, private injector: Injector) {
    this.crudService = this.injector.get(CrudServiceService);
  }

  public openEditDialog(): void {
    const dialogRef: any = this.dialog.open(PostModalComponent, {
      data: {
        _id: this.cardId,
        title: 'Editar',
        titleContent: this.cardTitle,
        textContent: this.cardText
      } as IPostData
    });

    dialogRef.closed.subscribe(
      (data: IPostParams) => {
        this.cardTitle = data.title;
        this.cardText = data.content;
      }
    );
  }

  public deletePost(): void {
    console.log('uai');
    this.showAlertModal();
  }

  private showAlertModal(): void {
    Swal.fire({
      title: 'Tem certeza que deseja excluir?',
      text: "Você não poderá voltar atrás.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete!',
      cancelButtonText: 'Não, não delete.'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteByService();
      }
    })
  }

  private deleteByService(): void {
    this.crudService.delete(this.cardId).pipe(
      catchError((error: any, caught: Observable<IResponse>): any => {
        this.showDeleteErrorAlert(error.message);
      })
    ).subscribe((data: any) => {
      this.showSucessAlertModal();
    });
  }

  private showDeleteErrorAlert(msg: string): void {
    Swal.fire({
      title: 'Erro!',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Continuar'
    })
  }
  
  private showSucessAlertModal(): void {
    Swal.fire({
      title: 'Deletado!',
      text: 'Seu post foi deletado!',
      icon: 'success'
    }).then((result) => {
      if (result.isConfirmed) {
        this.wasErased.emit(this.cardId);
      }
    })
  }
}
