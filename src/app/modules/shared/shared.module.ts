import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from '../../components/tree-view/tree-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    TreeViewComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTreeModule,
    MatIconModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    TreeViewComponent
  ]
})
export class SharedModule { }
