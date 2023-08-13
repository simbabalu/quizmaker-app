import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { QuizQuestion } from "src/app/models";
import { LocalStorageService } from "src/app/services/local-storage.service";

@Component({
  selector: 'app-result-container',
  template: `
    <h1 id="results-heading">Results</h1>
    <ng-container *ngIf="quizResult && quizResult.length > 0">
      <ng-container *ngFor="let question of quizResult">
        <app-quiz-result-question [question]="question"></app-quiz-result-question>
      </ng-container>
    </ng-container>
    <div class="mt-3" id="quiz-score" [ngClass]="setBackgroundColor(score)">
      {{ scoreText }}
    </div>
  `,
  styles: [`
    #results-heading{
      text-align: center;
    }
    #quiz-score{
      width: 50%;
      margin-left: 25%;
      text-align: center;
    }
    .low-result{
      background-color: red;
    }
    .medium-result{
      background-color:yellow;
    }
    .success-result{
      background-color: green;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultContainer implements OnInit{
  public quizResult: QuizQuestion[];
  public scoreText: string;
  public score: number;
  constructor(private readonly localStorageService: LocalStorageService,){}

  public ngOnInit(): void {
      this.quizResult = this.localStorageService.getItem('result');
      this.scoreText = this.getScoreText();
  }

  public getScoreText(): string{
    const score = this.calculateScore();
    let scoreText = `You scored ${this.score} out of 5`;
    return scoreText;
  }

  private calculateScore(): void{
    this.score = 0;
    this.quizResult.forEach(question => {
      if(question.selectedAnswer === question.correctAnswer){
        this.score++;
      }
    });
  }

  public setBackgroundColor(score: number): string{
    if (score <= 1) {
      return 'low-result';
    } else if (score === 2 || score === 3) {
      return 'medium-result';
    } else {
      return 'success-result';
    }
  }
}
