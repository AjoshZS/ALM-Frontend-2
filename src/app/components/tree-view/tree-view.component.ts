import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, Injectable, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CommonService } from '../../services/common.service';
interface FoodNode {
  name: string;
  children?: FoodNode[];
  module_id?:any;
  sub_module_id?:any;
  attribute_id?:any;

}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrl: './tree-view.component.scss',

})
export class TreeViewComponent implements OnInit {
  @Input() treeData: any;
  expandedNodes: any[] = [];
  prevExpansionModel: any;
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      module_id: node?.module_id,
      level: level,
      attribute_id: node?.attribute_id,
      sub_module_id: node?.sub_module_id
    };
  };

  treeControl: any = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource: any = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  currentExpandedNode:any;
  searchString:any;

  constructor(private commonService: CommonService) {
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.commonService.treeUpdate.subscribe(data =>{
      if(Object?.keys(data)?.length > 0) this.updateTreeData(data);
    });
    this.commonService.setTreeData.subscribe(data =>{
      if(Object?.keys(data)?.length > 0) this.setTreeData(data)
    });
  }

  updateTreeData(data: any): void {
    this.dataSource.data = [];
    this.dataSource.data = [data];
    this.getPrevExpansionModel();
  }

  setTreeData(data:any){
    this.dataSource.data = [data];
  }

  getPrevExpansionModel() {
    this.treeControl.dataNodes.map((item:any)=>{
     if(this.prevExpansionModel?.length && this.prevExpansionModel){
      if(item?.name =='modules') this.treeControl.expand(item)
      this.prevExpansionModel.forEach((expandedNode:any)=>{
        if(expandedNode?.expandable && expandedNode?.name == item?.name && (expandedNode?.module_id == item?.module_id || expandedNode?.sub_module_id == item?.sub_module_id )) this.treeControl.expand(item)
      })
     }
    })
  }

  toggleNode(node: any) {
    if (this.treeControl.isExpanded(node)) {
      this.removenodeFromExpandedList(node);
      this.treeControl.collapse(node);
    }
    else this.expand(node);
    this.prevExpansionModel = this.treeControl.expansionModel.selected;
  }

  expand(node: any) {
    this.currentExpandedNode = node;
    this.addNodetoListofExpandedNodes(node);
    this.treeControl.expand(node);
  }

  removenodeFromExpandedList(node: any) {
    // const index = this.expandedNodes.findIndex((obj: any) => {
    //   return (obj.id === node.id || obj?.module_id == node.module_id || obj?.sub_module_id == node.sub_module_id  ) && obj.name === node.name;
    // });
    // if (index !== -1) this.expandedNodes.splice(index, 1);
  }

  addNodetoListofExpandedNodes(node:any){
    this.expandedNodes.push(node);
  }

  public hideLeafNode(node: any): boolean {
    return  new RegExp(this.searchString, 'i').test(node.name) === false;
  }

  public hideParentNode(node: any): boolean {
    return (this.treeControl
      .getDescendants(node)
      .filter((node:any) =>  node.children==null || node.children.length == 0)
      .every((node:any) => {new RegExp(this.searchString, 'i').test(node.name) === false}))
  }

 

}
