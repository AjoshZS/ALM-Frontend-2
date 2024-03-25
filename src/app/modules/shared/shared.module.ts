import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from '../../components/tree-view/tree-view.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';


@NgModule({
  declarations: [
    TreeViewComponent,
    HeaderComponent,
    ConfirmationComponent
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    TreeViewComponent,
    ConfirmationComponent
  ]
})
export class SharedModule { }
