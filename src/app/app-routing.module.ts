import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostViewScreenComponent } from './components/post-view-screen/post-view-screen.component';
import { PostCreateScreenComponent } from './components/post-create-screen/post-create-screen.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'main', component: PostViewScreenComponent},
  { path: 'post', component: PostCreateScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
