import { Injectable } from '@angular/core';
import { BoardSchema } from '../models/boadschema';
import { CardSchema, Comment } from '../models/cardschema';
import { ListSchema } from '../models/listschema';

@Injectable({
  providedIn: 'root'
})
export class TrelloStoreService {
  boards: Array<BoardSchema> = [];
  cards: Array<CardSchema> = [];
  lastid = -1;

  constructor() {
    this.boards = JSON.parse(localStorage.getItem('MyBoards')) ?? [];
  }

  // !BOARDS
  getBoard(boardId: number): BoardSchema {
    return this.boards.find(x => x.id === boardId);
  }
  createBoard(title: string): void {
    const board: BoardSchema = {
      id: ++this.boards.length,
      title,
      lists: [
        {
          name: 'To Do',
          cards: []
        },
        {
          name: 'Doing',
          cards: []
        },
        {
          name: 'Done',
          cards: []
        }
      ]
    };

    this.boards.push(board);

    this.updateStorage();
  }
  updateBoard(boardToUpdate: BoardSchema): void {
    const index = this.boards.findIndex(x => x.id === boardToUpdate.id);
    this.boards[index] = boardToUpdate;
    this.updateStorage();
  }
  removeBoard(boardId: number): void {
    const boardToDelete = this.getBoard(boardId);

    this.boards.forEach((item, index) => {
      if (item === boardToDelete) { this.boards.splice(index, 1); }
    });

    this.updateStorage();
  }

  // !CARDS
  getCard(cardId: string): CardSchema {
    const cards = this.boards;
    return this.cards.find(x => x.id === cardId);
  }
  newCard(description: string, boardId: number, listIndex: number = 0): ListSchema {
    const board = this.getBoard(boardId);

    let cardId = board.lists[listIndex].cards.length;
    const card: CardSchema = {
      id: String(++cardId),
      description,
      comments: []
    };

    board.lists[listIndex].cards.push(card);
    this.updateBoard(board);

    return board.lists[listIndex];
  }

  // !COMMENTS
  newComment(cardId: string, text: string): void {
    const comment: Comment = {
      text,
      date: new Date()
    };
    const card = this.getCard(cardId);

    if (card) {
      card.comments.push(comment);
    }
  }

  // Save boards to localStorage
  private updateStorage(): void {
    localStorage.setItem('MyBoards', JSON.stringify(this.boards));
  }
}
