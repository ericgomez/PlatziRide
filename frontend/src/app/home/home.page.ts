import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Credential, DEFAULT_CREDENTIAL_OBJECT } from '../../models/Credential';
import { AuthenticationService } from '../../services/authentication';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  isLoggingIn = true;
  credential: Credential = DEFAULT_CREDENTIAL_OBJECT;

  constructor(
    private authenticationService: AuthenticationService,
    private navCtrl: NavController,
    ) { }

  public toggleLogin = () => {
    this.isLoggingIn = !this.isLoggingIn
  }

  login() {
    // Hacer el login o el sigup
    if (this.isLoggingIn) {
      this.doLogin();
    } else {
      
      if (this.credential.password !== this.credential.passwordConfirm) {
        alert('Tus contraseñas no coincidieron');
        return;
      }

      this.authenticationService.signup(this.credential).subscribe( 
        (data: any) => {
          console.log(data);
          // Guardar el token en localStorage
          this.doLogin();    
        }, 
        (error) => {
          alert('No pudimos autenticarte!');
          console.log(error);
          
        }
      )
    }
  }

  doLogin() {
    this.authenticationService.login({ 
      email: this.credential.email, 
      password: this.credential.password
    }).subscribe( 
      (data: any) => {
        console.log(data);
        // Guardar el token en localStorage
        localStorage.setItem('jwt', data.token);
        // Navegar hacia dentante y eliminar el modal anterior con navigateRoot
        this.navCtrl.navigateRoot('/rides');       
      }, 
      (error) => {
        alert('No pudimos autenticarte!');
        console.log(error);
        
      }
    )
  }

}
