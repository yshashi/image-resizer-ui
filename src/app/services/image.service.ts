import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  #baseUrl = 'http://localhost:8100'; //'http://localhost:8100' https://resizer-api.letsprogram.in
  #http = inject(HttpClient);

  upload(formData: FormData) {
    return this.#http.post(`${this.#baseUrl}/upload`, formData);
  }

  downloadImage(filename: string, format: string): Observable<Blob> {
    const url = `${this.#baseUrl}/download/${filename}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { format };

    return this.#http.post(url, body, {
      headers,
      responseType: 'blob',
    })
  }

  delete(fileName: string) {
    return this.#http.delete(`${this.#baseUrl}/delete/${fileName}`);
  }
}
