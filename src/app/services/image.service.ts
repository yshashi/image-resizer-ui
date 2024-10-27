import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  #baseUrl = 'https://resizer-api.letsprogram.in'; //'http://localhost:8100' https://resizer-api.letsprogram.in
  #http = inject(HttpClient);

  upload(formData: FormData) {
    return this.#http.post(`${this.#baseUrl}/upload`, formData);
  }

  downloadImage(filename: string, format: string): Observable<Blob> {
    const url = `${this.#baseUrl}/download`;
    const body = { filename, format };

    const headers = new HttpHeaders({
      'Accept': 'application/json, image/jpeg',
      'Content-Type': 'application/json'
    });

    return this.#http.post(url, body, {
      headers,
      responseType: 'blob',
      withCredentials: true,
      observe: 'response'
    }).pipe(
      map(response => response.body as Blob)
    );
  }

  // Helper method to handle the download
  handleImageDownload(response: Blob, filename: string): void {
    const url = window.URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resized_${filename}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  delete(fileName: string) {
    return this.#http.delete(`${this.#baseUrl}/delete/${fileName}`);
  }
}
