import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showDropdown: boolean = false;


  constructor(private router: Router,public dialog: MatDialog){}

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
      localStorage.clear();
      this.router.navigate(['']);
    });
  }


  

  
}
