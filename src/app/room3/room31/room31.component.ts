import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { PiecesDebloqueesService } from 'src/app/pieces-debloquees.service';
import { SallesDebloqueesService } from 'src/app/salles-debloquees.service';

@Component({
  selector: 'app-room31',
  templateUrl: './room31.component.html',
  styleUrls: ['./room31.component.scss']
})
export class Room31Component implements OnInit {
  private audio = new Audio();

  private motion1: HTMLVideoElement
  private motion2: HTMLVideoElement

  private ding: HTMLAudioElement

  private options = ["G","H","D","B"]
  private sequence: Array<string> = []
  private currentArrow : string
  private received : string

  private nbPieces = 15
  private wrongArrow = false
  
  private sequencePos = 0
  private nbClics = 0

  hiddenButton = false
  
  constructor(private router: Router, private accesSalles: SallesDebloqueesService, public pieceDeb: PiecesDebloqueesService) {}

  ngOnInit(): void {
    if (!this.accesSalles.salle3) {
      this.router.navigateByUrl("/room2");
    }

    this.moveArrowsToBody()

    this.audio.src = "/assets/music/music_tetris_enervante.mp3";
    this.audio.load();
    this.audio.play();
    this.audio.loop = true;

    this.motion1 = document.getElementById('motion1')! as HTMLVideoElement;
    this.motion2 = document.getElementById("motion2")! as HTMLVideoElement;

    this.playMotionVideos()
    
    this.ding = new Audio()
    this.ding.src = "/assets/bonne_rep.mp3"
    this.ding.load()
  }

  ngOnDestroy() {
    this.audio.pause();
    this.motion1.pause();
    this.motion2.pause();

    this.removeArrows();
  }

  commencer(){
    this.wrongArrow = false
    this.hiddenButton = true
    this.initSequence()
    this.lancerJeu()
  }

  initSequence(){
    this.sequence = []
    for(let i = 0; i < this.nbPieces; i++){
      var rand = Math.floor(Math.random() * this.options.length)
      this.sequence.push(this.options[rand])
    }
  }

  async lancerJeu(){
    //this.audio.pause()
    var ecran = document.getElementById("GH")!
    this.nbClics = 0
    for(this.sequencePos = 0; this.sequencePos < this.sequence.length; this.sequencePos++){
  
      this.received = ""
      this.currentArrow = this.sequence[this.sequencePos]
      var fleche = document.getElementById('fleche' + this.currentArrow)!
      fleche.classList.remove("hide")
      ecran.appendChild(fleche)

      await sleep(2000)
      document.body.appendChild(fleche)

      if (this.received != this.currentArrow || this.nbClics != this.sequencePos+1){
        this.wrongArrow = true
        break
      }
      else{
        this.wrongArrow = false
      }
    }

    this.hiddenButton = false
    
    if(!this.wrongArrow){
      this.audio.currentTime = 0
      this.audio.play()
      this.pieceDeb.salle31 = true
      localStorage.setItem("salle31","true")
    }
  }

  previousRoom() {
    this.router.navigateByUrl("/room3");
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.wrongArrow = true
    this.received = ""
    
    if(event.key == "ArrowUp") {
      this.received = "H"
    }
    if(event.key == "ArrowDown") {
      this.received = "B"
    }
    if(event.key == "ArrowLeft") {
      this.received = "G"
    }
    if(event.key == "ArrowRight") {
      this.received = "D"
    }

    if(this.received != ""){
      this.nbClics++
    }

    if(this.received == this.currentArrow && this.sequencePos == this.nbClics-1){
      this.ding.currentTime = 0
      this.audio.pause()
      this.ding.play()
      this.audio.play()
    }
  }

  moveArrowsToBody(){
    document.body.appendChild(document.getElementById("flecheD")!);
    document.body.appendChild(document.getElementById("flecheG")!);
    document.body.appendChild(document.getElementById("flecheH")!);
    document.body.appendChild(document.getElementById("flecheB")!);
  }

  removeArrows(){
    document.body.removeChild(document.getElementById("flecheD")!)
    document.body.removeChild(document.getElementById("flecheG")!)
    document.body.removeChild(document.getElementById("flecheH")!)
    document.body.removeChild(document.getElementById("flecheB")!)
  }

  playMotionVideos(){
    this.motion1.classList.remove("hide")
    this.motion1.play()
    this.motion1.loop = true
    
    this.motion2.classList.remove("hide")
    this.motion2.play()
    this.motion2.loop = true
  }
}

const sleep = (ms: number) => new Promise((r)=> setTimeout(r, ms));