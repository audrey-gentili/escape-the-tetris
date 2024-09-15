import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SallesDebloqueesService {
  salle3: boolean = false
  salleFinale: boolean = false

  constructor() {
    this.salle3 = localStorage.getItem("salle3") == 'true'? true: false;
    this.salleFinale = localStorage.getItem("salleFinale") == 'true'? true: false;
  }

  init(){
  }
}
