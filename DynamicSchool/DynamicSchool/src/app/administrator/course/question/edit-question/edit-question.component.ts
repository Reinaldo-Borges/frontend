import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from 'src/app/shared/models/course/question.model';
import { DialogData } from '../../response/response.component';
import { QuestionComponent } from '../question.component';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.styl']
})
export class EditQuestionComponent implements OnInit {

  questionId: string = ''
  description: string = ''
  parentComponent: QuestionComponent;
  result: string = ''
  
  constructor(private questionService: QuestionService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    this.questionId = data.questionId;
    this.description = data.description;
    this.parentComponent = data.parentComponent;
    

    this.form.get('question')?.setValue(this.description)
    console.log(this.questionId)
  }

  ngOnInit(): void {
  }

  form = new FormGroup({
    question: new FormControl('')   
  });

  create(): void{
    var question = new Question();    
    question.description = this.form.get('question')?.value;
    question.id = this.questionId;
    question.typeQuestion = '0'

    this.result = question.description;

    this.questionService.Edit(question).subscribe(dados => {
      this.parentComponent.closeEditDialog(this.result )
    },
    ()=> console.log('Deu ruim'));    
  }

  close(): void{
    this.parentComponent.closeEditDialog('')
  }

}
