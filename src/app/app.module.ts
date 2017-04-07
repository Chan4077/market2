import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MarketMaterialModule } from './market.module';
import { RouterModule, Routes } from '@angular/router';
// import { AngularFireModule } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';
// App components
import { MarketComponent, NewestMarketSortComponent, MarketNavComponent, PopularMarketSortComponent } from './market.component';
import { AboutComponent } from './about.component';
import { AccountComponent } from './account.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AppComponent } from './app.component';
import { NewPostComponent } from './new.component';
// App modules
import { routing } from './app.routes';
// App directives
import { FlexDirective } from './directives/flex.directive';
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
    NewPostComponent,
    // Directives
    FlexDirective,
    // Dialogs
    SettingsDialog,
    MoreInfoDialog,
    VersionDialog,
    UrlDialog
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
    HighlightJsModule
  ],
  providers: [SidenavService, MarketItemService, UrlDialogService, HighlightJsService],
  bootstrap: [AppComponent],
  entryComponents: [SettingsDialog, MoreInfoDialog, VersionDialog, UrlDialog]
})
export class AppModule {
  // constructor(overlayContainer: OverlayContainer) {
  //   overlayContainer.themeClass = 'dark-theme';
  // }
}
