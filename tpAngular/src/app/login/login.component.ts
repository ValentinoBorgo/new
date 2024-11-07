import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';  // Importa Router para redirigir

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  mensaje = '';
  mensajeTipo = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(response => {
      this.mensaje = response.mensaje;
      if (response.status === 'success') {
        sessionStorage.setItem('username', this.username);
        this.mensajeTipo = 'success';
        this.router.navigate(['/inicio']); 
      } else if (response.status === 'error') {
        this.mensajeTipo = 'error';
      }
    }, error => {
      this.mensaje = 'Error en la conexión. Inténtalo de nuevo.';
      this.mensajeTipo = 'error';
      console.error(error);
    });
  }
}


