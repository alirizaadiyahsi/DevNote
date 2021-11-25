import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

// components
import {SidebarComponent} from './components/shared/sidebar/sidebar.component';
import {NavbarComponent} from './components/shared/navbar/navbar.component';

// primeNG
import {TreeTableModule} from 'primeng/treetable';
import {MenubarModule} from 'primeng/menubar';
import {ContextMenuModule} from "primeng/contextmenu";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        NavbarComponent
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
        InputTextModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
