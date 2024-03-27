import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { RouterModule, Routes } from '@angular/router';


const userGroupRoutes: Routes = [
  { path: 'user-group', component:CreateGroupComponent  },
  { path: 'user-group-list',component: GroupListComponent }
];


@NgModule({
  declarations: [
    CreateGroupComponent,
    GroupListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userGroupRoutes),
  ]
})
export class UserGroupModule { }
