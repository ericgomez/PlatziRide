import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DEFAULT_RIDE_OBJECT, Ride } from '../../models/Ride';
import { RideService } from '../../services/ride';

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

}
