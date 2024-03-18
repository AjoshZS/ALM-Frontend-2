import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent {
  @Input() treeData:any;
  @Output() toggleMenuEvent = new EventEmitter();

  toggleMenu(){
    this.toggleMenuEvent.emit()
  }

}
