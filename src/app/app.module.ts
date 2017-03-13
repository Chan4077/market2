import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, OverlayContainer } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

// App components
import { MarketComponent } from './market.component';
import { AboutComponent } from './about.component';
import { AccountComponent } from './account.component';
// import { PageNotFoundComponent } from './page-not-found.component';
import { AppComponent } from './app.component';
// App modules
import { routing } from './app.routes';
// App services
import { SidenavService } from './services/sidenav.service';
import { MarketItemService } from './services/marketitem.service';
// App dialogs
import { SettingsDialog } from './dialogs/settingsdialog.component';
import { ViewAuthorDialog } from './dialogs/viewauthor.component';
import { VersionDialog } from './dialogs/versiondialog.component';
import { UrlDialog } from './dialogs/urldialog.component';
// Environment
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    MarketComponent,
    AboutComponent,
    AppComponent,
    AccountComponent,
    // PageNotFoundComponent
    SettingsDialog,
    ViewAuthorDialog,
    VersionDialog,
    UrlDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [SidenavService, MarketItemService],
  bootstrap: [AppComponent],
  entryComponents: [SettingsDialog, ViewAuthorDialog, VersionDialog, UrlDialog]
})
export class AppModule {
  // constructor(overlayContainer: OverlayContainer) {
  //   overlayContainer.themeClass = 'dark-theme';
  // }
}
