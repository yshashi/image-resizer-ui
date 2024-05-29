import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  #baseUrl ='https://image-resizer-1ahd.onrender.com';
  #http = inject(HttpClient);

  upload(formData: FormData) {
    return this.#http.post(`${this.#baseUrl}/upload`, formData);
  }

  download(fileName: string) {
    return this.#http.get(`${this.#baseUrl}/download/${fileName}`, { responseType: 'blob', observe: 'response' });
  }

  delete(fileName: string) {
    return this.#http.delete(`${this.#baseUrl}/delete/${fileName}`);
  }
}
