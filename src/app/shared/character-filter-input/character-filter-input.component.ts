import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() filterChange = new EventEmitter<any>();

  filterName: string = 'Rick';
  filterStatus: string = 'Alive';
  filterSpecies: string = 'Human';

  applyFilter(): void {
    this.filterChange.emit({
      name: this.filterName,
      status: this.filterStatus,
      species: this.filterSpecies,
    });
  }

  clearFilter(): void {
    this.filterName = 'Rick';
    this.filterStatus = 'Alive';
    this.filterSpecies = 'Human';
    this.applyFilter();
  }

}
