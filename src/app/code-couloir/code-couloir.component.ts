import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SallesDebloqueesService } from '../salles-debloquees.service';

@Component({
  selector: 'app-code-couloir',
  templateUrl: './code-couloir.component.html',
  styleUrls: ['./code-couloir.component.scss']
})
export class CodeCouloirComponent implements OnInit{
  @Input()
  codePassage: number
  @Input()
  nextRoom: string
  @Input()
  id:string
  codeTape: number

  constructor(private router:Router, private accesSalles: SallesDebloqueesService){}

  ngOnInit(){
    if(this.codePassage == undefined){
      this.codePassage = 111111
    }

    if(this.nextRoom == undefined){
      this.nextRoom = "/"
    }
  }

  addChiffre(chiffre:number){
    let temp
    if(this.codeTape == undefined){
      temp = chiffre
    }else{
      temp = this.codeTape * 10 + chiffre
    }

    this.codeTape = temp % (Math.pow(10, this.codePassage.toString().length))
  }

  codeTapeChanged(){
    this.codeTape = this.codeTape % (Math.pow(10, this.codePassage.toString().length))
  }

  annulerClick(){
    if(this.codeTape == undefined || this.codeTape == 0){
      document.getElementById(this.id)?.classList.add("hide")
    }
    this.codeTape = 0
  }

  validerClick(){
    if(this.codeTape == this.codePassage){
      if(this.nextRoom == "/room3"){
        this.accesSalles.salle3 = true
        localStorage.setItem("salle3","true")
      }else{
        this.accesSalles.salleFinale = true
        localStorage.setItem("salleFinale","true")
      }

      this.router.navigateByUrl(this.nextRoom)
    }
    else{
      this.annulerClick()
    }
  }

  onKeyClick(event: KeyboardEvent){
    if(event.key === "Enter"){
      console.log("entrer")
      this.validerClick()
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key === "Enter"){
      this.validerClick()
    }
    if(event.key === "Escape"){
      this.annulerClick()
    }
    if(event.key === "0" || event.key === "1" || event.key === "2" || event.key === "3" || event.key === "4" ||
        event.key === "5" || event.key === "6" || event.key === "7" || event.key === "8" || event.key === "9" ){
      this.addChiffre(Number(event.key))
    }
    if(event.key === "Backspace"){
      this.codeTape = Math.floor(this.codeTape /10) ;
    }

  }
}
