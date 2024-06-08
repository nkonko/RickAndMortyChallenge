import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

const MATERIAL_MODULES = [
  CommonModule,
  MatTableModule,
  MatSortModule,
  MatCardModule,
  MatOptionModule,
  MatSelectModule,
  MatFormFieldModule,
  FlexLayoutModule
]

@NgModule({
  declarations: [],
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})

export class CommonMaterialModule { }
