import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private formDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private id: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private treeDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() { }

  setFormData(data: any): void {
    this.formDataSubject.next(data);
  }

  // Method to get form data as an observable
  getFormData(): Observable<any> {
    return this.formDataSubject.asObservable();
  }

  setcurrentNodeId(data: any): void {
    this.id.next(data);
  }

  getcurrentNodeId(): Observable<any> {
    return this.id.asObservable();
  }

  updateTreeData(data: any): void {
    this.treeDataSubject.next(data);
  }

  getTreeData(): Observable<any> {
    return this.treeDataSubject.asObservable();
  }

}
