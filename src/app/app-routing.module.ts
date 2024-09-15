import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Room2Component } from './room2/room2/room2.component';
import { Room21Component } from './room2/room21/room21.component';
import { Room22Component } from './room2/room22/room22.component';
import { Room3Component } from './room3/room3/room3.component';
import { Room31Component } from './room3/room31/room31.component';
import { Room32Component } from './room3/room32/room32.component';
import { TrollComponent } from './troll/troll.component';

const routes: Routes = [
    {
		  path: '',
		  component: HomeComponent
  	},
    {
      path: 'room2',
      component: Room2Component
    },
    {
      path: 'room21',
      component: Room21Component
    },
    {
      path: 'room22',
      component: Room22Component
    },
    {
      path: 'room3',
      component: Room3Component
    },
    {
      path: 'room31',
      component: Room31Component
    },
    {
      path: 'room32',
      component: Room32Component
    }
    ,
    {
      path: 'troll',
      component: TrollComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
