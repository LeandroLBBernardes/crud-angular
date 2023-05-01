import { Dialog } from '@angular/cdk/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { PostModalComponent } from '../post-modal/post-modal.component';
import { IPostData } from 'src/app/interfaces/post-data.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input('card-id') cardId: string = '';
  @Input('card-title') cardTitle: string = '';
  @Input('card-text') cardText: string = '';
  
  constructor(public dialog: Dialog) {

  }

  ngOnInit(): void {
  }  

  public openEditDialog(): void {
    this.dialog.open(PostModalComponent, {
      data: {
        title: 'Editar',
        titleContent: this.cardTitle,
        textContent: this.cardText
      } as IPostData
    });
  }
}
