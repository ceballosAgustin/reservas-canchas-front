import { Component, OnInit } from '@angular/core';
import Cancha from '../../core/models/cancha';
import { Router } from '@angular/router';
import { CanchaService } from '../../core/services/cancha.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  canchas: Cancha[] = [];

  constructor(private router: Router, private canchaService: CanchaService) { }

  ngOnInit(): void {
    this.cargarCanchas();
  }

  cargarCanchas(): void {
    this.canchaService.getCanchas().subscribe({
      next: (data) => {
        this.canchas = data;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
