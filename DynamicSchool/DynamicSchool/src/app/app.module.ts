import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './administrator/course/question/question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule} from './material.module';
import { ResponseComponent } from './administrator/course/response/response.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditQuestionComponent } from './administrator/course/question/edit-question/edit-question.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    ResponseComponent,
    EditQuestionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [  
    { provide: MatDialogRef, useValue: {} },
	  { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
