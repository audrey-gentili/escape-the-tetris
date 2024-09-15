import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PiecesDebloqueesService } from 'src/app/pieces-debloquees.service';

@Component({
  selector: 'app-room22',
  templateUrl: './room22.component.html',
  styleUrls: ['./room22.component.scss']
})
export class Room22Component implements OnInit {
  cpt = 0
  text = "Bienvenue !";
  color = "";
  notes = ["do", "re", "mi", "la", "si"];
  colors = ["jaune", "vert", "rouge", "violet", "bleu"];
  seq = ["mi", "si", "do", "re", "do", "si", "la"];
  seqJouee: Array<string> = [];
  listColors = ["jaune", "vert", "rouge", "violet", "bleu"];
  rnd: number = 0;
  tour = 0;
  afficheBouton: boolean = true;
  timeout: NodeJS.Timeout;
  dureeInterval: number = 1000;
  interval: NodeJS.Timer;

  private audio = new Audio()

  constructor(private router: Router, public pieceDeb: PiecesDebloqueesService) {}

  ngOnInit(): void {
    if (this.pieceDeb.salle22) this.text = "";

    this.audio.src = "/assets/music/music_tetris_techno.mp3";
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

  association() {
    let list = [];
    for (let i = 0; i < 5; i++) {
      this.rnd = Math.floor(Math.random() * this.listColors.length);
      list.push(this.listColors[this.rnd]);
      this.listColors.splice(this.rnd, 1);
    }
    this.listColors = list;
  }

  commencerClick() {
    this.audio.pause()
    this.afficheBouton = false;
    this.association();
    this.tour = 0;
    this.seqJouee = [];
    this.sequence();
  }

  sequence() {
    if (!this.afficheBouton) {
      this.text = "Niveau "+(this.tour+1);
      this.cpt = 0;

      this.interval = setInterval( () => this.intervalFunction(), this.dureeInterval);
    }
  }

  private intervalFunction() {
    clearInterval(this.interval);

    let note = this.seq[this.cpt];

    let index = this.notes.indexOf(note);
    this.color = this.listColors[index];

    let audio = new Audio();
    audio.src = "/assets/notes_piano/"+note+".mp3";
    audio.load();
    audio.play();

    this.dureeInterval = this.cpt % 3 == 0 ? 1000: 500;

    this.cpt++;
    this.interval = setInterval(() => this.intervalFunction(), this.dureeInterval);

    if (this.cpt > this.tour) {
      clearInterval(this.interval);
      setTimeout( () => { this.color = ""; }, 1000);
    }
  }

  async clic(couleur: string) {
    this.color = couleur;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(()=> this.color = "", 1000);

    let note = this.notes[this.listColors.indexOf(couleur)];
    let audio = new Audio();
    audio.src = "/assets/notes_piano/"+note+".mp3";
    audio.load();
    audio.play();

    if (this.seq[this.seqJouee.length] == note) {
      this.seqJouee.push(note);
    } else {
      this.afficheBouton = true;
    }

    if (this.seq.length == this.seqJouee.length) {
      console.log("gagné !");
      this.text = "";
      this.pieceDeb.salle22 = true;
      localStorage.setItem("salle22","true");
      this.audio.currentTime = 0
      this.audio.play()
    } else if (this.seqJouee.length == this.tour + 1) {
      this.tour++;
      this.seqJouee = [];

      await sleep(750);
      this.sequence();
    }
  }
}
const sleep = (ms: number) => new Promise((r)=> setTimeout(r, ms));
