import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeCreateComponent } from './components/new_attribute/attribute-create/attribute-create.component';
import { MatIconModule } from '@angular/material/icon';
import { CoreDetailsComponent } from './components/new_attribute/core-details/core-details.component';
import { ApplicabilityComponent } from './components/new_attribute/applicability/applicability.component';
import { ChangeHistoryComponent } from './components/new_attribute/change-history/change-history.component';
import { FieldRulesComponent } from './components/new_attribute/field-rules/field-rules.component';
import { TreeViewComponent } from '../../components/tree-view/tree-view.component';
import { SharedModule } from '../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AttributeRoutingModule } from './attribute-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';


@NgModule({
  declarations: [
    AttributeCreateComponent,
    CoreDetailsComponent,
    ApplicabilityComponent,
    ChangeHistoryComponent,
    FieldRulesComponent,
    LeftSidebarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AttributeRoutingModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatTabsModule,
    AttributeRoutingModule
  ]
})
export class AttributeModule { }
