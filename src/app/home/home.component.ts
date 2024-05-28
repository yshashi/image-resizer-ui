import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ImageSelectionDialogComponent } from '../image-selection-dialog/image-selection-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  #dialog = inject(MatDialog);
  imagePreview: ImagePreview = null;
  fileName!: string;
  onFileSelected(event: Event) {
    console.log(event);
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }
    this.fileName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.openDialog(this.imagePreview, file);
    };
    reader.readAsDataURL(file);
  }

  openDialog(imagePreview: ImagePreview, file: File) {
    const dialogRef = this.#dialog.open(ImageSelectionDialogComponent, {
      panelClass: 'custom-dialog',
      data: {
        imagePreview,
        fileName: this.fileName,
        file
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

export type ImagePreview = string | ArrayBuffer | null;
