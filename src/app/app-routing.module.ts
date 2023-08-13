import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizContainer, ResultContainer } from './components';

const routes: Routes = [
  {
    path:'quiz',
    component:QuizContainer
  },
  {
    path:'result',
    component:ResultContainer
  },
  {
    path: '',
    redirectTo: '/quiz',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
