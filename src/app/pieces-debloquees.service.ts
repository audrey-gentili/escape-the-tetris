import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PiecesDebloqueesService {
  salle21: boolean = false;
  salle22: boolean = false;
  salle31: boolean = false;
  salle32: boolean = false;

  constructor() {
    this.salle21 = localStorage.getItem("salle21") == 'true'? true: false;
    this.salle22 = localStorage.getItem("salle22") == 'true'? true: false;
    this.salle31 = localStorage.getItem("salle31") == 'true'? true: false;
    this.salle32 = localStorage.getItem("salle32") == 'true'? true: false;
  }

  init(){
  }
}
