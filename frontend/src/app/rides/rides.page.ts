import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ride } from '../../models/Ride';
import { RideService } from '../../services/ride';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.page.html',
  styleUrls: ['./rides.page.scss'],
})
export class RidesPage implements OnInit {
  rides: Observable<Ride[]>;
  constructor(
    public rideService: RideService
  ) { }

  ngOnInit() {
    this.getRides();
  }

  getRides() {
    this.rides = this.rideService.getAll();
  }

  delete(id) {
    this.rideService.delete(id).subscribe(
      (data) => {
        alert('Se elimino la rodada correctamente');
        this.getRides();
      }, 
      (error) => {
        alert('No se pudo eliminar la rodada...');
        console.log(error);
      }
    )
  }
}
