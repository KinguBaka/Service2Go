import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ResultComponent } from './components/result/result.component';
import { ServiceComponent } from './components/service/service.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    SearchComponent,
    HomePageComponent,
    ResultComponent,
    ServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
