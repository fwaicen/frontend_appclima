import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiCiudadService } from '../services/apiciudad.service';
import { ApiClimaService } from '../services/apiclima.services';
import { ApiHistoricoService } from '../services/apihistorico.service';
import { Response } from '../models/response';
import { Ciudad } from '../models/ciudad';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Historico } from '../models/historico';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  iconURL: string = "";
  traerHistorico: boolean = false;
  check!: boolean | false;
  ciudad = {} as Ciudad;
  lstCiudades!: any[];
  lstClima!: any[];
  list_historico = new MatTableDataSource<Historico>([]);
  columnas: string[] = ['ciudadNombre', 'paisNombre', 'Clima', 'SensacionTermica'];
  page_size: number = 10;
  page_number: number = 1;
  page_size_options = [10, 15, 25, 50, 100];
  constructor(
    private apiCiudad: ApiCiudadService,
    private apiClima: ApiClimaService,
    private apiHistorico : ApiHistoricoService
  ) { }

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.list_historico){
      this.list_historico.paginator = value;
    }
  }

  ngOnInit(): void {
    this.getCiudades();
  }

  ngAfterViewInit() {
    console.log(this.paginator)
    this.list_historico.paginator = this.paginator;
  }

  onChange(event: any){
    this.check = false;
    this.list_historico.data = [];
    var val = this.lstCiudades.filter(ciudad => ciudad.ciudadId == event.target.value);
    console.log(val[0].ciudadNombre);

    this.ciudad.ciudadNombre = val[0].ciudadNombre;
    this.ciudad.paisNombre = val[0].paisNombre;
    console.log(this.ciudad);
  }

  getCiudades() {
    this.apiCiudad.getCiudades().subscribe(response => {
      console.log(response.data);
      this.lstCiudades = response.data;
    })
  }

  consulta(){
    console.log(this.ciudad)
    if (this.ciudad.ciudadNombre !== undefined) {
      this.apiClima.getClima(this.ciudad).subscribe(response => {
        console.log(response.data)
        this.lstClima = new Array(JSON.parse(response.data));
        console.log(this.lstClima);
        var lista = this.lstClima.filter(function (e) {return e != null;})
        if (lista.length > 0) {
          this.iconURL = "https://openweathermap.org/img/wn/"+ this.lstClima[0].Icon + "@2x.png";
        
          this.check = true;
          if (this.traerHistorico) {
            this.apiHistorico.getHistorico(this.lstClima[0].PaisNombre,this.lstClima[0].CiudadNombre).subscribe(response => {
              this.list_historico.data = response.data;
            })
          }
        }
      })
    }
  }

}
