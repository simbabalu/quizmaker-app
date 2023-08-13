import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { QuizQuestion } from '../../models';
import { QuizQuestionDto } from '../../models';
import { QuizBusinessService } from '../../services';

@Component({
  selector: 'app-quiz-questions',
  template: `
    <ng-container *ngFor="let question of quizQuestions">
      <app-quiz-question [question]="question" (answerBtnActivated)="onClickAnswer($event)"></app-quiz-question>
    </ng-container>
    <div *ngIf="submitVisible">
      <button type="submit" id="submitBtn" class="btn btn-primary mt-2" (click)="submitClicked()">submit</button>
    </div>
  `,
  styles: [
    `
    #submitBtn{
      width: 50%;
      margin-left: 25%;
    }
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
export class QuizQuestionsComponent implements OnInit {
  @Input() public questionDtos: QuizQuestionDto[];
  @Output() public readonly submitActivated = new EventEmitter<
    QuizQuestion[]
  >();
  public quizQuestions: QuizQuestion[] = [];
  public submitVisible: boolean = false;

  constructor(private readonly businessService: QuizBusinessService) {}

  public ngOnInit(): void {
    this.initQuiz();
  }

  public onClickAnswer(question: QuizQuestion): void {
    const unAnsweredQuestion = this.quizQuestions.find(
      (q) => q.selectedAnswer == null
    );
    if (!unAnsweredQuestion) {
      this.submitVisible = true;
    }
  }

  public submitClicked(): void {
    this.submitActivated.emit(this.quizQuestions);
  }

  public initQuiz(): void {
    this.questionDtos.forEach((question) => {
      const answers: string[] = question.incorrect_answers;
      answers.push(question.correct_answer);
      const quizQuestion: QuizQuestion = {
        question: question.question,
        correctAnswer: question.correct_answer,
        incorrectAnswers: question.incorrect_answers,
        mixedAnswers: [],
        selectedAnswer: null,
      };
      quizQuestion.mixedAnswers = this.businessService.mixArray(answers);
      this.quizQuestions.push(quizQuestion);
    });
  }
}
