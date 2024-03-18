import { Component } from '@angular/core';
import { TreeViewComponent } from '../../../../../components/tree-view/tree-view.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../../../services/common.service';


@Component({
  selector: 'app-attribute-create',
  templateUrl: './attribute-create.component.html',
  styleUrl: './attribute-create.component.scss'
})
export class AttributeCreateComponent {
  fontSize: string = 'f-s-14' 
  formData: any;
  formDataSubscription!: Subscription;
  treeData: any =  {
    name: 'Modules',
    children: [
      { name: 'Alcohol Information Module' },
      { name: 'Allergen Information Module' },
      {name:'Animal Feeding Module'},
      {name:'Apparel Information Module '},
      {
        name: 'Alcohol BeverageContainer',
        children: [
          {name:'Container Material Code'},
          {name:'Process Type Code'},
          {
            name: 'Alcohol Container',
            children: [{ name: 'container Shape Code', }, { name: 'container Type Code' ,}]
          },
          
        ]
      }
    ]
  };
  tree_view_enabled : boolean = false
  isChecked : boolean = false
  createForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private generalService: GeneralService, private commonService: CommonService) {
      
     }

  ngOnInit() {
    this.commonService.setTreeData.next(this.treeData);
  }

  saveForm(){
    console.log("saveForm clicked")
    this.generalService.setFormData("SAVE");
    this.treeData.children[4].children[2].children.push({name:'alcholol'});
    let bkup = {... this.treeData};
    this.treeData = {};
    this.treeData = bkup;
    this.commonService.treeUpdate.next(this.treeData);
  }

  removeForm(){
    this.generalService.setFormData("clear");
    console.log("removeForm clicked")
  }

}
