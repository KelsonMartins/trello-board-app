import { Component, OnInit } from '@angular/core';
import { TrelloStoreService } from '../shared/common/trellostore.service';
import { BoardSchema } from '../shared/models/boadschema';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  constructor(private cardStore: TrelloStoreService) { }

  ngOnInit(): void { }

  get boards(): BoardSchema[] {
    return this.cardStore.boards;
  }

  addBoard(title: string): void {
    if (title !== '') {
      this.cardStore.createBoard(title);
    }
  }

  closeBoard(board: BoardSchema): void {
    this.cardStore.removeBoard(board.id);
  }
}
