import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DEFAULT_RIDE_OBJECT, Ride } from '../../models/Ride';
import { RideService } from '../../services/ride';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {
  id: string;
  ride: Ride = DEFAULT_RIDE_OBJECT;

  constructor(
    private rideService: RideService,
    private navCtrl: NavController,
    private activateRoute: ActivatedRoute,
    
  ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');

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

  delete() {
    this.rideService.delete(this.ride.id).subscribe(
      (data) => {
        alert('Se elimino la rodada correctamente');
        this.navCtrl.pop();
      }, 
      (error) => {
        alert('No se pudo eliminar la rodada...');
        console.log(error);
      }
    )
  }

}
