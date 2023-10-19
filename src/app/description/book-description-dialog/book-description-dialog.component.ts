import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-book-description-dialog',
  template: `
    <h2 mat-dialog-title>{{data.title}}</h2>
    <mat-dialog-content class="test">
      {{data.description}}
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
})
export class BookDescriptionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BookDescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string; description: string}
  ) {}
}
