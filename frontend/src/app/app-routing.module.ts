import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'rides',
    loadChildren: () => import('./rides/rides.module').then( m => m.RidesPageModule)
  },
  {
    path: 'ride-form/:id',
    loadChildren: () => import('./ride-form/ride-form.module').then( m => m.RideFormPageModule)
  },
  {
    path: 'ride/:id',
    loadChildren: () => import('./ride/ride.module').then( m => m.RidePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
