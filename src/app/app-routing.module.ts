import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttributeCreateComponent } from './modules/attribute/components/new_attribute/attribute-create/attribute-create.component';

const routes: Routes = [
  { path: 'new', loadChildren: () => import('./modules/attribute/attribute-routing.module').then(m => m.AttributeRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
