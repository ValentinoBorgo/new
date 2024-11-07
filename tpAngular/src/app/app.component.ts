import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      console.log(isLoggedIn);
      
    });
  }

  onLogout() {
    console.log('Cerrando sesión...');
    
    this.authService.logout().subscribe(() => {
        console.log('Sesión cerrada');
        this.router.navigate(['/login']);
    });
}
}

