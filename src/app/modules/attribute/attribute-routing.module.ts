import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components for attribute routing
import { AttributeCreateComponent } from './components/new_attribute/attribute-create/attribute-create.component';

const routes: Routes = [
    {path:'',component:AttributeCreateComponent}
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributeRoutingModule { }