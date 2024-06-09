import { Component } from '@angular/core';
import { CommonMaterialModule } from '../../core/modules/material/common-material.module';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonMaterialModule, RouterLink, TitleCasePipe, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  links = ['home', 'characters', 'episodes', 'web-socket']
}
