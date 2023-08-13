import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { QuizOptions, TriviaCategory } from '../../models';
import { QuizOptionFormService } from '../../services';
import { DifficultyLevel } from '../../types/difficulty-level.type';

@Component({
  selector: 'app-quiz-options',
  template: `
    <section id="quiz-options-section">
      <h1 class="h1">Quizmaker</h1>
      <hr />
      <form [formGroup]="quizOptionFormService.form">
      <div class="d-flex flex-row justify-content-center gap-2">
        <label for="difficulty">Difficulty:</label>
        <select [formControl]="quizOptionFormService.difficulty" id="difficultySelect"  [(ngModel)]="selectedValueDifficulty">
          <option value="" disabled selected>Please select an option</option>
          <option *ngFor="let level of difficultyLevels" [value]="level">{{ level }}</option>
        </select>
        <label for="category">Category:</label>
        <select [formControl]="quizOptionFormService.category" id="categorySelect"   [(ngModel)]="selectedValueCategory">
          <option value="" disabled selected>Please select an option</option>
          <option *ngFor="let category of categories?.trivia_categories" [value]="category.id">{{ category.name }}</option>
        </select>
      <button class="btn btn-primary" id="createBtn" (click)="onCreateQuiz()">Create</button>
      </div>
    </form>
    </section>
  `,
  styles: [
    `
      #quiz-options-section{
        background-color: #dfdfdf;
        padding: 12px;
      }
      .h1{
        text-align:center;
      }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [QuizOptionFormService],
})
export class QuizOptionComponent {
  @Input() public categories: TriviaCategory;
  @Output() public readonly createQuizActivated =
    new EventEmitter<QuizOptions>();
  public selectedValueCategory: string = '';
  public selectedValueDifficulty: string = '';
  public readonly difficultyLevels: DifficultyLevel[] = [
    'easy',
    'medium',
    'hard',
  ];
  constructor(public quizOptionFormService: QuizOptionFormService) {}

  public onCreateQuiz(): void {
    const categoryId = this.quizOptionFormService.category.value;
    const difficulty = this.quizOptionFormService.difficulty.value;
    const quizOptions: QuizOptions = {
      categoryId,
      difficulty,
    };
    const quiz = this.createQuizActivated.emit(quizOptions);
  }
}
