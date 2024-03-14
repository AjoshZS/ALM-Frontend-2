import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';



interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Modules',
    children: [
      { name: 'Alcohol Information Module' },
      { name: 'Allergen Information Module' },
      {name:'Animal Feeding Module'},
      {name:'Apparel Information Module '},
      {
        name: 'Alcohol BeverageContainer',
        children: [
          {name:'Container Material Code'},
          {name:'Process Type Code'},
          {
            name: 'Alcohol Container',
            children: [{ name: 'container Shape Code', }, { name: 'container Type Code' ,}]
          },
          
        ]
      }
    ]
  },
];
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
export class TreeViewComponent {
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

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
