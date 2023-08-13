import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { QuizQuestion } from '../../models';
import { QuizBusinessService } from '../../services';

@Component({
  selector: 'app-quiz-question',
  template: `
    <p class="question mt-3" [innerHTML]="businessService.decodeString(question.question)"></p>
    <div class="d-flex flex-row justify-content-center gap-1">
      <div *ngFor="let answer of question.mixedAnswers">
        <button
          class="btn btn-primary"
          quizButtonClick
          (click)="clickAnswerActivated(answer, question)"
          [innerHTML]="businessService.decodeString(answer)">
        </button>
      </div>
    </div>
  `,
  styles: [
    `
    .question{
      text-align: center;
    }
    .clicked-button {
      background-color: green; /* Change this to the desired color */
      color: white;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizQuestionComponent {
  @Input() public question: QuizQuestion;
  @Output() public readonly answerBtnActivated =
    new EventEmitter<QuizQuestion>();

  constructor(public readonly businessService: QuizBusinessService) {}

  public clickAnswerActivated(answer: string, question: QuizQuestion): void {
    question.selectedAnswer = answer;
    this.answerBtnActivated.emit(question);
  }
}
