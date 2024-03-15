import { Component } from '@angular/core';
import { TreeViewComponent } from '../../../../../components/tree-view/tree-view.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-attribute-create',
  templateUrl: './attribute-create.component.html',
  styleUrl: './attribute-create.component.scss'
})
export class AttributeCreateComponent {

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
    private generalService: GeneralService) {
      
     }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      business_name: ['', Validators.required], 
      name_EN: ['Container Material Code',Validators.required],
      name_FR: ['Container Material Code',Validators.required],
      description1: ['',Validators.required],
      description2: ['',Validators.required],
      other_info: ['',Validators.required],
      repeating_Attribute: ['',Validators.required],
      code_list_name: ['',Validators.required],
      code_value: ['',Validators.required],
      min_value: ['',Validators.required],
      max_value: ['',Validators.required],
      data_type: ['string',Validators.required],
      link_module: ['',Validators.required],
      link_sub_module: ['',Validators.required],
      repeatingRadioOption: ['',Validators.required],
      search_data: ['Search Attribute',Validators.required],
      dependent: ['',Validators.required],
      dependent_attributes: ['Attribute Name',Validators.required],
    });
  }

  saveForm(){
    console.log("saveForm clicked")
    this.generalService.setFormData("SAVE");
    this.treeData.children[4].children[2].children.push({name:'alcholol'});
    let bkup = {... this.treeData};
    this.treeData = {};
    this.treeData = bkup;
  }

  removeForm(){
    this.generalService.setFormData("clear");
    console.log("removeForm clicked")
  }

}
