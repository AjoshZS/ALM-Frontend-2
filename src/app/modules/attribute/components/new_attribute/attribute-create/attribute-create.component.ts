import { Component, ElementRef, ViewChild } from '@angular/core';
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
    children: []
  };
  tree_view_enabled : boolean = false
  isChecked : boolean = false
  createForm!: FormGroup;
  isSidebarOpen = true;
  @ViewChild('treecontainer') treecontainer:ElementRef | any;
  constructor(private formBuilder: FormBuilder,
    private generalService: GeneralService, private commonService: CommonService,private apiService:ApiService) {}

  ngOnInit() {
    this.fetchAttributesList();
  }

  ngAfterViewInit(){
    this.treecontainer.nativeElement.classList.add('w-25');
  }

  openSidebar() {
    this.isSidebarOpen = true;
    this.treecontainer.nativeElement.classList.remove('w-0');
    this.treecontainer.nativeElement.classList.remove('ng-hide');
    this.treecontainer.nativeElement.classList.add('ng-hide-remove');
  }

  closeSidebar(){
    this.isSidebarOpen = false;
    this.treecontainer.nativeElement.classList.remove('w-25');
    this.treecontainer.nativeElement.classList.add('w-0');
    this.treecontainer.nativeElement.classList.remove('ng-hide-remove');
    this.treecontainer.nativeElement.classList.add('ng-hide');
  }

  saveForm(){
    this.generalService.setFormData("SAVE");
  }

  removeForm(){
    this.generalService.setFormData("clear");
  }
  
  fetchAttributesList(){
    this.apiService.get(environment?.apiUrl + '/modules/tree').subscribe((data:any)=>{
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
          if(submodule.attributes && submodule.attributes?.length>0 || ( submodule.children && submodule.children?.length>0)){
           if(submodule.attributes ) this.renameWithNewKeyName(submodule,'attributes','children');
            submodule.children.map((item:any)=>{
             if(item?.attribute_title_en) this.renameWithNewKeyName(item,'attribute_title_en','name');
            })
          }
        })
      }
     });
     this.treeData = data;
     this.commonService.setTreeData.next(this.treeData);
  }

  updateTreeData(data:any){
    data.children.map((node:any)=>{
      if(node?.module_name){
        this.renameWithNewKeyName(node,'module_name','name');
      }
      if(node?.sub_modules) this.renameWithNewKeyName(node,'sub_modules','children');
      if(node?.children && node?.children?.length>0){
        node?.children.map((submodule:any)=>{
          if(submodule.attributes && submodule.attributes?.length>0 || ( submodule.children && submodule.children?.length>0)){
           if(submodule.attributes ) this.renameWithNewKeyName(submodule,'attributes','children');
            submodule.children.map((item:any)=>{
             if(item?.attribute_title_en) this.renameWithNewKeyName(item,'attribute_title_en','name');
            })
          }
        })
      }
     });
     this.treeData = data;
     this.commonService.treeUpdate.next(this.treeData);
  }

}
