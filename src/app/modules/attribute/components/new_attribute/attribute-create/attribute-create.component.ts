import { Component } from '@angular/core';
import { TreeViewComponent } from '../../../../../components/tree-view/tree-view.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../../../services/common.service';
import { environment } from '../../../../../../environments/environment';
import { ApiService } from '../../../../../services/api.service';


@Component({
  selector: 'app-attribute-create',
  templateUrl: './attribute-create.component.html',
  styleUrl: './attribute-create.component.scss',
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
    private generalService: GeneralService, private commonService: CommonService,private apiService:ApiService) {
      
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
    this.fetchAttributesList();
  }

  saveForm(){
    this.generalService.setFormData("SAVE");
  }

  removeForm(){
    this.generalService.setFormData("clear");
  }
  
  fetchAttributesList(){
    this.apiService.get(environment?.apiUrl + '/modules').subscribe((data:any)=>{
      console.log(data);
      let newData = {name:'modules',children:[]};
      if(data?.modules) newData.children = data?.modules;
      this.setTreeData(newData)
    })    
  }

  renameWithNewKeyName(o:any,oldKey:any,newKey:any){
    delete Object.assign(o, {[newKey]: o[oldKey] })[oldKey];
  }

  setTreeData(data:any){
    data.children.map((node:any)=>{
      if(node?.module_name){
        this.renameWithNewKeyName(node,'module_name','name');
      }
      if(node?.sub_modules) this.renameWithNewKeyName(node,'sub_modules','children');
      if(node?.children && node?.children?.length>0){

        node?.children.map((submodule:any)=>{
          if(submodule.attributes && submodule.attributes?.length>0){
            this.renameWithNewKeyName(submodule,'attributes','children');
            console.log(submodule);
            submodule.children.map((item:any)=>{
              this.renameWithNewKeyName(item,'attribute_title_en','name');
            })
          }
        })
      }
     });
     this.treeData = data;
     this.commonService.setTreeData.next(this.treeData);
    console.log(this.treeData)

  }

}
