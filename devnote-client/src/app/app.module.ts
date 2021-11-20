import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// primeNG
import {TreeTableModule} from 'primeng/treetable';
import {MenubarModule} from 'primeng/menubar';
import {ContextMenuModule} from "primeng/contextmenu";

// components
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

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
        TreeTableModule,
        MenubarModule,
        ContextMenuModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
