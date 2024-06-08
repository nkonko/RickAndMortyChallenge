import { Component, Input } from '@angular/core';
import { CommonMaterialModule } from '../../core/modules/material/common-material.module';
import { TitleCasePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonMaterialModule, TitleCasePipe, RouterLink],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss'
})
export class CustomTableComponent {
  @Input() displayedColumns: string [] = [];
  @Input() datasource!: MatTableDataSource<any, MatPaginator>
}
