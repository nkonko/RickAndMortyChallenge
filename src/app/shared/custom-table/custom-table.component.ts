import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CommonMaterialModule } from '../../core/modules/material/common-material.module';
import { TitleCasePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonMaterialModule, TitleCasePipe, RouterLink],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss'
})
export class CustomTableComponent implements AfterViewInit {

  @Input() displayedColumns: string [] = [];
  @Input() datasource!: MatTableDataSource<any, MatPaginator>

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
  }

  sortData($event: Sort) {
    throw new Error('Method not implemented.');
  }
}
