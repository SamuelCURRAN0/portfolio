import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, map, Observable, of, tap } from 'rxjs';

/**
 * Typage du contenu JSON pour un accès sûr aux propriétés.
 */
export interface TranslationContent {
  [key: string]: any;
  diplomes: any[];
  projets: any[];
  competences: any[];
}

@Injectable({
  providedIn: 'root'
})
export class TranslationContentService {
  private contentSubject = new BehaviorSubject<TranslationContent | null>(null);

  /**
   * Observable émettant uniquement lorsque le JSON est chargé (hors null).  
   */
  content$ = this.contentSubject.asObservable().pipe(
    filter((data): data is TranslationContent => data !== null)
  );

  private jsonUrl = 'assets/content-fr.json';

  constructor(private http: HttpClient) {
    this.loadContent();
  }

  private loadContent(): void {
    this.http.get<TranslationContent>(this.jsonUrl)
      .pipe(
        catchError(err => {
          console.error('[TranslationContentService] Error loading JSON:', err);
          return of(null);
        }),
        tap(data => {
          if (!data) {
            console.warn('[TranslationContentService] Loaded data is null or empty.');
          }
        })
      )
      .subscribe(data => this.contentSubject.next(data));
  }

  /**
   * Renvoie la valeur associée à la clé spécifiée dès que le JSON est chargé.
   */
  public getContent$(key: string): Observable<string | undefined> {
    return this.content$.pipe(
      map(data => data[key] as string | undefined)
    );
  }

  /**
   * Renvoie la liste des diplômes dès que le JSON est chargé.
   */
  public getDiplomes$(): Observable<any[]> {
    return this.content$.pipe(
      map(data => data['diplomes'] ?? [])
    );
  }

  /**
   * Renvoie la liste des projets dès que le JSON est chargé.
   */
  getProjets$(): Observable<any[]> {
    return this.content$.pipe(
      map(data => data['projets'] ?? [])
    );
  }

  /**
   * Renvoie la liste des compétences dès que le JSON est chargé.
   */
  getCompetences$(): Observable<any[]> {
    return this.content$.pipe(
      map(data => data['competences'] ?? [])
    );
  }
}
