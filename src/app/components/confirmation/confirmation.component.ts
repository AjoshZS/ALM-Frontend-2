import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {
  isSaveActive:boolean =true;
  @Input() message!: string;
  @Output() confirmed: EventEmitter<void> = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.message = data.message;
    }
  onConfirm(): void {
    this.confirmed.emit(); 
    this.dialogRef.close(); 
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
