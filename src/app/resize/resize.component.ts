import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ImagePreviewComponent } from '../shared/components/image-preview/image-preview.component';
import { NgToastService } from 'ng-angular-popup';
import { HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageService } from '../services/image.service';
import { IMAGE_SIZES } from '../image-size.constant';
import { switchMap } from 'rxjs';
import { fbFormats, instaFormats, ytFormats } from '../shared/utils/format.utils';

@Component({
  selector: 'app-resize',
  standalone: true,
  imports: [ImagePreviewComponent],
  templateUrl: './resize.component.html',
  styleUrl: './resize.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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

  downloadImage(fileName: string) {
    this.#spinner.show();
    this.#imageService.download(fileName).subscribe({
      next: (res: HttpResponse<Blob>) => {
        this.triggerDownload(res.body, fileName);
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

  uploadImage(format: string) {
    this.#spinner.show();
    const formData = new FormData();
    formData.append('image', this.file() as File);
    formData.append('format', format);
    this.#imageService.upload(formData)
    .pipe(
      switchMap((res)=> this.#imageService.download(this.fileName()))
    ).subscribe({
      next: (res: HttpResponse<Blob>) => {
        this.triggerDownload(res.body, `${format}-${this.fileName()}`);
      },
      error: (err) => {
        console.log(err);
        this.#toast.danger(err?.error?.error || 'failed to upload!', 'ERROR');
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
    const files = (event.target as HTMLInputElement).files;
    this.file.set(files ? files[0] : null);
    if (!this.file()) {
      return;
    }
    this.fileName.set(this.file()?.name as string);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.set(reader.result);
    };
    reader.readAsDataURL(this.file() as Blob);
  }
}


export type ImagePreview = string | ArrayBuffer | null;
