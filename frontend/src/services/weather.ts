import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Credential } from "../models/Credential";

@Injectable()
export class WeatherService {
  private openWeatherMap_url = 'http://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?';
  private openWeatherMap_key = '6c7f99a26b5f5f4486f0e1cb4ac22091'

  constructor (
    private http: HttpClient
  ){

  }
  
  public getWeather(location) {
    
    // Parametros para el encabezado
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'x-requested-with': 'x-requested-by',
    }
    
    // Agregando encabezado de solicitud obligatorio HTTTP
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.get(`${this.openWeatherMap_url}lat=${location.lat}&lon=${location.lng}&APPID=${this.openWeatherMap_key}&units=metric`, requestOptions);
  }
}