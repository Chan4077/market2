/**
 * This module is meant for imports for ngMaterial so that the amount of code to import is reduced
 * @version 1.0.1
 * @example Import into <code>app.module.ts</code> as <code>MarketMaterialModule</code>
 * @author Edric Chan
 * @description Based on this PR which is currently not merged (this PR will depreceate <code>MaterialModule</code>):
 * https://github.com/angular/material2/pull/3840
 */

// NgModule
import { NgModule } from '@angular/core';
// MaterialModules to import
import { MdInputModule, MdDialogModule, MdTooltipModule, MdButtonModule, MdIconModule, MdTabsModule, MdCardModule, OverlayModule, MdProgressSpinnerModule, MdSnackBarModule, MdMenuModule, MdCheckboxModule, MdListModule, MdRippleModule, StyleModule, A11yModule, PlatformModule, CompatibilityModule, ObserveContentModule, MdSidenavModule, MdToolbarModule } from '@angular/material';
// List of components to import
const MARKET_MATERIAL_MODULES = [
    MdInputModule,
    MdDialogModule,
    MdTooltipModule,
    MdButtonModule,
    MdIconModule,
    MdTabsModule,
    MdCardModule,
    OverlayModule,
    MdProgressSpinnerModule,
    MdSnackBarModule,
    MdMenuModule,
    MdCheckboxModule,
    MdListModule,
    MdRippleModule,
    MdSidenavModule,
    MdToolbarModule,
    StyleModule,
    A11yModule,
    PlatformModule,
    CompatibilityModule,
    ObserveContentModule
]
@NgModule({
    imports: MARKET_MATERIAL_MODULES,
    exports: MARKET_MATERIAL_MODULES
})
// Export the module
export class MarketMaterialModule { }