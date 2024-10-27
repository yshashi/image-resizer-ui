import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  // host: {
  //   class: 'w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors',
  //   '[class.drag-active]': 'isDragging',
  //   '(dragover)': 'onDragOver($event)',
  //   '(dragleave)': 'onDragLeave($event)',
  //   '(drop)': 'onDrop($event)',
  //   '(click)': 'fileInput.click()',
  // },
  template: `
    <div
      class="w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors"
      [class.drag-active]="isDragging()"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
      (click)="fileInput.click()"
    >
      <input
        #fileInput
        type="file"
        class="hidden"
        accept="image/*"
        (change)="onFileSelected($event)"
      />
      <div class="space-y-4">
        <div class="text-4xl text-gray-400">
          📸
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
          Drop your image here
        </h3>
        <p class="text-gray-500 dark:text-gray-400">
          or click to select a file
        </p>
      </div>
    </div>
  `
})
export class ImageUploaderComponent {
  imageSelected = output<File>();
  isDragging = signal(false);

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
    const files = event.dataTransfer?.files;
    if (files?.length) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File) {
    if (file.type.startsWith('image/')) {
      this.imageSelected.emit(file);
    }
  }
}
