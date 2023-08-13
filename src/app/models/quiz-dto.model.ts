import { QuizQuestionDto } from "./quiz-question-dto.model";

export interface QuizDto{
  response_code: number;
  results: QuizQuestionDto[];
}
