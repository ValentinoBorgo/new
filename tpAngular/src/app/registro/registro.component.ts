import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  username: string = '';
  password: string = '';
  email: string ='';
  mensaje: string = '';
  mensajeTipo: string = ''

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.username, this.password, this.email).subscribe(response => {
      if (response.status === 'success') {
        this. mensaje = response.mensaje;
        this.mensajeTipo = 'success';
      } else if (response.status === 'error') {
        console.log(response);
        this. mensaje = response.mensaje;
        this.mensajeTipo = 'error';
      }
    },
    error => {
      this.mensaje = 'El nombre de usuario ya existe';
      this.mensajeTipo = 'error';
      console.error(error);
    }
    );
  }
}

