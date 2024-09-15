import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SallesDebloqueesService } from 'src/app/salles-debloquees.service';

@Component({
  selector: 'app-room2',
  templateUrl: './room2.component.html',
  styleUrls: ['./room2.component.scss']
})
export class Room2Component implements OnInit {
  @ViewChild('code',{static:false}) code: ElementRef;
  @Input() porte = "porte";
  private audio = new Audio();

  constructor(private routeur: Router, private accesSalles: SallesDebloqueesService) {
    if (this.accesSalles.salle3) this.porte = "porte_ouverte";
  }

  ngOnInit(): void {
    this.audio.src = "/assets/music/music_tetris_tradi_1.mp3";
    this.audio.load();
    this.audio.play();
    this.audio.loop = true;
  }

  ngOnDestroy() {
    this.audio.pause();
  }

  leftRoom() {
    this.routeur.navigateByUrl("room21");
  }

  rightRoom() {
    this.routeur.navigateByUrl("room22");
  }

  nextRoom() {
    if(this.accesSalles.salle3){
      this.routeur.navigateByUrl("/room3");
    }else{
      document.getElementById("codeC1")?.classList.remove("hide");
    }
  }

  previousRoom() {
    this.routeur.navigateByUrl("/");
  }

  hideCode() {
    document.getElementById("codeC1")?.classList.add("hide");
  }
}
