import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { GroupListComponent } from './components/group-list/group-list.component';



@NgModule({
  declarations: [
    CreateGroupComponent,
    GroupListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserGroupModule { }
