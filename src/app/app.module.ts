import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { LabelInputComponent } from './components/atoms/label-input/label-input.component';
import { FormComponent } from './components/molecules/form/form.component';
import { AddCategoryComponent } from './modules/category/pages/add-category/add-category.component';
import { MessageComponent } from './components/atoms/message/message.component';
import { LabelSelectComponent } from './components/atoms/label-select/label-select.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LabelInputComponent,
    FormComponent,
    AddCategoryComponent,
    MessageComponent,
    LabelSelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
