import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private formDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() { }

  setFormData(data: any): void {
    this.formDataSubject.next(data);
  }

  // Method to get form data as an observable
  getFormData(): Observable<any> {
    return this.formDataSubject.asObservable();
  }

}
