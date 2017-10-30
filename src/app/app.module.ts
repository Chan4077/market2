import 'hammerjs';
import { ReCaptchaModule } from "angular2-recaptcha";
import { FlexLayoutModule } from '@angular/flex-layout';
import { Shared, AlertDialog, ConfirmDialog, PromptDialog, SelectionDialog } from './shared';
import { MatIconRegistry, DateAdapter } from "@angular/material";
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarketMaterialModule } from './market.module';
import { RouterModule, Routes } from '@angular/router';
// import { AngularFireModule } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// App components
import { MarketComponent, NewestMarketSortComponent, MarketNavComponent, PopularMarketSortComponent, ReplyDialog } from './market.component';
import { AboutComponent } from './about.component';
import { AccountComponent } from './account.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AppComponent } from './app.component';
import { NewPostDialog } from './dialogs/newpost.component';
// App modules
import { AppRouting } from './app.routing';
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
import { HttpClientModule } from "@angular/common/http";
import { TestpageComponent } from './testpage/testpage.component';
const DIALOGS = [
	// Dialogs
	NewPostDialog,
	SettingsDialog,
	MoreInfoDialog,
	VersionDialog,
	UrlDialog,
	ReplyDialog,
	AlertDialog,
	PromptDialog,
	ConfirmDialog,
	SelectionDialog
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
		TestpageComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		MarketMaterialModule,
		AppRouting,
		ReactiveFormsModule,
		// AngularFireModule.initializeApp(environment.firebase),
		BrowserAnimationsModule,
		FlexLayoutModule,
		ReCaptchaModule
	],
	providers: [
		SidenavService,
		MarketItemService,
		UrlDialogService,
		Shared
	],
	bootstrap: [AppComponent],
	entryComponents: [
		DIALOGS
	]
})
export class AppModule {
	// constructor(overlayContainer: OverlayContainer) {
	//   overlayContainer.themeClass = 'dark-theme';
	// }
	constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private dateAdapter: DateAdapter<Date>) {
        /** 
         * @todo Figure out a way to cache the iconset so that the browser doesn't dowmload the iconset again
         * */
		matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('https://chan4077.github.io/res/mdi.svg'));
        /**
         * Sets to US locale
         * @todo Add a preference to set the date locale
         */
		dateAdapter.setLocale('en-us');
	}
}
