import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/app/shared/models/course/course.model';
import { Question } from 'src/app/shared/models/course/question.model';
import { ResponseQuestion } from 'src/app/shared/models/course/response-quesntion.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  url: string = `https://localhost:5001/api/Course/CD27BAA7-1938-4909-81D6-BC3C001EBAB4`
  constructor(private http : HttpClient) { }

  public getCourse(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url.toString());
  }

  public getQuestion(lessonId: string): Observable<Question[]>{
    return this.http.get<Question[]>(`https://localhost:5001/api/Course/question/${lessonId}`);
  }

  public create(question: Question): Observable<Question>{
    return this.http.post<Question>('https://localhost:5001/api/Course/question/new', question);
  }

  public getResponse(questionId: string): Observable<ResponseQuestion[]>{
    return this.http.get<ResponseQuestion[]>(`https://localhost:5001/api/Course/response/${questionId}`);
  }

  public Edit(question: Question): Observable<Question>{
    return this.http.patch<Question>('https://localhost:5001/api/Course/question/modify', question);
  }
}
