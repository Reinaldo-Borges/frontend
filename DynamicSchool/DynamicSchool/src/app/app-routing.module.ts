import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionComponent } from './administrator/course/question/question.component';

const routes: Routes = [
  { path: 'question-response', component: QuestionComponent },
  { path: '**', component: QuestionComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, initialNavigation: undefined })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
