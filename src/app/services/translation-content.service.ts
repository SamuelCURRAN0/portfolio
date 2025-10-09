import { DOCUMENT, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, map, Observable, of, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Lang } from '../models/lang,enum';

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

  getJsonUrl(): string {
    return 'assets/content-' + this.currentJsonUrl + '.json';
  }

  private currentJsonUrl: Lang = Lang.EN;
  constructor(private http: HttpClient, private route: ActivatedRoute, @Inject(DOCUMENT) private document: Document) {
    this.loadContent();
    const browserLang = navigator.language || (navigator as any).userLanguage;
    if (browserLang.startsWith('fr')) {
      this.currentJsonUrl = Lang.FR;
      this.loadContent();
    }
    this.route.queryParams.subscribe((params) => {
      if (params['lang'] !== undefined) {
        this.setLanguage(params['lang']);
      }
    });
  }

  setLanguage(lang: string): void {
    if (lang === 'fr') {
      this.currentJsonUrl = Lang.FR;
    }
    else{
      this.currentJsonUrl = Lang.EN;
    }
    this.loadContent();
  }


  private loadContent(): void {
    this.http.get<TranslationContent>(this.getJsonUrl())
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
