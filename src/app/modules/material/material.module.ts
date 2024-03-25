import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatRippleModule,
    MatIconModule,
    MatTreeModule,
    MatIconModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
  ],
  exports: [
    MatRippleModule,
    MatIconModule,
    MatTreeModule,
    MatIconModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatAutocompleteModule
  ]
})
export class MaterialModule { }
