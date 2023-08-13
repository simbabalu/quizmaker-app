import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
  QuizDto,
  QuizOptions,
  QuizQuestion,
  TriviaCategory,
} from '../../models';
import { QuizApiService } from '../../services';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-quiz-container',
  template: `
    <app-quiz-options [categories]="categories$ | async" (createQuizActivated)="onCreateQuiz($event)"></app-quiz-options>
    <ng-container *ngIf="quiz$ | async as quiz">
      <ng-container *ngIf="quiz?.results && quiz.results.length > 0">
        <app-quiz-questions [questionDtos]="quiz.results" (submitActivated)="onSubmit($event)"></app-quiz-questions>
      </ng-container>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizContainer implements OnInit, OnDestroy {
  public categories$: Observable<TriviaCategory>;
  public quiz$: Observable<QuizDto>;
  private readonly destroy$ = new Subject<void>();

  constructor(
    public readonly quizApiService: QuizApiService,
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.categories$ = this.quizApiService.getCategories();
  }

  public onCreateQuiz(quizOptions: QuizOptions): void {
    this.quiz$ = this.quizApiService.getQuiz(
      quizOptions.categoryId,
      quizOptions.difficulty
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(quizQuestions: QuizQuestion[]): void {
    this.localStorageService.setItem('result', quizQuestions);
    this.router.navigate(['/result']);
  }
}
