import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showDropdown: boolean = false;
  showLoader: boolean = false;
  constructor(private router: Router,public dialog: MatDialog, private apiService: ApiService){}

  toggleDropdown() {
      this.showDropdown = !this.showDropdown;
  }


  @HostListener('document:click', ['$event'])
    clickout(event: any) {
        if (!event.target.closest('.avatar')) {
            this.showDropdown = false;
        }
    }
  logout(){
    const dialogRef= this.dialog.open(ConfirmationComponent,{
      width: '300px',
      data: {
        message: 'Are you sure want to Logout?'
      }
    });
    dialogRef.componentInstance.confirmed.subscribe(() => {
      this.logoutApi('', ((cbValue: any) =>{
        localStorage.clear();
        this.router.navigate(['']);
      }));
    });
  }
  
  logoutApi(val: string, cb: any): void{
    const payload = {
      refreshToken: localStorage.getItem('refreshToken'),
      token: localStorage.getItem('accessToken')
    };
    if(payload.refreshToken && payload.token){
      this.showLoader = true;
      this.apiService.post(environment?.authApiUrl+ '/log-out', payload).subscribe((data: any) => {
        if(data?.token) localStorage.setItem('accessToken', data?.token);
        if(data?.refreshToken) localStorage.setItem('refreshToken', data?.refreshToken);
        this.showLoader = false;
        cb(true);
      }, (err: any) =>{
        this.showLoader = false;
        cb(true);
      });
    } else cb(true);
  }
}
