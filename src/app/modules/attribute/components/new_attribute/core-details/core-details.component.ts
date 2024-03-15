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

  createForm!: FormGroup;

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

  // onSubmit() {
  //   console.log("form data",this.createForm.value)
  //   this.generalService.setFormData(this.createForm.value);
  // }

}
