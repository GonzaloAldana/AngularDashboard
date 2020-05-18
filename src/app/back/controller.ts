import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const URL_API = environment.API.EndPoint.Northwind;

@Injectable({
    providedIn: 'root'
})
export class ControllerService {

    constructor(private http: HttpClient) { }

    getTop5(dimension: string, orden: string) {
        return this.http.get(`${URL_API}Top5/${dimension}/${orden}`);
    }

    getSerieHistorica() {

    }

    getItemsByDimension(dimension: string, orden: string, anio: number, mes: string) {
        console.log(this.http.get(`${URL_API}Testing`));
        return this.http.get(`${URL_API}GetItemsByDimension/${dimension}/${orden}/${anio}/${mes}`).pipe(
            map((result: any) => result.datosDimension)
        )
    }
    getDataPieByDimension(dimension: string, orden: string, values: string[], anio: number, mes: string) {
        console.log('VALUES: ', values);

        return this.http.post(`${URL_API}GetDataPieByDimension/${dimension}/${orden}/${anio}/${mes}`, values).pipe(
            map((result: any) => result)
        )
    }
    GetDataChartByDimension(dimension: string, orden: string, values: string[], anio: number, mes: string) {
        console.log('VALUES: ', values);

        return this.http.post(`${URL_API}GetDataChartByDimension/${dimension}/${orden}/${anio}/${mes}`, values).pipe(
            map((result: any) => result)
        )
    }
}
