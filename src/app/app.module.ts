import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizOptionComponent, QuizContainer, ResultContainer, QuizQuestionComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuizQuestionsComponent } from './components/quiz-questions/quiz-questions.component';
import { ButtonClickDirective } from './directives';
import { QuizResultQuestionComponent } from './components/quiz-result-question';

@NgModule({
  declarations: [
    AppComponent,
    QuizOptionComponent,
    QuizContainer,
    QuizQuestionsComponent,
    QuizQuestionComponent,
    ButtonClickDirective,
    ResultContainer,
    QuizResultQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
