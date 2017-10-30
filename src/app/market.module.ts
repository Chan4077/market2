// NgModule
import { NgModule } from '@angular/core';
//#region Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
//#endregion
//#region CDK imports
import { A11yModule } from '@angular/cdk/a11y';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
//#endregion
//#region Material modules required by the app
const MATERIAL_MODULES = [
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDatepickerModule,
	MatDialogModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatNativeDateModule,
	MatProgressSpinnerModule,
	MatRippleModule,
	MatSelectModule,
	MatSnackBarModule,
	MatSidenavModule,
	MatTabsModule,
	MatToolbarModule,
	MatTooltipModule
];
//#endregion
//#region CDK modules required by the app
const CDK_MODULES = [
	A11yModule,
	LayoutModule,
	OverlayModule
];
//#endregion
@NgModule({
    exports: [
		MATERIAL_MODULES,
		CDK_MODULES
	]
})
export class MarketMaterialModule {}