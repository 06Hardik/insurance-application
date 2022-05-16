import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceChartsComponent } from 'src/components/insurance-charts/insurance-charts.component';
import { InsurancePolicyFormComponent } from 'src/components/insurance-policy-form/insurance-policy-form.component';
import { InsuranceSearchPageComponent } from 'src/components/insurance-search-page/insurance-search-page.component';

const routes: Routes = [
  { path: 'insurance-search-page', component: InsuranceSearchPageComponent },
  { path: 'insurance-charts', component: InsuranceChartsComponent },
  { path: 'insurance-policy-form/:policyId', component: InsurancePolicyFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
