import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationContentService {
  private contentSubject = new BehaviorSubject<any>(null); // Use BehaviorSubject to hold the content
  content$ = this.contentSubject.asObservable(); // Expose it as an observable
  private jsonUrl = 'assets/content-fr.json';

  constructor(private http: HttpClient) {
    this.loadContent(); // Load content immediately
  }

  private loadContent(): void {
    this.http.get<any>(this.jsonUrl).subscribe(data => {
      this.contentSubject.next(data); // Update the content
    });
  }

  getContent(param: string): string | undefined {
    const content = this.contentSubject.getValue();
    return content ? content[param] : undefined; // Return undefined if content is not yet loaded
  }

  getDiplomes(): any[] | undefined {
    const content = this.contentSubject.getValue();
    return content ? content.diplomes : undefined; // Return the diplomas array
  }

  getProjets(): any[] | undefined {
    const content = this.contentSubject.getValue();
    return content ? content.projets : undefined; // Return the diplomas array
  }
}
