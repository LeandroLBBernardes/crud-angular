import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { DialogModule } from '@angular/cdk/dialog';
import { PostCreateScreenComponent } from './components/post-create-screen/post-create-screen.component';
import { PostModalComponent } from './components/post-modal/post-modal.component';
import { PostViewScreenComponent } from './components/post-view-screen/post-view-screen.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    CardComponent,
    HeaderComponent,
    PostCreateScreenComponent,
    PostModalComponent,
    PostViewScreenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatGridListModule,
    DialogModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
