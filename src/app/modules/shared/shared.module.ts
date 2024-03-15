import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from '../../components/tree-view/tree-view.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    TreeViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    TreeViewComponent
  ]
})
export class SharedModule { }
