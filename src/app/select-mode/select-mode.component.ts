import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-mode',
  templateUrl: './select-mode.component.html',
  styleUrl: './select-mode.component.scss'
})
export class SelectModeComponent {
  constructor(private router: Router) {}
  goToCardGame() {
    this.router.navigate(['/game']);
  }
  goToCardTwelveGame() {
    this.router.navigate(['/game12']);
  }

}
