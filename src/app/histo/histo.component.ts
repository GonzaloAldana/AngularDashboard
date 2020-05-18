import { Component, OnInit } from '@angular/core';
import { ControllerService } from 'src/app/back/controller';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-histo',
  templateUrl: './histo.component.html',
  styleUrls: ['./histo.component.scss']
})
export class HistoComponent implements OnInit {

  constructor(private north: ControllerService) { }
  // Data Variables
  dataDimension: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }];
  dataValues: number[] = [];
  // Data Ng Select 
  defaultBindingsList = [
    { value: 1, label: 'Cliente', dimension: '[Dim Cliente].[Dim Cliente Nombre]' },
    { value: 2, label: 'Producto', dimension: '[Dim Producto].[Dim Producto Nombre]' },
    { value: 3, label: 'Empleado', dimension: '[Dim Empleado].[Dim Empleado Nombre]' }
  ];
  aniosBindingsList = [
    { value: 1996, label: '1996' },
    { value: 1997, label: '1997' },
    { value: 1998, label: '1998' }
  ];
  mesesBindingsList = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Obtubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' }
  ];
  selectedDimension = null;
  selectedAnio = null;
  auxArr: number[] = null;
  // Ng-Select Multiple
  customer$: Observable<any>;
  selectedCustomer: string[] = [];
  mesesAlch: string = '';
  selectedMeses = [];

  ngOnInit(): void {

    this.selectedDimension = this.defaultBindingsList[0];
    this.selectedAnio = this.aniosBindingsList[0];
    this.selectedMeses = [this.mesesBindingsList[0]];

    this.customer$ = this.north.getItemsByDimension(`${this.selectedDimension.dimension}`, 'ASC', this.selectedAnio.value, this.selectedMeses[0].value);
  }

  onChangeDimension($event) {
    this.selectedDimension = $event;
    this.customer$ = this.north.getItemsByDimension(`${this.selectedDimension.dimension}`, 'ASC', this.selectedAnio.value, this.selectedMeses[0].value);
  }

  onChangeAnio($event) {
    this.selectedAnio = $event;
    this.customer$ = this.north.getItemsByDimension(`${this.selectedDimension.dimension}`, 'ASC', this.selectedAnio.value, this.selectedMeses[0].value);
  }

  onChangeMes() {
    //this.selectedMeses[0] = $event;
    this.customer$ = this.north.getItemsByDimension(`${this.selectedDimension.dimension}`, 'ASC', this.selectedAnio.value, this.selectedMeses[0].value);
  }

  onChangeValues() {
    this.mesesAlch = '';
    for (var i = 0; i < this.selectedMeses.length; i++) {
      this.mesesAlch += this.selectedMeses[i].value + ',';
    }
    console.log(this.mesesAlch);

    this.north.GetDataChartByDimension(this.selectedDimension.dimension, 'DESC', this.selectedCustomer, this.selectedAnio.value, this.mesesAlch).subscribe((result: any) => {
      console.log(result);
      this.dataDimension = [];

      for (var i = 0; i < this.selectedMeses.length; i++) {
        this.auxArr = [];
        for (var j = 0; j < result.datosVenta.length; j++)
          this.auxArr.push(result.datosVenta[j][i]);
        console.log(this.auxArr);
        this.dataDimension.push({ "data": this.auxArr, "label": this.selectedMeses[i].label });
      }

      this.dataValues = result.datosVenta;
    });
  }

  clearModel() {
    this.selectedCustomer = [];
    this.selectedMeses = [];
  }

}
