import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

const materialComponents = [MatButtonModule,
                            MatIconModule,
                            MatSidenavModule, 
                            MatIconModule, 
                            MatListModule,
                            MatProgressSpinnerModule, 
                            MatCardModule,
                            MatGridListModule,];

@NgModule
({
  imports: [ materialComponents],
  exports :[materialComponents]
})
export class MaterialsModule { }
