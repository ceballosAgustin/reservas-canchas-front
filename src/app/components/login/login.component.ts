import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder)
    {
      this.loginForm = formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        clave: ['', [Validators.required, Validators.minLength(4)]]
      });
    }

  onLogin(): void {
    if(this.loginForm.valid) {
      const { email, clave } = this.loginForm.value;

      this.authService.login(email, clave).subscribe({
        next: (response) => {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('email', response.email);

          this.toast.success('Disfruta de nuestro servicio de reservas", "¡Bienvenido!');
          this.router.navigate(['/reservas']);
        }, error: (err) => {
          if(err.status == 401) {
            this.toast.error('Datos incorrectos', '¡Ups!');
          }
          else {
            this.toast.error("Hubo un error inesperado", "¡Ups!");
          }
        }
      });
    }
    else {
      this.toast.warning("Completa todos los datos, por favor", "¡Atención!");
    }
  }

  goToRegistro(): void {
    this.router.navigate(['/register']);
  }
}
