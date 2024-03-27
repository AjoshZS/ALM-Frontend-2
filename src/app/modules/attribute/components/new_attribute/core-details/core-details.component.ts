import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
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
  attributeDataJson: any;
  moduleArray: string[] = ["tree", "tray", "then", "this", "tiger", "lion", "leopard", "dog", "cat", "elephant", "monkey", "donkey", "mouse"]
  filteredItemsLM: any[] = [];
  filteredItemsLSM: any[] = [];
  attributesArray: any[] = [];
  attributesListArray: any[] = [];
  moduleNameArr: any[] = [];
  codeListArray: any[] = [];
  codeValuesArray: any[] = [];
  rep_att_array: string[] = ["Yes", "No"]
  is_dependant_array: string[] = ["Yes", "No"]
  datatypeArray: string[] = ["Number", "String"]
  createForm!: FormGroup;
  moduleName: string = "";
  moduleId!: number;
  subModuleID!: number;
  selectedAttribute: string = "";
  searchData: string = "";
  subModuleName: string = "";
  subModuleNameTouched: boolean = false;
  subModulfieldClicked: boolean = false;
  moduleNameTouched: boolean = false;
  modulfieldClicked: boolean = false;
  rep_att_fieldClicked: boolean = false;
  rep_att_invalid: boolean = false;
  rep_att_select_bool: boolean = false;
  codelist_select_bool: boolean = false;
  codevalue_select_bool: boolean = false;
  datatype_select_bool: boolean = false;
  is_dependant_select_bool: boolean = false;
  repAttVal: string = "No";
  moduleNamesStr: string = "";
  selectedRadio: string = 'Self';
  attributeNames: string[] = ['John', 'Alice', 'Bob', 'Emma', "tree", "tray", "then", "this", "tiger", "lion", "leopard"];
  @Output() updateTreeDataEvent = new EventEmitter();

  showLoader: boolean = false;
  constructor(private commonService: CommonService, private formBuilder: FormBuilder, private generalService: GeneralService, private apiService: ApiService, public toastService: ToastService) { }


  fillAttributeForm(attData: any) {
    let codeListName = ""
    let codeValueName = ""
    this.codeListArray = []
    this.codeValuesArray = []
    this.selectedRadio = attData.attribute_repeatability
    this.repAttVal = (attData.repeating_attribute) === true ? 'Yes' : 'No'
    this.moduleName = attData.module.module_name
    this.moduleId = attData.module.module_id
    this.subModuleID = attData.subModule.sub_module_id
    this.subModuleName = attData.subModule.sub_module_name
    let attributes_ListArray = attData.dependent_attributes
    this.attributesListArray = []
    for (let i in attributes_ListArray) {
      let newObject = {
        "attribute_id": attributes_ListArray[i].dependent_attribute_id,
        "attribute_title_en": attributes_ListArray[i].attribute_title_en
      }
      this.attributesListArray.push(newObject)
    }
    if (attData.codeList) {
      this.codeListArray.push(attData.codeList)
      codeListName = attData.codeList.code_list_name
      console.log("codelistname", codeListName)
    }
    if (attData.codeList) {
      this.codeValuesArray.push(attData.codeValue)
      this.createForm.get('code_value')?.enable();
      codeValueName = attData.codeValue.code_value_name
    }
    this.createForm.setValue({
      attr_bus_requirement: attData.attr_bus_requirement,
      attribute_title_en: attData.attribute_title_en,
      attribute_title_fr: attData.attribute_title_fr,
      attribute_description_en: attData.attribute_description_en,
      attribute_description_fr: attData.attribute_description_fr,
      attribute_other_info: attData.attribute_other_info,
      code_list_name: codeListName,
      code_value: codeValueName,
      min_value: attData.min_value,
      max_value: attData.max_value,
      data_type: attData.data_type,
      is_dependent_attribute: attData.is_dependent_attribute,
    })
    this.createForm.get('code_list_name')?.setValue(codeListName);
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      attr_bus_requirement: ['', Validators.required],
      attribute_title_en: ['', Validators.required],
      attribute_title_fr: ['', Validators.required],
      attribute_description_en: ['', Validators.required],
      attribute_description_fr: ['', Validators.required],
      attribute_other_info: ['', Validators.required],
      code_list_name: ['', Validators.required],
      code_value: ['', Validators.required],
      min_value: ['', Validators.required],
      max_value: ['', Validators.required],
      data_type: ['Number', Validators.required],
      // link_module:['',Validators.required],
      // link_sub_module:['',Validators.required],
      // attribute_repeatability: ['Self',Validators.required],
      is_dependent_attribute: ['No', Validators.required],
      // dependent_attributes: ['Attribute Name',Validators.required],
    });

    this.createForm.get('code_value')?.disable();

    this.codeListSearchApi()

    this.generalService.getFormData().subscribe(formData => {
      if (formData === "SAVE") {
        if (this.createForm.value.attr_bus_requirement == "" || this.createForm.value.attribute_title_en == "" || this.createForm.value.attribute_title_fr == "" || this.createForm.value.attribute_description_en == "" || this.createForm.value.attribute_other_info == "" || this.moduleName == "" || this.subModuleName == "" || this.repAttVal == "" || this.createForm.value.data_type == "" || this.selectedRadio == "") {
          this.toastService.showError('Cannot save! Required fields empty')
        } else {
          this.saveApi();
        }

      } else if (formData === "clear") {
        this.createForm.reset();
        this.attributesListArray = []
        this.filteredItemsLSM = []
        this.filteredItemsLM = []
        this.moduleName = ""
        this.subModuleName = ""
        this.moduleNameTouched = false
        this.subModuleNameTouched = false
        this.modulfieldClicked = false
        this.subModulfieldClicked = false
        this.createForm.get('data_type')?.setValue('Number')
        this.createForm.get('is_dependent_attribute')?.setValue('No')
      }
      // Add your save logic here
    });
    // /api/attributes/:id

    this.generalService.getcurrentNodeId().subscribe(nodeId => {
      let attributeId: string = nodeId.toString()
      console.log("currentnodeID", attributeId)
      if (typeof attributeId === 'string' && attributeId !== '[object Object]') {
        this.apiService.get(`${environment.apiUrl}/attributes?id=` + attributeId).subscribe((data: any) => {
          console.log("attributes search api response", data)
          this.attributeDataJson = data
          this.fillAttributeForm(this.attributeDataJson)
        }, (err: Error) => {
          console.log("error response", err)
        })
      }
    });

  }

  saveApi(): void {
    console.log("dep_att", this.attributesListArray)
    let dependent_attributesArr = this.attributesListArray.map(obj => obj.attribute_id);
    console.log("dep_att_after", dependent_attributesArr)
    const attrData = {
      "attr_bus_requirement": this.createForm.value.attr_bus_requirement,
      "attribute_title_en": this.createForm.value.attribute_title_en,
      "attribute_title_fr": this.createForm.value.attribute_title_fr,
      "attribute_description_en": this.createForm.value.attribute_description_en,
      "attribute_description_fr": this.createForm.value.attribute_description_fr,
      "attribute_other_info": this.createForm.value.attribute_other_info,
      "module_id": this.moduleId,
      "submodule_id": this.subModuleID,
      "attribute_metadata_id": "sample_metadata_id",
      "request_accepted_user": 123,
      "repeating_attribute": this.repAttVal === 'true' ? true : false,
      "min_value": this.createForm.value.min_value,
      "max_value": this.createForm.value.max_value,
      "data_type": this.createForm.value.data_type,
      "attribute_repeatability": this.selectedRadio,
      "is_dependent_attribute": this.createForm.value.is_dependent_attribute === 'Yes' ? true : false,
      "dependent_attributes": dependent_attributesArr,
      "attribute_status": "active",
      "request_form_id": 456,
      "code_list_id": 1,
      "code_value_id": 4,
      "is_latest_version": true,
      // "attribute_version_number": "v1.0"
    }
    this.showLoader = true;
    this.apiService.post(`${environment.apiUrl}/attributes`, attrData).subscribe(data => {
      this.toastService.showSuccess('Attribute created successfully');
      console.log("attributes api response",data)
      for (let i in this.treeData?.children){
        if(this.treeData?.children[i].name == this.moduleName){
          for (let j in this.treeData?.children[i].children){
            if(this.treeData?.children[i].children[j].name == this.subModuleName){
              this.treeData?.children[i].children[j].children.push(data)
            }
          }
        }
      }
      // this.treeData?.children
      // this.treeData?.children[0]?.children[0]?.children.push(attrData);
      this.updateTreeDataEvent.emit(this.treeData);
      let bkup = { ... this.treeData };
      this.treeData = {};
      this.treeData = bkup;
      this.showLoader = false;
      this.createForm.reset();
      this.attributesListArray = []
      this.filteredItemsLSM = []
      this.filteredItemsLM = []
      this.moduleName = ""
      this.subModuleName = ""
      this.moduleNameTouched = false
      this.subModuleNameTouched = false
      this.modulfieldClicked = false
      this.subModulfieldClicked = false
      this.createForm.get('data_type')?.setValue('Number')
      this.createForm.get('is_dependent_attribute')?.setValue('No')
    }, (err: any) => {
      this.toastService.showError(err?.error?.error || err?.error?.message);
      this.showLoader = false;
    });
  }

  onKeyUp(event: any, fieldName: string) {
    let searchQuery = event.target.value
    if (fieldName === 'linkModule') {
      this.moduleSearchApi(searchQuery)
      // this.filteredItemsLM = this.moduleArray.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));

    } else if (fieldName === 'linkSubModule') {
      this.subModuleNameTouched = false
      this.subModuleSearchApi(searchQuery)
      // this.filteredItemsLSM = this.moduleArray.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    } else if (fieldName === 'codeList') {
      // this.codeListSearchApi(searchQuery)
    }

    if (searchQuery === "") {
      this.filteredItemsLM = []
      this.filteredItemsLSM = []
    }
  }

  selectModule(selected: any, fieldName: string) {
    console.log("selected value", selected, fieldName)
    if (fieldName === 'linkSubModule') {
      this.subModuleName = selected.sub_module_name
      this.subModuleID = selected.sub_module_id
      this.filteredItemsLSM = []
    } else if (fieldName === 'linkModule') {
      this.moduleName = selected.module_name
      this.moduleId = selected.module_id
      this.filteredItemsLM = []
    } else if (fieldName === 'rep_att') {
      this.repAttVal = selected
      this.rep_att_select_bool = false
    } else if (fieldName === 'code_list_name') {
      this.createForm.get('code_list_name')?.setValue(selected.code_list_name);
      this.codelist_select_bool = false
      this.codeValuesApi(selected)
    } else if (fieldName === 'code_value_name') {
      this.createForm.get('code_value')?.setValue(selected.code_value_name);
      this.codevalue_select_bool = false
    } else if (fieldName === 'data_type') {
      this.createForm.get('data_type')?.setValue(selected);
      this.datatype_select_bool = false
    } else if (fieldName === 'is_dependent_attribute') {
      this.createForm.get('is_dependent_attribute')?.setValue(selected);
      this.is_dependant_select_bool = false
    }

  }

  radioChange(e: any) {
    console.log("selected radio button", this.selectedRadio)
  }

  onKeyUpDepAttr(event: any) {
    console.log("entered key", event.target.value)
    let searchKey = event.target.value
    this.attSearchApi(searchKey)
    if (searchKey === "") {
      this.attributesArray = []
    }
  }

  attSearchApi(attSearchKey: string) {
    this.apiService.get(`${environment.apiUrl}/attributes/search?title=` + attSearchKey).subscribe((data: any) => {
      console.log("attribute name search api response", data)
      this.attributesArray = []
      for (const obj of data) {
        // Push the value of the 'name' field into the namesArray
        this.attributesArray.push(obj);
      }
    }, (err: Error) => {
      this.attributesArray = []
      console.log("error response", err, this.attributesArray)
    })
  }

  selectAttribute(selected: any) {
    // this.selectedAttribute = selected.attribute_title_en
    console.log("attributes already", this.attributesListArray, selected)
    const itemIndex = this.attributesListArray.findIndex(element => element.attribute_id === selected.attribute_id)
    // let existingObject = this.attributesListArray.find((item: any) => item.id === selected.id);
    if (itemIndex === -1) {
      let newObject = {
        "attribute_id": selected.attribute_id,
        "attribute_title_en": selected.attribute_title_en
      }
      this.attributesListArray.push(newObject);
    }
    console.log("attributesListArray", this.attributesListArray, itemIndex)
    this.attributesArray = []
    this.selectedAttribute = ""
  }

  removeAttribute(element: any) {
    let index = this.attributesListArray.findIndex(obj => obj.attribute_id === element.attribute_id);
    if (index !== -1) {
      this.attributesListArray.splice(index, 1);
    }
    console.log("attributesListArray after removal", this.attributesListArray)
  }

  moduleSearchApi(modSearchKey: string) {
    this.apiService.get(`${environment.apiUrl}/modules?query=` + modSearchKey).subscribe((data: any) => {
      console.log("module name search api response", data)
      this.filteredItemsLM = []
      for (const obj of data) {
        // Push the value of the 'name' field into the namesArray
        this.filteredItemsLM.push(obj);
      }
    }, (err: Error) => {
      this.filteredItemsLM = []
      console.log("error response", err, this.filteredItemsLM)
    })
  }

  subModuleSearchApi(searchKey: string) {
    if (this.moduleId != null || this.moduleId != undefined) {
      let moduleIdString: string = this.moduleId.toString();
      this.apiService.get(`${environment.apiUrl}/submodules?query=` + searchKey + `&moduleId=` + moduleIdString).subscribe((data: any) => {
        console.log("sub module name search api response", data)
        this.filteredItemsLSM = []
        for (const obj of data) {
          // Push the value of the 'name' field into the namesArray
          this.filteredItemsLSM.push(obj);
        }
      }, (err: Error) => {
        this.filteredItemsLSM = []
        console.log("error response", err)
      })
    } else {
      console.log("select a module", this.moduleId)
    }

  }

  codeListSearchApi() {
    console.log("this.codeListSearchApi")
    this.apiService.get(`${environment.apiUrl}/codelists`).subscribe((data: any) => {
      console.log("sub module name search api response", data)
      this.codeListArray = data.codeLists
    }, (err: Error) => {
      console.log("error response", err)
    })
  }

  codeValuesApi(codelist: any) {
    this.createForm.get('code_value')?.enable();
    let selectedIndex = codelist.code_list_id
    console.log("codeValuesApi", selectedIndex)
    this.apiService.get(`${environment.apiUrl}/codevalues?codeListId=` + selectedIndex.toString()).subscribe((data: any) => {
      console.log("sub module name search api response", data)
      this.codeValuesArray = data.codeValues
    }, (err: Error) => {
      console.log("error response", err)
    })

  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    console.log("click event fired")
    if (event.target.id != 'moduleDropDown' && event.target.name != 'moduleInputBox') {
      this.filteredItemsLM = []
    }

    if (event.target.id != 'subModuleDropDown' && event.target.name != 'subModuleInputBox') {
      this.filteredItemsLSM = []
    }

    if (event.target.name != 'moduleInputBox' && this.modulfieldClicked) {
      this.moduleNameTouched = true
    }

    if (event.target.name != 'subModuleInputBox' && this.subModulfieldClicked) {
      this.subModuleNameTouched = true
    }

    if (event.target.id != 'repeating_attribute' && this.rep_att_select_bool) {
      this.rep_att_select_bool = false
    }

    if (event.target.id != 'code_list_name' && this.codelist_select_bool) {
      this.codelist_select_bool = false
    }

    if (event.target.id != 'code_value' && this.codevalue_select_bool) {
      this.codevalue_select_bool = false
    }

    if (event.target.id != 'data_type' && this.datatype_select_bool) {
      this.datatype_select_bool = false
    }

    if (event.target.id != 'is_dependent_attribute' && this.is_dependant_select_bool) {
      this.datatype_select_bool = false
    }
  }

  moduleInputClicked() {
    this.modulfieldClicked = true
  }
  subModuleInputClicked() {
    this.subModulfieldClicked = true
  }

  selectBoxClicked(event: any, field: string) {
    console.log("selectBoxClicked")
    if (field === "repeating_attribute") {
      this.rep_att_select_bool = true
    } else if (field === "code_list_name") {
      this.codelist_select_bool = true
    } else if (field === 'code_value') {
      this.codevalue_select_bool = true
    } else if (field === 'data_type') {
      this.datatype_select_bool = true
    } else if (field === 'is_dependent_attribute') {
      this.is_dependant_select_bool = true
    }

  }


}
