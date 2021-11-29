import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

// services
import {SidebarService} from "../common/services/sidebar-service";
import {TabService} from "../common/services/tab-service";
import {ConfirmationService} from 'primeng/api';

// components
import {SidebarComponent} from './components/shared/sidebar/sidebar.component';
import {NavbarComponent} from './components/shared/navbar/navbar.component';
import {TabsComponent} from './pages/tabs/tabs.component';


// primeNG
import {TreeTableModule} from 'primeng/treetable';
import {MenubarModule} from 'primeng/menubar';
import {ContextMenuModule} from "primeng/contextmenu";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from 'primeng/dialog';
import {OrderListModule} from "primeng/orderlist";
import {TabViewModule} from "primeng/tabview";

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        NavbarComponent,
        TabsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        TreeTableModule,
        MenubarModule,
        ContextMenuModule,
        ButtonModule,
        InputTextModule,
        ConfirmDialogModule,
        DialogModule,
        OrderListModule,
        TabViewModule
    ],
    providers: [SidebarService, TabService, ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
