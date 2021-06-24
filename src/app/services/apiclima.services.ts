import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudad } from '../models/ciudad';
import { Response } from '../models/response';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class ApiClimaService {
    url: string = AppConfiguration.Setting().UrlClima;
    
    constructor(
        private _http: HttpClient
    ) { }

    getClima(data: Ciudad) : Observable<Response> {
        let headers = new HttpHeaders();
        let parametros = new HttpParams()
            .set("ciudad", data.ciudadNombre.trim())
            .set("pais", data.paisNombre.trim());
        headers.append('Content-Type', 'application/json');
        console.log(data.ciudadNombre);
        console.log(data.paisNombre);
        return this._http.get<Response>(this.url, {headers: headers, params: parametros});
    }
}
