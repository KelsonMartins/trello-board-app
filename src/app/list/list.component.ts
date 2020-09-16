import { Component, Input, OnInit } from '@angular/core';
import { TrelloStoreService } from '../shared/common/trellostore.service';
import { ListSchema } from '../shared/models/listschema';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: ListSchema;
  @Input() boardId: number;
  @Input() listIndex: number;

  displayAddCard = false;
  constructor(public cardStore: TrelloStoreService) { }

  toggleDisplayAddCard(): void {
    this.displayAddCard = !this.displayAddCard;
  }

  ngOnInit(): void { }

  allowDrop($event): void {
    $event.preventDefault();
  }

  drop($event): void {
    $event.preventDefault();
    const data = $event.dataTransfer.getData('text');
    let target = $event.target;
    const targetClassName = target.className;
    while (target.className !== 'list') {
      target = target.parentNode;
    }
    target = target.querySelector('.card-container');
    if (targetClassName === 'card') {
      $event.target.parentNode.insertBefore(
        document.getElementById(data),
        $event.target
      );
    } else if (targetClassName === 'list__title') {
      if (target.children.length) {
        target.insertBefore(document.getElementById(data), target.children[0]);
      } else {
        target.appendChild(document.getElementById(data));
      }
    } else {
      target.appendChild(document.getElementById(data));
    }
  }

  onEnter(value: string): void {
    if (value !== '') {
      const updatedListWithCardTask = this.cardStore.newCard(value, this.boardId, this.listIndex);
      this.list = updatedListWithCardTask;
      console.log(JSON.stringify(this.list));
    }
  }
}
