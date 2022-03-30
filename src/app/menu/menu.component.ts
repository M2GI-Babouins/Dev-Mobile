import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  
  @Input() title: string = "Blindtest 2000";
  public menuIsShown = false

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  logout(){
    console.log("prout");
    this.authService.logout();
  }

  showMenu(){
    this.menuIsShown = !this.menuIsShown;
  }

  resetPassword(){
    console.log('reset password');
    this.authService
  }
}
