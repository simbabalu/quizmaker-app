import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizDto, TriviaCategory } from "../models";
import { DifficultyLevel } from "../types/difficulty-level.type";

@Injectable({
  providedIn: 'root',
})
export class QuizApiService{
  protected readonly serviceBaseUrl = `https://opentdb.com`;
  private amount: number = 5;

  constructor(protected readonly http: HttpClient){}

  public getCategories(): Observable<TriviaCategory>{
    const url = `${this.serviceBaseUrl}/api_category.php`
    return this.http.get<TriviaCategory>(url);
  }

  public getQuiz(categoryId: number, difficulty: DifficultyLevel): Observable<QuizDto>{
    const url = `${this.serviceBaseUrl}/api.php?amount=${this.amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`
    return this.http.get<QuizDto>(url);
  }
}
