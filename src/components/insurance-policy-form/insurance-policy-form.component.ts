import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OpenPolicyFormService } from 'src/services/open-policy-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SaveSnackbarComponent } from '../save-snackbar/save-snackbar.component';

@Component({
  selector: 'app-insurance-policy-form',
  templateUrl: './insurance-policy-form.component.html',
  styleUrls: ['./insurance-policy-form.component.scss']
})
export class InsurancePolicyFormComponent implements OnInit, OnDestroy {

  policyIdRoute:any
  policyDetailForm = new FormGroup({
    PolicyId: new FormControl(0),
    CustId: new FormControl(0),
    Purchase_date: new FormControl('',[Validators.required]),
    Premium: new FormControl(0, [Validators.required]),
    Fuel: new FormControl('',[Validators.required]),
    VEHICLE_SEGMENT: new FormControl('',[Validators.required]),
    Bodily_Injury_Liability: new FormControl(false,[Validators.required]),
    Collision: new FormControl(false,[Validators.required]),
    Comprehensive: new FormControl(false,[Validators.required]),
    Personal_Injury_Protection: new FormControl(false,[Validators.required]),
    Property_Damage_Liability: new FormControl(false,[Validators.required])
    })
    message:any;

  constructor(
    private httpClient: HttpClient,
    private openPolicyFormService: OpenPolicyFormService,
    private _activeroute: ActivatedRoute,
    private _snackBar: MatSnackBar) { }


  get Premium() {
    return this.policyDetailForm.get("Premium");
  }

  get Fuel() {
    return this.policyDetailForm.get("Fuel");
  }

   get VEHICLE_SEGMENT() {
    return this.policyDetailForm.get("VEHICLE_SEGMENT");
  }

  get Bodily_Injury_Liability() {
    return this.policyDetailForm.get("Bodily_Injury_Liability");
  }

  get Collision() {
    return this.policyDetailForm.get("Collision");
  }

  get Comprehensive() {
    return this.policyDetailForm.get("Comprehensive");
  }

  get Personal_Injury_Protection() {
    return this.policyDetailForm.get("Personal_Injury_Protection");
  }

  get Property_Damage_Liability() {
    return this.policyDetailForm.get("Property_Damage_Liability");
  }

  ngOnInit(): void {
    this.policyIdRoute = this._activeroute.snapshot.params["policyId"];
    if (this.openPolicyFormService.policyObject) {
      this.policyDetailForm.setValue(this.openPolicyFormService.policyObject);
    } else {
      let queryParams = new HttpParams();
      queryParams = queryParams.append("type","Policy").append("id", this.policyIdRoute);
      this.httpClient.get("http://localhost:8000/cust_insurance_app/get_policy_details_by_id", {params:queryParams}).subscribe(result => {
        this.policyDetailForm.setValue((result as any)["policy_details"][0]);
      });
    }
  }

  onSubmit() {
    const payload = {
      policy_details: this.policyDetailForm.value
    }
    this.httpClient.post("http://localhost:8000/cust_insurance_app/update_policy_details", payload).subscribe(sub => {
      if(sub == "updated") {
        this._snackBar.openFromComponent(SaveSnackbarComponent, {
          duration: 5 * 1000,
        });
      }
    }
    );
  }

  ngOnDestroy(): void {
    this.openPolicyFormService.resetObject();
  }

}
