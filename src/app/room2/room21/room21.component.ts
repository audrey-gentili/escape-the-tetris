import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PiecesDebloqueesService } from 'src/app/pieces-debloquees.service';

@Component({
  selector: 'app-room21',
  templateUrl: './room21.component.html',
  styleUrls: ['./room21.component.scss']
})
export class Room21Component implements OnInit {
  show = false;
  @Input() n1:Number;
  @Input() n2:Number;
  @Input() n3:Number;
  @Input() n4:Number;

  private audio = new Audio();

  constructor(private router: Router, public pieceDeb: PiecesDebloqueesService) {}

  ngOnInit(): void {
    this.audio.src = "/assets/music/music_tetris_folklorique.mp3";
    this.audio.load();
    this.audio.play();
    this.audio.loop = true;
  }

  ngOnDestroy() {
    this.audio.pause();
  }

  previousRoom() {
    this.router.navigateByUrl("/room2");
  }

  showCode() {
    this.show = true;
  }

  hideCode() {
    this.show = false;
    this.n1 = 0;
    this.n2 = 0;
    this.n3 = 0;
    this.n4 = 0;
  }

  verifyCode() {
    console.log(this.n1);
    console.log(this.n2);
    console.log(this.n3);
    console.log(this.n4);
    if ((this.n1 == 7) && (this.n2 == 5) && (this.n3 == 3) && (this.n4 == 9)) {
      console.log("code bon");
      this.goodCode();
    }
  }

  goodCode() {
    this.show = false;
    this.pieceDeb.salle21 = true;
    localStorage.setItem("salle21","true");
  }
}
