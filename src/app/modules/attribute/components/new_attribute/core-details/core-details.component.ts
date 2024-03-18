import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';
import { ApiService } from '../../../../../services/api.service'
import { environment } from '../../../../../../environments/environment';
import { ToastService } from '../../../../../services/toast.service';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-core-details',
  templateUrl: './core-details.component.html',
  styleUrl: './core-details.component.scss'
})
export class CoreDetailsComponent {

  moduleArray: string[] = ["tree","tray","then","this","tiger","lion","leopard","dog","cat","elephant","monkey","donkey","mouse"]
  filteredItemsLM: string[] = [];
  filteredItemsLSM: string[] = [];
  createForm!: FormGroup;
  moduleName: string="";
  subModuleName : string = "";
  attributeNames : string[] = ['John', 'Alice', 'Bob', 'Emma',"tree","tray","then","this","tiger","lion","leopard"]

  showLoader: boolean = false;
  constructor(private formBuilder: FormBuilder,private generalService: GeneralService, private apiService: ApiService,public toastService: ToastService) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      attr_bus_requirement: ['', Validators.required], 
      attribute_title_en: ['Container Material Code',Validators.required],
      attribute_title_fr: ['Container Material Code',Validators.required],
      attribute_description_en: ['',Validators.required],
      attribute_description_fr: [''],
      attribute_other_info: ['',Validators.required],
      repeating_attribute: ['Yes',Validators.required],
      code_list_name: ['',Validators.required],
      code_value: ['',Validators.required],
      min_value: ['',Validators.required],
      max_value: ['',Validators.required],
      data_type: ['',Validators.required],
      // link_module:['',Validators.required],
      // link_sub_module:['',Validators.required],
      attribute_repeatability: ['Self',Validators.required],
      search_data: ['Search Attribute',Validators.required],
      is_dependent_attribute: ['',Validators.required],
      dependent_attributes: ['Attribute Name',Validators.required],
    });

    this.generalService.getFormData().subscribe(formData => {
      console.log("form data recieved",formData)
      if(formData === "SAVE"){
        this.saveApi();
      }else{
        this.createForm.reset();
        console.log("form cleared",this.createForm.value);
      }
      // Add your save logic here
    });
  }

  saveApi(): void{
    console.log(this.createForm.value)
    const attrData = {
      "attr_bus_requirement": this.createForm.value.attr_bus_requirement,
      "attribute_title_en": this.createForm.value.attribute_title_en,
      "attribute_title_fr": this.createForm.value.attribute_title_fr,
      "attribute_description_en": this.createForm.value.attribute_description_en,
      "attribute_description_fr": this.createForm.value.attribute_description_fr,
      "attribute_other_info": this.createForm.value.attribute_other_info,
      "module_id": 1,
      "submodule_id": 1,
      "attribute_metadata_id": "sample_metadata_id",
      "request_accepted_user": 123,
      "repeating_attribute": this.createForm.value.repeating_attribute,
      "min_value": this.createForm.value.min_value,
      "max_value": this.createForm.value.max_value,
      "data_type": this.createForm.value.data_type,
      "attribute_repeatability": this.createForm.value.attribute_repeatability,
      "is_dependent_attribute": false,
      "attribute_status": "active",
      "request_form_id": 456,
      "code_list_id": 789,
      "code_value_id": 101,
      "is_latest_version": true,
      "attribute_version_number": "v1.0"
    }
    console.log("attribute_data",attrData)
    this.showLoader = true;
    this.apiService.post(`${environment.apiUrl}/attributes`, attrData).subscribe(data =>{
      console.log("error response",data)
      this.toastService.showSuccess()
      this.showLoader = false
    }, err => {
      this.toastService.showError()
      this.showLoader = false
    });
  }

  onKeyUp(event: any,fieldName:string) {
    console.log('Input value:', event.target.value);
    let searchQuery = event.target.value
    if(fieldName === 'linkModule'){
      this.filteredItemsLM = this.moduleArray.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
      console.log("filteredItems",this.filteredItemsLM)
    }else if (fieldName === 'linkSubModule'){
      this.filteredItemsLSM = this.moduleArray.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
      console.log("filteredItems",this.filteredItemsLSM)
    }
    
    if(searchQuery === ""){
      this.filteredItemsLM = []
      this.filteredItemsLSM = []
    }
  }

  selectModule(selected : any,fieldName : string){
    if(fieldName === 'linkSubModule'){
      this.subModuleName = selected
      this.filteredItemsLSM = []
    }else if(fieldName === 'linkModule'){
      this.moduleName = selected
      this.filteredItemsLM = []
    }
    
  }

}
