import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SallesDebloqueesService } from 'src/app/salles-debloquees.service';

@Component({
  selector: 'app-room3',
  templateUrl: './room3.component.html',
  styleUrls: ['./room3.component.scss']
})
export class Room3Component implements OnInit {
  private audio = new Audio();
  @Input() porte = "porte";

  constructor(private routeur: Router, private accesSalles: SallesDebloqueesService) {
    if (this.accesSalles.salleFinale) this.porte = "porte_ouverte";
  }

  ngOnInit(): void {
    if(!this.accesSalles.salle3) {
      this.routeur.navigateByUrl("/room2");
    }
    this.audio.src = "/assets/music/music_tetris_tradi_2.mp3";
    this.audio.load();
    this.audio.play();
    this.audio.loop = true;
  }

  ngOnDestroy() {
    this.audio.pause();
  }


  leftRoom() {
    this.routeur.navigateByUrl("room31");
  }

  rightRoom() {
    this.routeur.navigateByUrl("room32");
  }

  nextRoom() {
    if (this.accesSalles.salleFinale) {
      this.routeur.navigateByUrl("/troll");
    } else {
      document.getElementById("codeC2")?.classList.remove("hide");
    }
  }

  previousRoom() {
    this.routeur.navigateByUrl("/room2");
  }

  hideCode() {
    document.getElementById("codeC2")?.classList.add("hide");
  }
}
