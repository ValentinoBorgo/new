import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';  // Importa By para acceder a los elementos del DOM

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule  // Para que las rutas no causen errores durante las pruebas
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show login and register links when not logged in', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isLoggedIn = false;  // Simula que el usuario no ha iniciado sesión
    fixture.detectChanges();  // Refresca la vista después de actualizar la variable

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a[href="/login"]')).toBeTruthy();  // Verifica que el enlace de login esté presente
    expect(compiled.querySelector('a[href="/registro"]')).toBeTruthy();  // Verifica que el enlace de registro esté presente
    expect(compiled.querySelector('a[href="/inicio"]')).toBeTruthy();  // Verifica que el enlace de inicio esté presente
  });

  it('should show logout link when logged in', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isLoggedIn = true;  // Simula que el usuario ha iniciado sesión
    fixture.detectChanges();  // Refresca la vista después de actualizar la variable

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a')?.textContent).toContain('Cerrar sesión');  // Verifica que el enlace de "Cerrar sesión" esté presente
    expect(compiled.querySelector('a[href="/login"]')).toBeFalsy();  // Verifica que el enlace de login no esté presente
  });

});

