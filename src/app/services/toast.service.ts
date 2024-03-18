import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor( public toastr : ToastrService) { }

  showSuccess() {
    this.toastr.success('Success!', 'Attribute Created', {
      timeOut: 3000,
    });
  }
  showError() {
    this.toastr.error('Failed!', 'Error creating attribute', {
      timeOut: 3000,
    });
  }
  showWarning() {
    this.toastr.warning('Warning', 'Major Error', {
      timeOut: 3000,
    });
  }
}
