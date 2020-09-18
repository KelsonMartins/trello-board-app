import { Component, Input, OnInit } from '@angular/core';
import { TrelloStoreService } from '../shared/common/trellostore.service';
import { TaskSchema } from '../shared/models/boadschema';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html'
})
export class CardDetailsComponent implements OnInit {
  @Input() taskDetails: TaskSchema;
  @Input() boardId: number;

  constructor(private cardStore: TrelloStoreService) { }

  ngOnInit(): void { }

  addComment(text: string): void {
    if (text !== '') {
      this.taskDetails = this.cardStore.newComment(this.boardId, this.taskDetails.id, text);
    }
  }
  updateTaskDetails(e): void {
    if (e) {
      this.taskDetails = this.cardStore.updateTaskCard(this.taskDetails, this.boardId);
    }
  }
}
