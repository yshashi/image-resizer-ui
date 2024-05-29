import { Component, input, output } from '@angular/core';
import { IMAGE_SIZES, ImageSizeDetails } from '../../../image-size.constant';
import { NgClass, NgStyle } from '@angular/common';
import { AspectRatioPipe } from '../../pipes/aspect-ratio.pipe';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [NgStyle, NgClass, AspectRatioPipe],
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.scss',
})
export class ImagePreviewComponent {
  imageSrc = input.required();
  imageDetail = input.required<ImageSizeDetails>();
  handleDownload = output();

  getAspectRatio() {
    return {
      aspectRatio: `${this.imageDetail().width} / ${this.imageDetail().height}`,
    };
  }

  onDownload() {
    this.handleDownload.emit();
  }
}
