import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/tpSucursales';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Inicia como false

  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable para que otros componentes se suscriban

  constructor(private http: HttpClient) {
    // Verifica si el usuario está autenticado cuando el servicio se inicializa
    if (this.isAuthenticated()) {
      this.isLoggedInSubject.next(true); // Si ya está autenticado, actualiza el estado
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login.php`, { username, password }).pipe(
      tap(response => {
        if (response.status === 'success') {
          if (typeof window !== 'undefined') {  // Verificar si estamos en el navegador
            sessionStorage.setItem('username', username);
          }
          this.isLoggedInSubject.next(true); // Actualiza el estado de inicio de sesión
        }
      })
    );
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register.php`, { username, password, email });
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout.php`, {}).pipe(
      tap(() => {
        if (typeof window !== 'undefined') {  // Verificar si estamos en el navegador
          sessionStorage.removeItem('username');
        }
        this.isLoggedInSubject.next(false); // Actualiza el estado de cierre de sesión
      })
    );
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {  // Verificar si estamos en el navegador
      return !!sessionStorage.getItem('username');
    }
    return false; // Si no estamos en el navegador, retornamos false
  }

}


