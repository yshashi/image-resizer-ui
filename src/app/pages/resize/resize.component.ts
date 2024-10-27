import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ImagePreviewComponent } from '../../shared/components/image-preview/image-preview.component';
import { NgToastService } from 'ng-angular-popup';
import { HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageService } from '../../services/image.service';
import { IMAGE_SIZES } from '../../image-size.constant';
import { finalize, switchMap } from 'rxjs';
import {
  fbFormats,
  instaFormats,
  ytFormats,
} from '../../shared/utils/format.utils';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
@Component({
  selector: 'app-resize',
  standalone: true,
  imports: [ImageUploaderComponent, ImagePreviewComponent],
  templateUrl: './resize.component.html',
  styleUrl: './resize.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResizeComponent {
  imagePreview = signal<ImagePreview>(null);
  fileName = signal<string>('');
  file = signal<File | null>(null);
  ytFormats = signal(ytFormats);
  fbFormats = signal(fbFormats);
  instaFormats = signal(instaFormats);
  IMAGE_SIZES = signal(IMAGE_SIZES);

  #imageService = inject(ImageService);
  #toast = inject(NgToastService);
  #spinner = inject(NgxSpinnerService);

  downloadImage(format: string) {
    this.#spinner.show();
    this.#imageService.downloadImage(this.fileName(), format).subscribe({
      next: (res) => {
        this.triggerDownload(res, this.fileName());
      },
      error: (err) => {
        console.log(err);
        this.#toast.danger(err?.error?.error || 'failed to download!', 'ERROR');
        this.#spinner.hide();
      },
      complete: () => {
        this.#spinner.hide();
      },
    });
  }

  reset() {
    this.#spinner.show();
    this.#imageService.delete(this.fileName()).subscribe({
      next: (res: unknown) => {},
      error: (err) => {
        console.log(err, 'Failed to delete!');
        this.#toast.danger(err?.error?.error || 'failed to delete!', 'ERROR');
        this.#spinner.hide();
      },
      complete: () => {
        this.#spinner.hide();
      },
    });
  }

  uploadImage() {
    this.#spinner.show();

    const formData = this.createFormData();
    this.#imageService.upload(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.#spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.#toast.danger(err?.error?.error || 'failed to upload!', 'ERROR');
        this.#spinner.hide();
      },
    });
  }

  private createFormData(): FormData {
    const formData = new FormData();
    formData.append('image', this.file() as File);
    return formData;
  }

  private handleDownloadSuccess(data: Blob | null, format: string) {
    if (data) {
      this.triggerDownload(data, `${format}-${this.fileName()}`);
    }
  }

  private triggerDownload(data: any | null, filename: string): void {
    if (data) {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      //this.reset();
    }
  }

  onFileSelected(file: File) {
    this.file.set(file);
    this.fileName.set(this.file()?.name as string);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.set(reader.result);
    };
    reader.readAsDataURL(this.file() as Blob);

    this.uploadImage();
  }
}

export type ImagePreview = string | ArrayBuffer | null;
