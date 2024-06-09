import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonMaterialModule } from '../../core/modules/material/common-material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-filter-input',
  standalone: true,
  imports: [CommonMaterialModule, FormsModule],
  templateUrl: './character-filter-input.component.html',
  styleUrl: './character-filter-input.component.scss'
})
export class CharacterFilterInputComponent {
  @Input() filterValues: any;
  @Output() filterChange = new EventEmitter<any>();

  applyFilter(): void {
    this.filterChange.emit({
    });
  }

  clearFilter(): void {
  }

}
