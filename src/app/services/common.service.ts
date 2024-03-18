import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  treeUpdate: BehaviorSubject<any> = new BehaviorSubject<any>({});
  setTreeData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor() { }
}
