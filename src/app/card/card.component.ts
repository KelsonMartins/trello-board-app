import { Component, Input, OnInit } from '@angular/core';
import { CardSchema } from '../shared/models/cardschema';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: CardSchema;

  constructor() { }

  ngOnInit(): void { }

  dragStart(e): void {
    e.dataTransfer.setData('text', e.target.id);
  }

  openDetail(): void {
    const modal = document.getElementById('cardTaskDetail');
    modal.style.display = 'block';
  }

}
