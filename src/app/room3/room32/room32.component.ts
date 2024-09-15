import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PiecesDebloqueesService } from 'src/app/pieces-debloquees.service';
import { SallesDebloqueesService } from 'src/app/salles-debloquees.service';

@Component({
  selector: 'app-room32',
  templateUrl: './room32.component.html',
  styleUrls: ['./room32.component.scss']
})
export class Room32Component implements OnInit{
  hie = false;
  screen = false;
  desktop = false;
  @Input() text = "";
  private audio = new Audio();
  photo = "";

  constructor(private router: Router, private accesSalles: SallesDebloqueesService, public pieceDeb: PiecesDebloqueesService) {}

  ngOnInit(): void {
    if(!this.accesSalles.salle3){
      this.router.navigateByUrl("/room2");
    }

    this.audio.src = "/assets/music/music_tetris_dance.mp3";
    this.audio.load();
    this.audio.play();
    this.audio.loop = true;
  }

  ngOnDestroy(){
    this.audio.pause();
  }

  previousRoom(){
    this.router.navigateByUrl("/room3");
  }

  showCode() {
    this.hie = true;
  }

  hideCode() {
    this.hie = false;
  }

  showScreen() {
    this.screen = true;
  }

  hideScreen() {
    this.screen = false;
  }

  showDesktop() {
    if (this.text.toLowerCase() == "shrek") {
      this.desktop = true;
      this.screen = false;
    }
    this.text = "";
  }

  hideDesktop() {
    this.desktop = false;
    this.hidePhoto();
  }

  win() {
    this.desktop = false;
    this.pieceDeb.salle32 = true;
    localStorage.setItem("salle32","true");
  }

  showFf() {
    this.photo = "ff";
  }

  showNoel() {
    this.photo = "noel";
  }

  showShrek() {
    this.photo = "shrek";
  }

  showLol() {
    this.photo = "lol";
  }

  hidePhoto() {
    this.photo = "";
  }
}

