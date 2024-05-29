import { Component, inject, signal } from '@angular/core';
import { ImagePreviewComponent } from '../shared/components/image-preview/image-preview.component';
import { NgToastService } from 'ng-angular-popup';
import { HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageService } from '../services/image.service';
import { IMAGE_SIZES } from '../image-size.constant';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-resize',
  standalone: true,
  imports: [ImagePreviewComponent],
  templateUrl: './resize.component.html',
  styleUrl: './resize.component.scss',
})
export class ResizeComponent {
  imagePreview = signal<ImagePreview>(null);
  fileName!: string;
  file!: File;

  ytFormats = Object.keys(IMAGE_SIZES).filter((key) => key.includes('youtube'));
  fbFormats = Object.keys(IMAGE_SIZES).filter((key) =>
    key.includes('facebook')
  );
  instaFormats = Object.keys(IMAGE_SIZES).filter((key) =>
    key.includes('instagram')
  );
  IMAGE_SIZES = IMAGE_SIZES;

  #imageService = inject(ImageService);
  #toast = inject(NgToastService);
  #spinner = inject(NgxSpinnerService);

  downloadImage(fileName: string) {
    this.#spinner.show();
    this.#imageService.download(fileName).subscribe({
      next: (res: HttpResponse<Blob>) => {
        this.triggerDownload(res.body, fileName);
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
    this.#imageService.delete(this.fileName).subscribe({
      next: (res: unknown) => {},
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
    this.#imageService.upload(formData)
    .pipe(
      switchMap((res)=> this.#imageService.download(this.fileName))
    ).subscribe({
      next: (res: HttpResponse<Blob>) => {
        this.triggerDownload(res.body, `${format}-${this.fileName}`);
      },
      error: (err) => {
        console.log(err);
        this.#toast.error({
          detail: 'ERROR',
          summary: err?.error?.error || 'failed to upload!',
          sticky: true,
          position: 'topRight',
        });
        this.#spinner.hide();
      },
      complete: () => {
        this.#spinner.hide();
      },

    })

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

  onFileSelected(event: Event) {
    console.log(event);
    this.file = (event.target as HTMLInputElement).files?.[0] as File;
    if (!this.file) {
      return;
    }
    this.fileName = this.file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.set(reader.result);
      //this.openDialog(this.imagePreview, file);
    };
    reader.readAsDataURL(this.file);
  }
}


export type ImagePreview = string | ArrayBuffer | null;
