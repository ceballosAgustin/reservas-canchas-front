import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registroForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  )
  {
    this.registroForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(256)]],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]]
    });
  }

  onRegistro(): void {
    if(this.registroForm.valid) {
      const usuarioNuevo = this.registroForm.value;

      this.authService.registro(usuarioNuevo).subscribe({
        next: () => {
          this.toast.success("Debes iniciar sesión para continuar", "¡Registro exitoso!");
          this.router.navigate(["/login"]);
        },
        error: (err) => {
          if(err.status == 400) {
            this.toast.error(`Hubo un problema con los datos proporcionados`, "¡Ups!");
          }
        }
      });
    } else {
      this.toast.warning("Completa todos los datos, por favor", "¡Atención!");
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToInicio(): void {
    this.router.navigate(['/inicio']);
  }
}
