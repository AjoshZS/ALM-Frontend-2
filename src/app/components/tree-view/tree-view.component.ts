import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, Injectable, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
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
export class TreeViewComponent implements OnInit, OnChanges {
  @Input() treeData: any;
  expandedNodes: any[] = [];
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
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

  constructor() {
    // this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void{
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes['treeData']){
      this.dataSource.data = [this.treeData];
      // setTimeout(()=>{
      //   console.log(this.treeControl)
      //   console.log(this.dataSource)
      //   this.dataSource.data[0].children.push({name:'Animal Feeding Module2'});
      // }, 2000)
    }
  }

}
