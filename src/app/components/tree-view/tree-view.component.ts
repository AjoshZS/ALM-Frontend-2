import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, Injectable, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CommonService } from '../../services/common.service';
interface FoodNode {
  name: string;
  children?: FoodNode[];
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
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
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
    this.expandedNodes = [];
    this.treeControl.dataNodes.forEach((node: any) => {
      if (node.expandable && this.treeControl.isExpanded(node)) {
        this.expandedNodes.push(node);
      }
    });
    // console.log(this.expandedNodes)
    // console.log(this.treeControl.dataNodes)
    this.dataSource.data = [];
    this.dataSource.data = [data];
    
    // setTimeout(()=>{
    // this.expandedNodes.forEach(node => {
    //     this.treeControl.expand(node);
    //   });
    // }, 1000)
    this.treeControl.expandAll();
  }

  setTreeData(data:any){
    this.dataSource.data = [data];
    this.treeControl.expandAll();
  }

}
