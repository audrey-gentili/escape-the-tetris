import { Component } from '@angular/core';
import { PiecesDebloqueesService } from '../pieces-debloquees.service';
import { SallesDebloqueesService } from '../salles-debloquees.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private sallesDeb: SallesDebloqueesService, private piecesDeb: PiecesDebloqueesService){}

  jouerClick() {
    localStorage.clear()

    this.sallesDeb.salle3 = false
    this.sallesDeb.salleFinale = false
    this.piecesDeb.salle21 = false
    this.piecesDeb.salle22 = false
    this.piecesDeb.salle31 = false
    this.piecesDeb.salle32 = false
    
  }
}
