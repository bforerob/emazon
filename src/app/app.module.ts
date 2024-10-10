import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { LabelInputComponent } from './components/atoms/label-input/label-input.component';
import { CategoryFormComponent } from './components/molecules/category-form/category-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LabelInputComponent,
    CategoryFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
