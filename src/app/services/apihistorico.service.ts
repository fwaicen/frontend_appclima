import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudad } from '../models/ciudad';
import { Response } from '../models/response';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class ApiHistoricoService {
    url: string = AppConfiguration.Setting().UrlHistorico;
    
    constructor(
        private _http: HttpClient
    ) { }

    getHistorico(pais: string, ciudad: string) : Observable<Response> {
        let headers = new HttpHeaders();
        let parametros = new HttpParams()
            .set("ciudad", ciudad)
            .set("pais", pais);
        headers.append('Content-Type', 'application/json');
        console.log(pais);
        console.log(ciudad);
        return this._http.get<Response>(this.url, {headers: headers, params: parametros});
    }
}
