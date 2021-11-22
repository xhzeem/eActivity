import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestingComponent } from './components/testing/testing.component';
import { MatCardModule } from '@angular/material/card';
import { RegisterComponent } from './components/register/register.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { LoginComponent } from './components/login/login.component';
import { Test2Component } from './components/test2/test2.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestingComponent,
    RegisterComponent,
    AboutusComponent,
    LoginComponent,
    Test2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
