import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';
import { ApiService } from '../../../../../services/api.service'
import { environment } from '../../../../../../environments/environment';
import { ToastService } from '../../../../../services/toast.service';
import { CommonService } from '../../../../../services/common.service';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-core-details',
  templateUrl: './core-details.component.html',
  styleUrl: './core-details.component.scss'
})
export class CoreDetailsComponent {
  @Input() treeData: any;
  moduleArray: string[] = ["tree","tray","then","this","tiger","lion","leopard","dog","cat","elephant","monkey","donkey","mouse"]
  filteredItemsLM: any[] = [];
  filteredItemsLSM: string[] = [];
  attributesArray: any[] = [];
  attributesListArray: any[] = [];
  moduleNameArr: any[] = [];
  createForm!: FormGroup;
  moduleName: string="";
  moduleId!: number;
  selectedAttribute: string = "";
  searchData: string = "";
  subModuleName : string = "";
  repAttVal : string = "";
  moduleNamesStr: string ="";
  selectedRadio:string = 'Self';
  attributeNames : string[] = ['John', 'Alice', 'Bob', 'Emma',"tree","tray","then","this","tiger","lion","leopard"];
  @Output() updateTreeDataEvent = new EventEmitter();

  showLoader: boolean = false;
  constructor(private commonService: CommonService,private formBuilder: FormBuilder,private generalService: GeneralService, private apiService: ApiService,public toastService: ToastService) { }

  ngOnInit() {
    // this.toastService.showSuccess('Attribute created successfully');
    this.createForm = this.formBuilder.group({
      attr_bus_requirement: ['', Validators.required], 
      attribute_title_en: ['Container Material Code',Validators.required],
      attribute_title_fr: ['Container Material Code',Validators.required],
      attribute_description_en: ['',Validators.required],
      attribute_description_fr: [''],
      attribute_other_info: ['',Validators.required],
      code_list_name: ['',Validators.required],
      code_value: ['',Validators.required],
      min_value: ['',Validators.required],
      max_value: ['',Validators.required],
      data_type: ['',Validators.required],
      // link_module:['',Validators.required],
      // link_sub_module:['',Validators.required],
      // attribute_repeatability: ['Self',Validators.required],
      is_dependent_attribute: ['',Validators.required],
      // dependent_attributes: ['Attribute Name',Validators.required],
    });

    this.generalService.getFormData().subscribe(formData => {
      if(formData === "SAVE"){
        this.saveApi();
      }else{
        this.createForm.reset();
        this.attributesListArray = []
      }
      // Add your save logic here
    });
  }

  saveApi(): void{
    let dependent_attributesArr = this.attributesListArray.map(obj => obj.attribute_id);
    const attrData = {
      "attr_bus_requirement": this.createForm.value.attr_bus_requirement,
      "attribute_title_en": this.createForm.value.attribute_title_en,
      "attribute_title_fr": this.createForm.value.attribute_title_fr,
      "attribute_description_en": this.createForm.value.attribute_description_en,
      "attribute_description_fr": this.createForm.value.attribute_description_fr,
      "attribute_other_info": this.createForm.value.attribute_other_info,
      "module_id": this.moduleId,
      "submodule_id": 1,
      "attribute_metadata_id": "sample_metadata_id",
      "request_accepted_user": 123,
      "repeating_attribute": this.repAttVal === 'true' ? true : false,
      "min_value": this.createForm.value.min_value,
      "max_value": this.createForm.value.max_value,
      "data_type": this.createForm.value.data_type,
      "attribute_repeatability": this.selectedRadio,
      "is_dependent_attribute": false,
      "dependent_attributes": dependent_attributesArr,
      "attribute_status": "active",
      "request_form_id": 456,
      "code_list_id": 1,
      "code_value_id": 4,
      "is_latest_version": true,
      // "attribute_version_number": "v1.0"
    }
    this.showLoader = true;
    this.apiService.post(`${environment.apiUrl}/attributes`, attrData).subscribe(data =>{
      this.toastService.showSuccess('Attribute created successfully');
      this.treeData?.children[0]?.children[0]?.children.push(attrData);
      this.updateTreeDataEvent.emit(this.treeData);
      let bkup = {... this.treeData};
      this.treeData = {};
      this.treeData = bkup;
      this.showLoader = false;
    }, (err: any) => {
      this.toastService.showError(err?.error?.error || err?.error?.message);
      this.showLoader = false;
    });
  }

  onKeyUp(event: any,fieldName:string) {
    let searchQuery = event.target.value
    if(fieldName === 'linkModule'){
      this.moduleSearchApi(searchQuery)
      // this.filteredItemsLM = this.moduleArray.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));

    }else if (fieldName === 'linkSubModule'){
      this.filteredItemsLSM = this.moduleArray.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
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
      this.moduleName = selected.module_name
      this.moduleId = selected.module_id
      this.filteredItemsLM = []
    }
    
  }

  radioChange(e:any){
    console.log("selected radio button",this.selectedRadio)
  }

  onKeyUpDepAttr(event:any){
    console.log("entered key",event.target.value)
    let searchKey = event.target.value
    this.attSearchApi(searchKey)
    if(searchKey === ""){
      this.attributesArray = []
    }
  }

  attSearchApi(attSearchKey:string){
    this.apiService.get(`${environment.apiUrl}/attributes/search?title=`+attSearchKey).subscribe((data:any)=>{
      console.log("attribute name search api response",data)
      this.attributesArray = []
      for (const obj of data) {
        // Push the value of the 'name' field into the namesArray
        this.attributesArray.push(obj);
      }
    },(err:Error)=>{
      this.attributesArray = []
      console.log("error response",err,this.attributesArray)
    })
  }

  selectAttribute(selected : any){
    // this.selectedAttribute = selected.attribute_title_en
    console.log("attributes already",this.attributesListArray,selected)
    const itemIndex = this.attributesListArray.findIndex(element => element.attribute_id === selected.attribute_id)
    // let existingObject = this.attributesListArray.find((item: any) => item.id === selected.id);
    if (itemIndex === -1) {
      this.attributesListArray.push(selected);
    }
    console.log("attributesListArray", this.attributesListArray,itemIndex)
    this.attributesArray = []
    this.selectedAttribute = ""
  }

  removeAttribute(element:any){
    let index = this.attributesListArray.findIndex(obj => obj.attribute_id === element.attribute_id);
    if (index !== -1) {
      this.attributesListArray.splice(index, 1);
    }
    console.log("attributesListArray after removal", this.attributesListArray)
  }

  moduleSearchApi(modSearchKey : string){
    this.apiService.get(`${environment.apiUrl}/modules?query=`+modSearchKey).subscribe((data:any)=>{
      console.log("module name search api response",data)
      this.filteredItemsLM = []
      for (const obj of data) {
        // Push the value of the 'name' field into the namesArray
        this.filteredItemsLM.push(obj);
      }
    },(err:Error)=>{
      this.filteredItemsLM = []
      console.log("error response",err,this.filteredItemsLM)
    })
  }

}
