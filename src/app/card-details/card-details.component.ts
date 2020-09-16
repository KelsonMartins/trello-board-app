import { Component, Input, OnInit } from '@angular/core';
import { TrelloStoreService } from '../shared/common/trellostore.service';
import { CardSchema } from '../shared/models/cardschema';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  @Input() Details: CardSchema;
  modal: HTMLElement;
  constructor(private cardStore: TrelloStoreService) {
    this.modal = document.getElementById('cardTaskDetail');
  }

  ngOnInit(): void {
    window.onclick = (event) => {
      if (event.target === this.modal) {
        this.modal.style.display = 'none';
      }
    };
  }

  onEnter(text: string): void {
    if (text !== '') {
      this.cardStore.newComment(this.Details?.id, text);
    }
  }
}
