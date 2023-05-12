import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Input, OnInit, Output, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPostData } from 'src/app/interfaces/post-data.interface';
import { IPostParams } from 'src/app/interfaces/post-params.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit{
  
  @Input('modal-id') modalId: string = '';
  @Input('modal-title') modalTitle: string = '';
  @Input('modal-title-content') modalTitleContent: string = '';
  @Input('modal-text-content') modalTextContent: string = '';

  @Output() btnClickCancelEvent = new EventEmitter<boolean>();
  @Output() btnClickSaveEvent = new EventEmitter<IPostParams>();

  public count: number = 0;
  public value: any = '';
  public titleValue: string = '';
  public postForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.validation();
    this.count = this.modalTextContent.length;
    this.changeTextAreaColor(this.count);
  }

  private validation(): void {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.maxLength(600)]]
    });
  }

  public btnCancelClick(value: boolean) {
    this.btnClickCancelEvent.emit(value);
  }

  public btnSaveClick(): void {
    if(this.postForm.valid) {
      this.btnClickSaveEvent.emit(
        {
          title: this.modalTitleContent,
          content: this.modalTextContent
        }
      );
    }else {
      this.showErrorAlert();
    }
  }

  private showErrorAlert(): void {
    Swal.fire({
      title: 'Erro!',
      text: 'Todos os campos devem ser preenchidos.',
      icon: 'error',
      confirmButtonText: 'Continuar'
    })
  }
  
  public onChange(event: any): void {
    this.count = event.length;

    let aux: string = '';

    if(this.count == 600)
      aux = event;

    if(event.length > 600)
      this.value = aux;
      
    this.changeTextAreaColor(event.length)
  }

  private changeTextAreaColor(count: number): void {
    const textArea: any = document.getElementById('content');

    if(count > 600) {
      textArea.style.color = 'var(--red)';
    }else {
      textArea.style.color = 'black';
    }
  }
}
