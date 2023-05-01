import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { IPostData } from 'src/app/interfaces/post-data.interface';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent implements OnInit{

  public formTitle: string = '';
  public contentTitle: string = '';
  public contentText: string = '';
  
  constructor(public dialogRef: DialogRef<string>, 
    @Inject(DIALOG_DATA) public data: IPostData) {

  }
  ngOnInit(): void {
    this.formTitle = 'Editar';
    this.contentTitle = this.data.titleContent;
    this.contentText = this.data.textContent;
  }

  public closeModal(event: boolean): void {
    if(event)
      this.dialogRef.close();
  }
}
