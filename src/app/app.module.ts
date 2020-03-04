import { BrowserModule }                         from '@angular/platform-browser';
import { NgModule }                              from '@angular/core';
import { HttpClientModule }                      from '@angular/common/http';
import { AppRoutingModule,routingComponents  }   from './app-routing.module';
import { MaterialsModule }                       from './materials/materials.module';
import { AppComponent }                          from './app.component';
import { HomeComponent }                         from './home/home.component';
import { AboutComponent }                        from './about/about.component';
import { BrowserAnimationsModule }               from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
