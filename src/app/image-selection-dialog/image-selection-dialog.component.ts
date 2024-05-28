import { IMAGE_SIZES } from '../image-size.constant';
import { Component, Inject, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ImagePreview } from '../home/home.component';
import { ImageService } from '../services/image.service';
import { HttpResponse } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-image-selection-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `<h2 mat-dialog-title>Select format</h2>
    <mat-dialog-content class="mat-typography">
      <div class="relative">
        <img
          [src]="imagePreview"
          width="800"
          height="800"
          class="mx-auto pb-4"
          alt=""
        />
        @if (isDownloadVisible()) {
        <div class="overlay">
          <span (click)="reset()" class="absolute top-2 right-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="#00dddd"
            >
              <path
                d="M19 5L4.99998 19M5.00001 5L19 19"
                stroke="#00dddd"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <button (click)="downloadImage()" mat-button>
            Click to Download
          </button>
        </div>
        }
      </div>
      <div class="grid grid-cols-4 gap-4">
        @for (item of imageFormats; track $index) {
        <div>
          <button
            (click)="uploadImage(item)"
            [disabled]="isDownloadVisible()"
            mat-button
            class="cursor-pointer"
            [class.disabled]="isDownloadVisible()"
          >
            {{ IMAGE_SIZES[item].formatName }}
          </button>
        </div>
        }
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions> `,
  standalone: true,
})
export class ImageSelectionDialogComponent {
  imagePreview: ImagePreview;
  fileName: string;
  file: File;
  imageFormats = Object.keys(IMAGE_SIZES);
  IMAGE_SIZES = IMAGE_SIZES;
  isDownloadVisible = signal(false);
  #toast = inject(NgToastService);
  #spinner = inject(NgxSpinnerService);
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { imagePreview: ImagePreview; fileName: string; file: File },
    private readonly imageService: ImageService
  ) {
    console.log(data);
    this.imagePreview = data.imagePreview;
    this.fileName = data.fileName;
    this.file = data.file;
  }

  downloadImage() {
    this.#spinner.show();
    this.imageService.download(this.fileName).subscribe({
      next: (res: HttpResponse<Blob>) => {
        this.triggerDownload(res.body, this.fileName);
      },
      error: (err) => {
        console.log(err);
        this.#toast.error({
          detail: 'ERROR',
          summary: err?.error?.error || 'failed to download!',
          sticky: true,
          position: 'topRight',
        });
      },
      complete: () => {
        this.#spinner.hide();
      },
    });
  }

  reset() {
    this.#spinner.show();
    this.imageService.delete(this.fileName).subscribe({
      next: (res: unknown) => {
        this.isDownloadVisible.set(false);
      },
      error: (err) => {
        console.log(err, 'Failed to delete!');
        this.#toast.error({
          detail: 'ERROR',
          summary: err?.error?.error || 'failed to delete!',
          sticky: true,
          position: 'topRight',
        });
      },
      complete: () => {
        this.#spinner.hide();
      },

    });
  }

  uploadImage(format: string) {
    this.#spinner.show();
    const formData = new FormData();
    formData.append('image', this.file);
    formData.append('format', format);
    this.imageService.upload(formData).subscribe({
      next: (res) => {
        this.isDownloadVisible.set(true);
        this.#toast.success({
          detail: 'SUCCESS',
          summary: 'Image is ready for download',
          sticky: true,
          position: 'topRight',
        });
      },
      error: (err) => {
        console.log('Failed to upload image!', err);
        this.#toast.error({
          detail: 'ERROR',
          summary: err?.error?.error || 'failed to Upload image!',
          sticky: true,
          position: 'topRight',
        });
      },
      complete: () => {
        this.#spinner.hide();
      },
    });
  }

  private triggerDownload(data: Blob | null, filename: string): void {
    if (data) {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      this.reset();
    }
  }
}
