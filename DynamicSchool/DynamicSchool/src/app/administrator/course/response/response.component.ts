import { Component, Inject, Input, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponseQuestion } from 'src/app/shared/models/course/response-quesntion.model';
import { ResponseService } from './response.service';
import { QuestionComponent } from '../question/question.component';

export interface DialogData {
  questionId: string;
  typeQuestion: string;
  description: string;
  responseId: string;
  reason: string;
  isTrue: boolean;
  parentComponent: QuestionComponent; 
}




@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.styl']
})
export class ResponseComponent implements OnInit {

  questionId: string = ''
  typeQuestion: string = ''
  responseId: string = ''
  reason: string = ''
  isTrue: boolean = false
  description: string = ''
  parentComponent: QuestionComponent;
  tipeAction: string = 'Create'

  constructor(private responseService: ResponseService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.questionId = data.questionId;
      this.typeQuestion = data.typeQuestion;
      this.parentComponent = data.parentComponent;
      this.description = data.description;
      this.responseId = data.responseId;
      this.reason = data.reason;
      this.isTrue = data.isTrue;
    }

  ngOnInit(): void {    
    this.load()
  }

  form = new FormGroup({
    response: new FormControl(''),
    reason: new FormControl(''),
    isTrue: new FormControl(''),
  });


  save(): void{
    let response = this.builder()

    if(this.responseId === undefined)
      this.create(response)
    else
      this.edit(response)
  }

  create(response: ResponseQuestion): void{

    this.responseService.create(response).subscribe(dados => {
      this.parentComponent.closeResponseDialog()
    },
    ()=> console.log('Deu ruim'));    

  }

  edit(response: ResponseQuestion): void{
    
    this.responseService.edit(response).subscribe(dados => {
      this.parentComponent.closeEditResponseDialog()
    },
    ()=> console.log('Deu ruim'));  

  }

  builder(): ResponseQuestion {
    var response = new ResponseQuestion();    
    response.description = this.form.get('response')?.value;
    response.reason = this.form.get('reason')?.value;
    response.isTrue = this.form.get('isTrue')?.value === '' ? false : this.form.get('isTrue')?.value;      

    if(this.questionId != undefined)
      response.questionId = this.questionId;  

    if(this.responseId != undefined)
      response.id = this.responseId

    return response;
  }


  close(): void{    

    if(this.responseId != undefined)
      this.parentComponent.closeEditResponseDialog()      
    else
      this.parentComponent.closeResponseDialog()
      
  }

  load(): void{
    this.tipeAction = this.responseId != undefined ? 'Edit' : 'Create' 
    this.form.get('response')?.setValue(this.description);
    this.form.get('reason')?.setValue(this.reason);
    this.form.get('isTrue')?.setValue(this.isTrue);   
  }

}
