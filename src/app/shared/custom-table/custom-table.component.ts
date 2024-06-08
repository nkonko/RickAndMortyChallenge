import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CommonMaterialModule } from '../../core/modules/material/common-material.module';
import { TitleCasePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { SortService } from '../services/sort.service';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonMaterialModule, TitleCasePipe, RouterLink],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss',
})
export class CustomTableComponent implements AfterViewInit {
  @Input() displayedColumns: string[] = [];
  @Input() datasource!: MatTableDataSource<any>;
  @Input() imageAlt?: string;
  @Input() routerLinkData?: string;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sortService: SortService) {}

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
  }

  sortData($event: Sort) {
    this.sortService.sortData(this.datasource.data, $event).subscribe(sortedData => {
      this.datasource.data = sortedData;
    });
  }
}
