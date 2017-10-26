import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {

  lineChartData: Array<any> = [
    { data: [18, 48, 77, 9, 99, 27, 40], label: 'Series C' }
  ];
  lineChartLabels: Array<any> = ['1', '2', '3', '4', '5', '6', '7'];
  lineChartOptions: any = {
    responsive: false,
    scales: {
      xAxes: [{
        display: true
      }],
      yAxes: [{
        display: false
      }]
    }
  };
  borderColor = 'rgb(46, 172, 255)';
  lineChartColors: Array<any> = [
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: this.borderColor,
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];
  lineChartLegend: boolean = false;
  lineChartType: string = 'line';
  
  randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 2) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  constructor() {
    const r = 300 + Math.floor(Math.random() * 1400);
    Observable.interval(r).subscribe(x => this.randomize());
  }

  // events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }

}