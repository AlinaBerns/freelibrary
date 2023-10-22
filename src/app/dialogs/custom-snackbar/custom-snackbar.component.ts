import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: 'custom-snackbar.component.html',
  styleUrls: ['custom-snackbar.component.css']
})
export class CustomSnackbarComponent {
  message = 'Are you sure you want continue ? This action cannot be undone.';

  constructor(
      public snackBarRef: MatSnackBarRef<CustomSnackbarComponent>,
      @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  onConfirm(): void {
      this.data.action();
      this.snackBarRef.dismiss();
  }

  onCancel(): void {
      this.snackBarRef.dismiss();
  }
}