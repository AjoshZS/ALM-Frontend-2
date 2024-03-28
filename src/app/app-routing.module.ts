import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'attribute', canActivate: [AuthGuardService], loadChildren: () => import('./modules/attribute/attribute.module').then(m => m.AttributeModule) },
  { path: 'user', canActivate: [AuthGuardService], loadChildren: () => import('./modules/user-group/user-group.module').then(m => m.UserGroupModule)},
  { path: '', loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
