import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Course } from 'src/app/shared/models/course/course.model';
import { Lesson } from 'src/app/shared/models/course/lesson.model';
import { Level } from 'src/app/shared/models/course/level.model';
import { Question } from 'src/app/shared/models/course/question.model';
import { QuestionService } from './question.service';
import { ResponseComponent } from '../response/response.component';
import { ResponseQuestion } from 'src/app/shared/models/course/response-quesntion.model';
import { FormControl, FormGroup, RequiredValidator, Validators, NgForm   } from '@angular/forms';
import { EditQuestionComponent } from './edit-question/edit-question.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.styl'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class QuestionComponent implements OnInit {

  courses: Course[] = [];
  levels: Level[] = [];
  lessons: Lesson[] = [];
  lessonId: string = '';
  questions: Question[] = [];
  responses: ResponseQuestion[] = [];
  expandedElement = new Question();
  dataSource = new MatTableDataSource<Question>();
  dataSourceDetails = new MatTableDataSource<ResponseQuestion>();
  flagEdit: boolean = false;
  flagText: string = 'Edit Question';
  questionIdSelecionado: string = '';
  editTemplate: string = '';

  constructor(private questionService: QuestionService,
              public dialog: MatDialog,
              public dialogResponseRef: MatDialogRef<ResponseComponent, any>,
              public dialogEditResponseRef: MatDialogRef<ResponseComponent, any>,
              public dialogEditRef: MatDialogRef<EditQuestionComponent, any>) { }

  displayedColumns: string[] = ['description', 'creationDate', 'typeQuestion'];
  detailDisplayedColumns: string[] = ['description', 'reason', 'isTrue', 'creationDate',' '];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand',' '];
  @ViewChild(MatPaginator) paginator!: MatPaginator;  
  @ViewChild(MatPaginator) paginatorDetails!: MatPaginator;  


  ngAfterViewInit() {
   
  }

  ngOnInit(): void {     
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSourceDetails.paginator = this.paginatorDetails;
    })
    this.getCourse()
  }

  form = new FormGroup({
    course: new FormControl('', [Validators.required]),
    level: new FormControl('', [Validators.required]),
    lesson: new FormControl('', [Validators.required]),
    question: new FormControl('', [Validators.required, Validators.minLength(10)]),
    typeQuestion: new FormControl('', [Validators.required]),  
  });


  getCourse(): void{
    this.questionService.getCourse()
      .subscribe(dados => {       
        this.courses =  dados;     
        this.levels = dados[0].levels;        
      })
  }

  selectLevel(levelId: string): void{
    let level = this.levels.find(f=> f.name === levelId)
    this.lessons = level != undefined ? level.lessons : []
  }

  selectLesson(lessonId: string): void{
    this.lessonId = lessonId;

    this.getQuestion(lessonId);   
  }

  getQuestion(lessonId: string): void{
    this.questionService.getQuestion(lessonId)
    .subscribe(dados => {
      this.questions = dados.length > 0 ? dados : []
      this.dataSource.data = this.questions
    }
    ,(erro)=> this.questions = [])
  }

  selectType(typeQuestion: string): void{
  }

  createQuestion(): void{

    let question = new Question();
    question.description = this.form.get('question')?.value;
    question.typeQuestion = this.form.get('typeQuestion')?.value;
    question.lessonId = this.lessonId

    this.questionService.create(question)
    .subscribe(sucess=>{
      this.getQuestion(sucess.lessonId); 
    },
    ()=> console.log('Unable to create question'))
  }

  clickedRow(row: Question){ 
    this.getResponse(row.id)
    this.questionIdSelecionado = row.id    
  }

  openResponseDialog(row: Question): void {    
     this.dialogResponseRef = this.dialog.open(ResponseComponent, { 
      width: '45%',
      data: {questionId: row.id, typeQuestion: row.typeQuestion, parentComponent: this},
      disableClose: true,
    });  
    
    this.dialogResponseRef.afterClosed().subscribe(result => {
      this.getResponse(row.id)
    });
  }

  closeResponseDialog(): void {
    this.dialogResponseRef.close();  
  }

  closeEditDialog(newDescription: string): void {  
    this.refreshDescriptionInTable(newDescription);

    this.dialogEditRef.close();
  }

  openDialogEdit(row: Question): void {    
    this.questionIdSelecionado = row.id

    this.dialogEditRef = this.dialog.open(EditQuestionComponent, { 
     width: '45%',
     data: {questionId: row.id, description: row.description, parentComponent: this},
     disableClose: true,
   });  
   
   this.dialogEditRef.afterClosed().subscribe(result => {});
 }

  getResponse(questionId: string): void{
    this.dataSourceDetails.paginator = this.paginatorDetails;
    
    this.questionService.getResponse(questionId)
          .subscribe(dados => {
            this.responses = dados;
            this.dataSourceDetails.data = this.responses
          },
          ()=> {
            this.responses = []
            this.dataSourceDetails.data = []
          }
          )
  }

  refreshDescriptionInTable(newDescription: string){
    if(newDescription.length > 0){
      let index = this.questions.findIndex(f => f.id === this.questionIdSelecionado)
      this.questions[index].description = newDescription;
    }
  }

  openEditResponseDialog(response: ResponseQuestion): void{

    this.dialogEditResponseRef = this.dialog.open(ResponseComponent, { 
      width: '45%',
      data: {responseId: response.id, reason: response.reason, isTrue: response.isTrue, description: response.description, parentComponent: this},
      disableClose: true,
    });  
    
    this.dialogEditResponseRef.afterClosed().subscribe(result => {
      this.closeEditResponseDialog()
      this.getResponse(response.questionId)
    });

  }

  closeEditResponseDialog(): void{
    this.dialogEditResponseRef.close()
  }
  

}
