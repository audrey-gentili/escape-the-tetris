import { style } from '@angular/animations';
import { Component, HostListener, OnInit, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { SallesDebloqueesService } from '../salles-debloquees.service';

@Component({
  selector: 'app-troll',
  templateUrl: './troll.component.html',
  styleUrls: ['./troll.component.scss']
})
export class TrollComponent implements OnInit{
  private nomFichier = new Map()
  private tetrominos = new Map();
  private tetroDropped = new Map()

  private grille = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
  private mousePositionOnImageX : number
  private mousePositionOnImageY : number
  private caseW : number
  private caseH : number
  private coinX : number
  private coinY : number

  constructor(private router: Router, private accesSalles: SallesDebloqueesService){}
  
  ngOnInit(): void {
    if(!this.accesSalles.salleFinale) {
      if(this.accesSalles.salle3) {
        this.router.navigateByUrl("/room3")
      }else{
        this.router.navigateByUrl("/room2")
      }
    }

    this.nomFichier.set("bleu_f","3_bleu_fonce.png")
    this.nomFichier.set("rouge","9_rouge.png")
    this.nomFichier.set("rose","18_rose.png")
    this.nomFichier.set("violet","12_violet.png")
    this.nomFichier.set("vert","11_vert1.png")
    this.nomFichier.set("jaune","12_jaune.png")
    this.nomFichier.set("orange","18_orange.png")
    this.nomFichier.set("bleu_c","15_bleu_clair1.png")

    this.tetrominos.set("bleu_f",[[0,0,1],[1,1,1]])
    this.tetrominos.set("rouge",[[1,0],[1,1],[0,1]])
    this.tetrominos.set("rose",[[1]])
    this.tetrominos.set("violet",[[1,1,1],[0,1,0]])
    this.tetrominos.set("vert",[[1,1,0],[0,1,1]])
    this.tetrominos.set("jaune",[[1,1],[1,1]])
    this.tetrominos.set("orange",[[1,0,0],[1,1,1]])
    this.tetrominos.set("bleu_c",[[1],[1],[1],[1],[1]])
  }

  ngAfterViewInit(){
    this.caseW = document.getElementById("grille")?.offsetWidth! / 6
    this.caseH = document.getElementById("grille")?.offsetHeight! / 5
  }

  allowDrop(ev: any) {
    ev.preventDefault();

    var rect = document.getElementById('grille')!.getBoundingClientRect()

    this.coinX = Math.floor((ev.clientX - rect.left - this.mousePositionOnImageX) / this.caseW)
    this.coinY = Math.floor((ev.clientY - rect.top - this.mousePositionOnImageY) / this.caseH)
  }
  
  drag(ev: any) {
    this.mousePositionOnImageX = 0
    this.mousePositionOnImageY = 0


    // creation de l'image fantome (image qui se déplace avec la souris)
    var imageHeight = Math.round(ev.target.height * 80 / 100)
    var div = document.createElement('div');
    div.id="dragdiv"
    div.style.position = "absolute"; div.style.top = "0px"; div.style.left= "-50vw";

    var image = new Image()
    image.src = "/assets/2D/" + this.nomFichier.get(ev.target.id)
    image.style.position = "absolute"; image.style.height = imageHeight + "px"
    
    div.appendChild(image)
    document.body.append(div)
    ev.dataTransfer.setDragImage(div, 0, 0)
    
    // informations à transférer pour le drop
    if(this.tetroDropped.get(ev.target.id) != null){
      this.liberer(ev.target.id)
    }
    ev.dataTransfer.setData("image", ev.target.id);
  }

  dragEnd(ev: any){
    document.body.removeChild(document.getElementById("dragdiv")!)

    var data = ev.target.id

    var position = this.tetroDropped.get(data)
    console.log("ici: \n"+this.tetroDropped.get(data))
    
    if( position != undefined){
      this.coinX = position[0]
      this.coinY = position[1]

      this.placer(data)
    }
  }

  drop(ev: any) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("image");
    if(this.disponible(data)){
      this.placer(data)
      
      document.getElementById(data)!.style.position = "absolute"
      document.getElementById(data)!.style.top = String(this.coinY * 8 + "vh")
      document.getElementById(data)!.style.left = String(this.coinX * 8 + "vh")

      document.getElementById("grille")?.appendChild(document.getElementById(data)!)
    }    
  }

  disponible(tetrominoId: string):boolean {
    var tetromino = this.tetrominos.get(tetrominoId)
    if(this.coinX < 0 || this.coinY < 0){
      return false
    }

    if(tetromino.length + this.coinX > this.grille.length ||
        tetromino[0].length + this.coinY > this.grille[0].length ){
          return false
        }
  
    
    for(let i=0; i < tetromino.length; i++){
      for(let j =0; j<tetromino[i].length; j++){
        if(tetromino[i][j] == 1 && this.grille[this.coinX+i][this.coinY+j] == 1){
          return false;
        }
      }
    }
    return true;
  }

  placer(tetrominoId: string){
    var tetromino = this.tetrominos.get(tetrominoId)
    this.grille[this.coinX][this.coinY]
    for(let i=0; i < tetromino.length; i++){
      for(let j =0; j<tetromino[i].length; j++){
        this.grille[this.coinX+i][this.coinY+j] = Math.max(tetromino[i][j], this.grille[this.coinX+i][this.coinY+j])
      }
    }

    this.tetroDropped.set(tetrominoId, [this.coinX, this.coinY])
    if(this.verifPlein()){
      this.animationFin()
    }
  }

  liberer(tetrominoId: string){
    if(this.tetroDropped.get(tetrominoId) != null){
      var tetromino = this.tetrominos.get(tetrominoId)
      var tetroPos = this.tetroDropped.get(tetrominoId)

      for(let i = 0; i < tetromino.length ; i++){
        for(let j = 0; j < tetromino[i].length; j++){
          if(tetromino[i][j] == 1){
            this.grille[tetroPos[0]+i][tetroPos[1]+j] = 0
          }
        }
      }
    }
  }

  verifPlein(): boolean{
    for(let i = 0; i< this.grille.length; i++){
      for(let j=0; j< this.grille[i].length; j++){
        if(this.grille[i][j] == 0){
          return false
        }
      }
    }

    return true
  }

  allowDropOut(ev: any) {
    ev.preventDefault();
  }
  
  dropOut(ev: any) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("image");
    
    document.getElementById(data)!.removeAttribute('style')
    if(ev.target.tagName == "DIV"){
      ev.target.appendChild(document.getElementById(data)!)
    }else{
      ev.target.parentNode.appendChild(document.getElementById(data)!)
    }

    if(this.tetroDropped.get(data) != null){
      this.tetroDropped.delete(data)
    }
  }

  async animationFin(){
    document.querySelector("#colG")?.classList.add("hide")
    document.querySelector("#colD")?.classList.add("hide")
    document.getElementById('puzzleBoard')!.classList.add("disappear")
    await sleep(5000)
    document.getElementById('ecranCine')?.classList.remove("hide")
    var rideau = document.getElementById('rideau')!
    rideau.classList.add("scrollDown")

    var orange = document.getElementById("orange")!
    var rouge = document.getElementById("rouge")!
    var bleu_f = document.getElementById("bleu_f")!
    var vert = document.getElementById("vert")!
    var rose = document.getElementById("rose")!
    var bleu_c = document.getElementById("bleu_c")!
    var jaune = document.getElementById("jaune")!
    var violet = document.getElementById("violet")!

    var orange2 = document.getElementById("orange2")!
    var rouge2 = document.getElementById("rouge2")!
    var bleu_f2 = document.getElementById("bleu_f2")!
    var vert2 = document.getElementById("vert2")!
    var rose2 = document.getElementById("rose2")!
    var bleu_c2 = document.getElementById("bleu_c2")!
    var jaune2 = document.getElementById("jaune2")!
    var violet2 = document.getElementById("violet2")!

    orange.removeAttribute("style")
    rouge.removeAttribute("style")
    bleu_f.removeAttribute("style")
    vert.removeAttribute("style")
    rose.removeAttribute("style")
    bleu_c.removeAttribute("style")
    jaune.removeAttribute("style")
    violet.removeAttribute("style")

    rideau.appendChild(orange)
    rideau.appendChild(rouge)
    rideau.appendChild(bleu_f)
    rideau.appendChild(vert)
    rideau.appendChild(rose)
    rideau.appendChild(bleu_c)
    rideau.appendChild(jaune)
    rideau.appendChild(violet)

    await sleep(10000)
    
    orange.classList.add("disappear")
    rouge.classList.add("disappear")
    bleu_f.classList.add("disappear")
    vert.classList.add("disappear")
    rose.classList.add("disappear")
    bleu_c.classList.add("disappear")
    jaune.classList.add("disappear")
    violet.classList.add("disappear")

    orange2.classList.add("show")
    rouge2.classList.add("show")
    bleu_f2.classList.add("show")
    vert2.classList.add("show")
    rose2.classList.add("show")
    bleu_c2.classList.add("show")
    jaune2.classList.add("show")
    violet2.classList.add("show")

    await sleep(10000)
    
    orange.classList.add("hide")
    rouge.classList.add("hide")
    bleu_f.classList.add("hide")
    vert.classList.add("hide")
    rose.classList.add("hide")
    bleu_c.classList.add("hide")
    jaune.classList.add("hide")
    violet.classList.add("hide")

    await sleep(2000)
    var rideauChild = rideau.lastChild
    while(rideauChild){
      rideau.removeChild(rideauChild)
      rideauChild = rideau.lastChild
    }

    var video = document.createElement("video")
    video.src = "/assets/rick_roll.mp4"
    video.id = "rr"
    video.style.height = "100%"; video.style.position = 'absolute';video.style.top = "0"; video.style.left = "0" ; 
    video.style.width = "100%";video.style.margin = "auto";

    rideau.appendChild(video)
    video.muted = true;
    video.play()
    video.onplay = function(){video.muted = false};
    video.onclick = function(){video.play()}
    video.onended = this.videoEnd
    
    document.querySelector("#msgfin")!.classList.remove("hide")
  }

  videoEnd(){
    var rideau = document.getElementById("rideau")!
    var video = document.getElementById("rr")!

    rideau.removeChild(video)
    window.location.href = "/"
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.caseW = document.getElementById("grille")?.offsetWidth! / 6
    this.caseH = document.getElementById("grille")?.offsetHeight! / 5
  }
}

const sleep = (ms: number) => new Promise((r)=> setTimeout(r, ms));