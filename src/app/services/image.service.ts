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

  downloadImage(filename: string, format: string) {
    const url = `${this.#baseUrl}/download/${filename}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.append('Access-Control-Allow-Origin', '*');
    const body = { format, filename };

    return this.#http.post(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'blob' as 'json',  // responseType 'blob' for file download
    });
  }

  delete(fileName: string) {
    return this.#http.delete(`${this.#baseUrl}/delete/${fileName}`);
  }
}
