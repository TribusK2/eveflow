import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { SkyComponent } from './sky/sky.component';
import { SunComponent } from './sky/sun/sun.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    SkyComponent,
    SunComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
