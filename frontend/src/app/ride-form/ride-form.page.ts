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

  constructor(
    private activateRoute: ActivatedRoute,
    private navCtrl: NavController,
    private rideService: RideService
  ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.editing = (this.id != 'new');
  }

  save() {
    if (this.editing) {
      // Metodo para editar la rura
    } else {
      //Metodo para crear una nueva ruta
      this.rideService.create(this.ride).subscribe(
        (data) => {
          alert('Se creó la rodada correctamente');
          this.navCtrl.pop();
          console.log(data);
        }, 
        (error) => {
          alert('No se puedo crear la rodada...');
          console.log(error);
        }
      )
    }
  }

}
