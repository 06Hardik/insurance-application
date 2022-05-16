import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InsuranceSearchPageComponent } from '../components/insurance-search-page/insurance-search-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/material.module';
import { InsuranceChartsComponent } from 'src/components/insurance-charts/insurance-charts.component';
import { InsurancePolicyFormComponent } from 'src/components/insurance-policy-form/insurance-policy-form.component';
import { OpenPolicyFormService } from 'src/services/open-policy-form.service';
import { SaveSnackbarComponent } from 'src/components/save-snackbar/save-snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    InsuranceSearchPageComponent,
    InsuranceChartsComponent,
    InsurancePolicyFormComponent,
    SaveSnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  providers: [OpenPolicyFormService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
