import { Component, Input, OnInit } from '@angular/core';
import { TaskSchema } from '../shared/models/boadschema';

declare var $: any;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: TaskSchema;
  @Input() boardId: number;

  constructor() { }

  ngOnInit(): void {
    $(window).click((e) => {
      const modal = $(`#taskCardModal-${this.task.id}-${this.boardId}`);
      if (e.target === modal[0]) {
        modal.css('display', 'none');
      }
    });
  }

  dragStart(e: any): void {
    e.dataTransfer.setData('taskId', this.task.id);
    e.dataTransfer.setData('taskStatus', this.task.status);
  }

  openModal(): void {
    $(`#taskCardModal-${this.task.id}-${this.boardId}`).css('display', 'block');
  }

  closeModal(): void {
    $(`#taskCardModal-${this.task.id}-${this.boardId}`).css('display', 'none');
  }

}
