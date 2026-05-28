import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  public title: string;
  public subtitle: string;
  public email: string;

  constructor() {
    this.title = "Projecte Angular v19";
    this.subtitle = "UF 3 M6 - Desenvolupant web entorn client";
    this.email = "m6daw@lacetania.cat";
  }
}
