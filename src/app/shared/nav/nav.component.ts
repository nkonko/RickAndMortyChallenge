import { Component } from '@angular/core';
import { CommonMaterialModule } from '../../core/modules/material/common-material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonMaterialModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

}
