import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { QuizQuestion } from '../../models';
import { QuizBusinessService } from '../../services';

@Component({
  selector: 'app-quiz-result-question',
  template: `
    <p class="question mt-3" [innerHTML]="businessService.decodeString(question.question)"></p>
    <div class="d-flex flex-row justify-content-center gap-1">
      <div *ngFor="let answer of question.mixedAnswers">
        <button *ngIf="answer === question.selectedAnswer && answer === question.correctAnswer"
          class="btn btn-default answerBtn correctAnswer"
          [innerHTML]="businessService.decodeString(answer)">
        </button>
        <ng-container *ngIf="answer !== question.selectedAnswer && answer === question.correctAnswer">
          <button
            class="btn btn-default answerBtn correctAnswer"
            [innerHTML]="businessService.decodeString(answer)">
          </button>
        </ng-container>
        <ng-container *ngIf="answer === question.selectedAnswer && answer != question.correctAnswer; else unselectedAnswer">
          <button
            class="btn btn-default answerBtn wrongAnswer"
            [innerHTML]="businessService.decodeString(answer)">
          </button>
        </ng-container>
       <ng-template #unselectedAnswer>
          <button
            class="btn btn-default answerBtn"
            [innerHTML]="businessService.decodeString(answer)">
          </button>
        </ng-template>
      </div>
    </div>
  `,
  styles: [
    `
    .wrongAnswer{
      background-color: red;
    }
    .correctAnswer{
      background-color: green;
    }
    .answerBtn{
      border: 1px solid #999;

    }
    .question{
      text-align: center;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizResultQuestionComponent {
  @Input() public question: QuizQuestion;

  constructor(public readonly businessService: QuizBusinessService) {}
}
