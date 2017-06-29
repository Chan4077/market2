import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedService, CustomSnackbarComponent, WarningSnackbarComponent, AlertDialog, PromptDialog } from './services/shared.service';
import 'hammerjs';
import { MdIconRegistry, DateAdapter } from "@angular/material";
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MarketMaterialModule } from './market.module';
import { RouterModule, Routes } from '@angular/router';
// import { AngularFireModule } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';
// App components
import { MarketComponent, NewestMarketSortComponent, MarketNavComponent, PopularMarketSortComponent, ReplyDialog } from './market.component';
import { AboutComponent } from './about.component';
import { AccountComponent } from './account.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AppComponent } from './app.component';
import { NewPostDialog } from './dialogs/newpost.component';
// App modules
import { routing } from './app.routing';
// App services
import { SidenavService } from './services/sidenav.service';
import { MarketItemService } from './services/marketitem.service';
import { UrlDialogService } from './services/urldialog.service';
// App dialogs
import { SettingsDialog } from './dialogs/settingsdialog.component';
import { MoreInfoDialog } from './dialogs/moreinfo.component';
import { VersionDialog } from './dialogs/versiondialog.component';
import { UrlDialog } from './dialogs/urldialog.component';
// Environment
import { environment } from '../environments/environment';
const DIALOGS = [
    // Dialogs
    NewPostDialog,
    SettingsDialog,
    MoreInfoDialog,
    VersionDialog,
    UrlDialog,
    ReplyDialog,
    AlertDialog,
    PromptDialog
]
/**
 * The module to initialize with
 * @version 1.0.2
 * @author Edric Chan
 * @type @NgModule
 */
@NgModule({
    declarations: [
        MarketComponent,
        AboutComponent,
        AppComponent,
        AccountComponent,
        PageNotFoundComponent,
        NewestMarketSortComponent,
        PopularMarketSortComponent,
        MarketNavComponent,
        DIALOGS,
        // Snackbar
        CustomSnackbarComponent,
        WarningSnackbarComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MarketMaterialModule,
        routing,
        ReactiveFormsModule,
        // AngularFireModule.initializeApp(environment.firebase),
        BrowserAnimationsModule,
        HighlightJsModule,
        FlexLayoutModule
    ],
    providers: [
        SidenavService,
        MarketItemService,
        UrlDialogService,
        HighlightJsService,
        SharedService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        DIALOGS,
        // Snackbars
        CustomSnackbarComponent,
        WarningSnackbarComponent
    ]
})
export class AppModule {
    // constructor(overlayContainer: OverlayContainer) {
    //   overlayContainer.themeClass = 'dark-theme';
    // }
    constructor(private mdIconRegistry: MdIconRegistry, private domSanitizer: DomSanitizer, private dateAdapter: DateAdapter<Date>) {
        /** 
         * @todo Figure out a way to cache the iconset so that the browser doesn't dowmload the iconset again
         * */
        mdIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('https://chan4077.github.io/res/mdi.svg'));
        /**
         * Sets to US locale
         * @todo Add a preference to set the date locale
         */
        dateAdapter.setLocale('en-us');
    }
}
