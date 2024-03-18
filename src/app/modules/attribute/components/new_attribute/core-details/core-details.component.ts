import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';
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

  constructor(private formBuilder: FormBuilder,private generalService: GeneralService) { }

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
      data_type: ['',Validators.required],
      link_module: ['',Validators.required],
      link_sub_module: ['',Validators.required],
      repeatingRadioOption: ['',Validators.required],
      search_data: ['Search Attribute',Validators.required],
      dependent: ['',Validators.required],
      dependent_attributes: ['Attribute Name',Validators.required],
    });

    this.generalService.getFormData().subscribe(formData => {
      console.log("form data recieved",formData)
      if(formData === "SAVE"){
        console.log(this.createForm.value);
      }else{
        this.createForm.reset();
        console.log("form cleared",this.createForm.value);
      }
      
      // Add your save logic here
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
