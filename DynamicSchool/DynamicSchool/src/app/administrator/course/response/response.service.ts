import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseQuestion } from 'src/app/shared/models/course/response-quesntion.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private http : HttpClient) { }

  create(response: ResponseQuestion): Observable<ResponseQuestion>{
    return this.http.post<ResponseQuestion>('https://localhost:5001/api/Course/response/new', response);
   
  }

  edit(response: ResponseQuestion): Observable<ResponseQuestion>{
    return this.http.patch<ResponseQuestion>('https://localhost:5001/api/Course/response/modify', response);
   
  }
}
