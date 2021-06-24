import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { AppConfiguration } from "read-appsettings-json";

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiCiudadService {

  url: string = AppConfiguration.Setting().UrlCiudad;
  
  constructor(
    private _http: HttpClient
  ) { }

  getCiudades(): Observable<Response> {
    return this._http.get<Response>(this.url, httpOption);
  }
}
