import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';
import { ApiService } from '../../../../../services/api.service'
import { environment } from '../../../../../../environments/environment';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-core-details',
  templateUrl: './core-details.component.html',
  styleUrl: './core-details.component.scss'
})
export class CoreDetailsComponent {

  createForm!: FormGroup;
  showLoader: boolean = false;
  constructor(private formBuilder: FormBuilder,private generalService: GeneralService, private apiService: ApiService) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      attr_bus_requirement: ['', Validators.required], 
      attribute_title_en: ['Container Material Code',Validators.required],
      attribute_title_fr: ['Container Material Code',Validators.required],
      attribute_description_en: ['',Validators.required],
      attribute_description_fr: [''],
      attribute_other_info: ['',Validators.required],
      repeating_attribute: ['',Validators.required],
      code_list_name: ['',Validators.required],
      code_value: ['',Validators.required],
      min_value: ['',Validators.required],
      max_value: ['',Validators.required],
      data_type: ['',Validators.required],
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
    // this.showLoader = true;
    // this.apiService.post(`${environment.apiUrl}/attributes`, {}).subscribe(data =>{
    //   this.showLoader = false
    // }, err => this.showLoader = false);
  }

  // onSubmit() {
  //   console.log("form data",this.createForm.value)
  //   this.generalService.setFormData(this.createForm.value);
  // }

}
