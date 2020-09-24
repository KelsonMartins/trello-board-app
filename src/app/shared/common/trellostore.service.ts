import { Injectable } from '@angular/core';
import { BoardSchema, CommentSchema, Status, TaskSchema } from '../models/boadschema';

@Injectable({
  providedIn: 'root'
})
export class TrelloStoreService {
  boards: Array<BoardSchema>;

  constructor() {
    this.boards = JSON.parse(localStorage.getItem('MyBoards')) ?? [];
  }

  // !BOARDS
  createBoard(title: string): void {
    const board: BoardSchema = {
      id: ++this.boards.length,
      title,
      lists: []
    };

    this.boards[--this.boards.length] = board;

    this.updateStorage();
  }
  removeBoard(boardId: number): void {
    const boardToDelete = this.getBoard(boardId);

    this.boards.forEach((item, index) => {
      if (item === boardToDelete) { this.boards.splice(index, 1); }
    });

    this.updateStorage();
  }
  private getBoard(boardId: number): BoardSchema {
    return this.boards.find(x => x.id === boardId);
  }

  private updateBoard(boardToUpdate: BoardSchema): void {
    const index = this.boards.findIndex(x => x.id === boardToUpdate.id);
    this.boards[index] = boardToUpdate;
    this.updateStorage();
  }

  // !TASK-CARDS
  newTaskCard(title: string, status: Status, boardId: number): void {
    const board = this.getBoard(boardId);
    let newTaskId = board.lists.length;
    const taskCard: TaskSchema = {
      id: String(++newTaskId),
      title,
      status,
      comments: []
    };

    board.lists.push(taskCard);

    this.updateBoard(board);
  }
  updateTaskCard(task: TaskSchema, boardId: number): TaskSchema {
    const board = this.getBoard(boardId);
    const index = board.lists.findIndex(x => x.id === task.id);
    board.lists[index] = task;

    this.updateBoard(board);

    return task;
  }
  updateTaskList(task: TaskSchema, boardId: number): TaskSchema[] {
    const board = this.getBoard(boardId);
    const index = board.lists.findIndex(x => x.id === task.id);

    board.lists.splice(index, 1, task);

    this.updateBoard(board);

    return board.lists;
  }

  // !COMMENTS
  newComment(boardId: number, taskId: string, text: string): TaskSchema {
    const board = this.getBoard(boardId);
    const taskToUpdate = board.lists.find(x => x.id === taskId);

    const comment: CommentSchema = {
      text,
      date: new Date()
    };

    if (taskToUpdate) {
      taskToUpdate.comments.push(comment);
      const index = board.lists.findIndex(x => x.id === taskToUpdate.id);
      board.lists[index] = taskToUpdate;
    }

    this.updateBoard(board);

    return taskToUpdate;
  }

  // Save boards to localStorage
  private updateStorage(): void {
    localStorage.clear();
    localStorage.setItem('MyBoards', JSON.stringify(this.boards));
  }
}
