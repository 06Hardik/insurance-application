import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OpenPolicyFormService } from 'src/services/open-policy-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance-search-page',
  templateUrl: './insurance-search-page.component.html',
  styleUrls: ['./insurance-search-page.component.scss'],
})
export class InsuranceSearchPageComponent implements OnInit {

  customerDisplayedColumns: string[] = ['CustId', 'Gender', 'Income_Group', 'Marital_status', 'Region'];
  policyDisplayedColumns: string[] = ['PolicyId', 'Purchase_date', 'Premium', 'Fuel', 'VEHICLE_SEGMENT', 'Bodily_Injury_Liability', 'Collision', 'Comprehensive', 'Personal_Injury_Protection', 'Property_Damage_Liability', 'actions'];
  policyDataSource: PolicyDetails[] = [];
  customerDataSource: CustomerDetails[] = [];
  isPolicy: boolean = true;
  searchType: string = "Policy";
  searchId=null;
  

  constructor(private http:HttpClient, private openEditFormService: OpenPolicyFormService, private router:Router) { }

  ngOnInit(): void {

    

  }

  setIsPolicy(){
    if (this.searchType == "Policy") {
      this.isPolicy = true;
    }
    else {
      this.isPolicy = false;
    }
  }

  openEditForm(row:any) {
    this.openEditFormService.setObject(row);
    this.router.navigate(["insurance-policy-form" + "/" + row.PolicyId]);
  }

  seachPolicy() {
    if (this.searchId) {
      let queryParams = new HttpParams();
      queryParams = queryParams.append("type",this.searchType).append("id", this.searchId);
      this.http.get("http://localhost:8000/cust_insurance_app/get_policy_details_by_id", {params:queryParams}).subscribe(result => {
        this.customerDataSource = [((result as any)["customer_Details"])];
        this.policyDataSource = (result as any)["policy_details"];
      });
    }
  }

}

export interface PolicyDetails {
  PolicyId: number;
  Purchase_date: string
  Premium: number
  Fuel: string
  VEHICLE_SEGMENT: string
  Bodily_Injury_Liability: boolean
  Collision: boolean
  Comprehensive: boolean
  Personal_Injury_Protection: boolean
  Property_Damage_Liability: boolean
}

export interface CustomerDetails {
  CustId: number;
  Gender: string;
  Income_Group: string;
  Marital_status: boolean;
  Region: string;
}
