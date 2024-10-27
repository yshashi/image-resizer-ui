import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

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

    return this.#http.post(url, body, {
      headers: new HttpHeaders({
        'Accept': 'application/json, image/jpeg',
        'Content-Type': 'application/json'
      }),
      responseType: 'blob',
      withCredentials: true
    });
  }

  delete(fileName: string) {
    return this.#http.delete(`${this.#baseUrl}/delete/${fileName}`);
  }
}
