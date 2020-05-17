import { Component, OnInit } from '@angular/core';
import { ControllerService } from 'src/app/back/controller';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {


  constructor(private north: ControllerService) { }
  // Data Variables
  dataDimension: Label[] = [];
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
  selectedMes = null;
  // Ng-Select Multiple
  customer$: Observable<any>;
  selectedCustomer: string[] = [];

  ngOnInit(): void {

    this.selectedDimension = this.defaultBindingsList[0];
    this.selectedAnio = this.aniosBindingsList[0];
    this.selectedMes = this.mesesBindingsList[0];

    this.customer$ = this.north.getItemsByDimension(`${this.selectedDimension.dimension}`, 'ASC', this.selectedAnio.value, this.selectedMes.value);
  }

  onChangeDimension($event) {
    this.selectedDimension = $event;
    this.customer$ = this.north.getItemsByDimension(`${this.selectedDimension.dimension}`, 'ASC', this.selectedAnio.value, this.selectedMes.value);
  }

  onChangeAnio($event) {
    this.selectedAnio = $event;
    this.customer$ = this.north.getItemsByDimension(`${this.selectedDimension.dimension}`, 'ASC', this.selectedAnio.value, this.selectedMes.value);
  }

  onChangeMes($event) {
    this.selectedMes = $event;
    this.customer$ = this.north.getItemsByDimension(`${this.selectedDimension.dimension}`, 'ASC', this.selectedAnio.value, this.selectedMes.value);
  }

  onChangeValues() {
    this.north.getDataPieByDimension(this.selectedDimension.dimension, 'DESC', this.selectedCustomer, this.selectedAnio.value, this.selectedMes.value).subscribe((result: any) => {
      this.dataDimension = result.datosDimension;
      this.dataValues = result.datosVenta;
    });
  }

  clearModel() {
    this.selectedCustomer = [];
  }
}
