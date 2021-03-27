import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DEFAULT_RIDE_OBJECT, Ride } from '../../models/Ride';
import { RideService } from '../../services/ride';

declare const google: any;

@Component({
  selector: 'app-ride-form',
  templateUrl: './ride-form.page.html',
  styleUrls: ['./ride-form.page.scss'],
})
export class RideFormPage implements OnInit {
  id: string;
  editing = false;
  ride: Ride = DEFAULT_RIDE_OBJECT;
  wayPoints = [];
  masterWayPoints: string;
  legs = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private navCtrl: NavController,
    private rideService: RideService
  ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.editing = (this.id != 'new');

    if (this.editing) {
      this.rideService.getById(this.id).subscribe(
        (data: Ride) => {
          this.ride = data;
          console.log(data);
        }, 
        (error) => {
          alert('No se puedo obtener la rodada...');
          console.log(error);
        }
      )
    }
  }

  addWayPoint() {
    this.wayPoints.push(this.masterWayPoints);
    this.masterWayPoints = '';
    this.ride.wayPoints = this.wayPoints;
    console.log(this.ride);

    this.getDistances();
    
  }

  save() {
    if (this.editing) {
      // Metodo para editar la rura
      this.rideService.update(this.ride).subscribe(
        (data) => {
          alert('Se actualizó la rodada correctamente');
          this.navCtrl.pop();
          console.log(data);
        }, 
        (error) => {
          alert('No se pudo actualizar la rodada...');
          console.log(error);
        }
      )
    } else {
      //Metodo para crear una nueva ruta
      this.rideService.create(this.ride).subscribe(
        (data) => {
          alert('Se creó la rodada correctamente');
          this.navCtrl.pop();
          console.log(data);
        }, 
        (error) => {
          alert('No se pudo crear la rodada...');
          console.log(error);
        }
      )
    }
  }

  public getDistances() {
    let thisWayPoints = this.wayPoints.slice(1, -1); // Eliminamos los puntos; inicial y final del arreglo de los puntos
    thisWayPoints = thisWayPoints.map( (wp) => ({location: wp, stopover: true }));

    if (this.wayPoints.length < 2) {
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    const request = {
      origin: this.wayPoints[0],
      waypoints: thisWayPoints,
      destination: this.wayPoints[this.wayPoints.length - 1],
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(this.ride.start),
        trafficModel: 'bestguess',
      },
      unitSystem: google.maps.UnitSystem.METRIC
    }

    directionsService.route(request, (result, status) => {
      this.legs = result.routes[0].legs;
      this.ride.wayPoints = [];
      this.legs.forEach((leg) => {
        this.ride.wayPoints.push({
          start_address: leg.start_address,
          start_location: {
            lat: leg.start_location.lat(),
            lng: leg.start_location.lng(),
          },
          end_address: leg.end_address,
          end_location: {
            lat: leg.end_location.lat(),
            lng: leg.end_location.lng(),
          },
          distance: leg.distance,
          duration: leg.duration,
        })
      })
      console.log(this.ride);
      
    })

  }
}
