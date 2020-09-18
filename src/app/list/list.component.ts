import { Component, Input, OnInit } from '@angular/core';
import { TrelloStoreService } from '../shared/common/trellostore.service';
import { Status, TaskSchema } from '../shared/models/boadschema';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: TaskSchema[];
  @Input() boardId: number;

  displayAddToDoTask = false;
  displayAddDoingTask = false;
  displayAddDoneTaskInput = false;

  constructor(private cardStore: TrelloStoreService) { }

  ngOnInit(): void { }

  get staged(): TaskSchema[] {
    const stagedArr = [...new Set(this.list.filter(item => item.status === Status.ToDo))];
    return stagedArr;
  }
  get inProgress(): TaskSchema[] {
    const inProgressArr = [...new Set(this.list.filter(item => item.status === Status.Doing))];
    return inProgressArr;
  }
  get completed(): TaskSchema[] {
    const completedArr = [...new Set(this.list.filter(item => item.status === Status.Done))];
    return completedArr;
  }

  allowDrop($event: DragEvent): void {
    $event.preventDefault();
  }

  drop($event: any): void {
    $event.preventDefault();
    const data = $event.dataTransfer.getData('taskId');
    let target = $event.target;

    while (target.className !== 'list') {
      target = target.parentNode;
    }

    target = target.querySelector('.list-group');

    if (target.className === 'list-group-item') {
      $event.target.parentNode.insertBefore(
        document.getElementById(data),
        $event.target
      );
    } else if (target.className === 'list__title') {
      if (target.children.length) {
        target.insertBefore(document.getElementById(data), target.children[0]);
      } else {
        target.appendChild(document.getElementById(data));
      }
    } else {
      target.appendChild(document.getElementById(data));
    }

    const tst = target.id;
    this.updateTaskStatus(data, tst);
  }

  addTask(value: string, status: string): void {
    const statusVal = status as Status;
    if (value !== '') {
      this.cardStore.newTaskCard(value, statusVal, this.boardId);
    }
  }

  updateTaskStatus(taskId: string, state: string): void {
    const task = this.list.find(x => x.id === taskId);
    const statusVal = state as Status;

    if (task) {
      task.status = statusVal;
      this.list = this.cardStore.updateTaskList(task, this.boardId);
    }
  }
}
