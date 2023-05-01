import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { IPostData } from 'src/app/interfaces/post-data.interface';

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
  @Output() btnClickEvent = new EventEmitter<boolean>();

  public count: number = 0;
  public value: any = '';
  public titleValue: string = '';

  public ngOnInit(): void {
    this.count = this.modalTextContent.length;
    this.changeTextAreaColor(this.count);
  }

  public btnClick(value: boolean) {
    this.btnClickEvent.emit(value);
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
