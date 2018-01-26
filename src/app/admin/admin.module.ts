import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
// for terms table
import { TermsComponent } from './terms/terms.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		AdminRoutingModule,
		MatTableModule,
		MatPaginatorModule,
		FormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatExpansionModule,
	],
	declarations: [TermsComponent, AdminComponent]
})
export class AdminModule { }
