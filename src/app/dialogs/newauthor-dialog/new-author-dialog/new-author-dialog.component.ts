import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export interface NewAuthorData {
  id: number;
  name: string;
}

@Component({
  selector: 'app-new-author-dialog',
  templateUrl: './new-author-dialog.component.html',
  styleUrls: ['./new-author-dialog.component.css']
})
export class NewAuthorDialogComponent {
  
  data: NewAuthorData = { name: '', id: 0};

  constructor(
    public dialogRef: MatDialogRef<NewAuthorDialogComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.dialogRef.close(this.data);
  }
}
