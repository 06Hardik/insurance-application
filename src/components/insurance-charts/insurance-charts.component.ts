import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chart, LinearScale, BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip } from 'node_modules/chart.js'

@Component({
  selector: 'app-insurance-charts',
  templateUrl: './insurance-charts.component.html',
  styleUrls: ['./insurance-charts.component.scss']
})
export class InsuranceChartsComponent implements OnInit {

  selected:string="North";
  myChart: any;
  constructor(private http:HttpClient, private cds: ChangeDetectorRef) {
    Chart.register(LinearScale, BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip);
   }

  ngOnInit(): void {
    this.regionChange();
  }

  regionChange() {
    if (this.myChart) {
      this.myChart.destroy();
    }
    let resultObj: any[];
    let queryParams = new HttpParams();
    queryParams = queryParams.append("region",this.selected);
    this.http.get("http://localhost:8000/cust_insurance_app/get_policy_count_for_month_by_region", {params:queryParams}).subscribe(result => {
      resultObj = JSON.parse((result as any));
      const labels = resultObj.map(item => {
        return new Date(item["month"]).toLocaleString('en-us', { month: 'long' });
      })
      const datasets = resultObj.map(item => {
        return item["policyCount"];
      });

      this.myChart = new Chart("myChart", {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Policy Purchased',
                data: datasets,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
      });
    });
  }

}
