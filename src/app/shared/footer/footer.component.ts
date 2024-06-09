import { Component } from '@angular/core';
import { CommonMaterialModule } from '../../core/modules/material/common-material.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonMaterialModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
