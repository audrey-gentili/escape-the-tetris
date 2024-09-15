import { Component, OnInit, ViewChild, Renderer2, Input, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { AxesHelper, Scene } from 'three';

var loader = new FBXLoader()


@Component({
  selector: 'piece3D',
  templateUrl: './piece3D.component.html',
  styleUrls: ['./piece3D.component.scss']
})

export class Piece3dComponent implements OnInit{
  @ViewChild("myCanvas") myCanvas:any;
  @ViewChild('textContainer',{static:true}) textContainer: ElementRef;

  @Input()
  fName:string;
  @Input()
  distance: number;
  @Input()
  taille: number
  @Input()
  rotationAngle: number
  @Input()
  id: string
  text: string = ""
  @Input()
  cameraType: number = 0
  private scene: Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: any;
  

  ngOnInit(): void {
    //add listener for the resize of the window - will resize the renderer to fit the window
    //let global = this.render.listen('window', 'resize', (evt) => {
    //  this.onWindowResize();
    //})
    if(this.id == "rules"){
      this.text = "Les règles sont simples. Tu es coincé.e à l’intérieur du jeu Tetris. Ton but est de récolter les 8 pièces emblématiques du Tetris en résolvant diverses énigmes à travers des salles.<br/>"
      + "Les énigmes se résolvent grâce à des clics, des puzzles ou autres interactions que nous te laisserons découvrir.<br/>"
      + "Que le jeu commence ! ";
    }
    else if(this.id == "welcome"){
      this.text = "Bienvenue sur Escape the Tetris ! Un jeu casse-tête sur le thème du célèbre Tetris.<br/>"
      + "Ton but ? Finir le jeu afin de récupérer les 8 pièces emblématiques de Tetris. Voyage avec nous à travers les époques et les évolutions du jeu et d’internet.<br/>"
      + "Traverse les couloirs, résous les énigmes, et trouve ton trésor !";
    }
    else if(this.id == "team"){
      this.text = "Ce jeu a été créé par des étudiants en Master 2 Conception et Intégration Multimédia.<br/>"
      + "Développement : Audrey Gentili et Mehdi Bouazabia<br/>"
      + "Direction artistique et graphisme :  Carla Reyes, Clara Giacri et Amaël Lacroix-Magnien"
    }
    this.textContainer.nativeElement.innerHTML = this.text
  
  }

  ngAfterViewInit(): void {
    this.init3D();
  }
  constructor(private render: Renderer2){

  }
  init3D(){
    // renderer
    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas:  this.myCanvas.nativeElement});
    this.renderer.setSize( this.taille, this.taille );

    // scene
    this.scene = new THREE.Scene();
    this.scene.background = null

    // camera
    this.camera = new THREE.PerspectiveCamera( 120, 1, 0.01, 10000 );
    this.camera.position.set( 0, this.distance, 0 );
    this.camera.aspect = this.taille / this.taille;
    this.scene.add( new THREE.AmbientLight( 0x2c2c2c ) );
    this.scene.add( this.camera ); // required, because we are adding a light as a child of the camera

    // controls
    if(this.id != undefined){
      this.controls = new OrbitControls(this.camera,this.renderer.domElement);
    }
    // lights
    var light = this.cameraType == 1 ? new THREE.SpotLight( 0xffffff, 1 ) : new THREE.AmbientLight( 0xffffff, 0.8 );
    this.camera.add( light );

    loader.load('./assets/3D/'+this.fName+'.fbx',  
      (object) => {
        this.scene.add(object)
      })

    //request animation
    this.animate();

  }

  /**
   * render the scene and request the window animation frame
   */
  animate() {

    this.camera.lookAt( this.scene.position );

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(_ => {
      this.scene.rotateY(this.rotationAngle)
      //this.scene.rotateOnAxis(new THREE.Vector3(0, 1, 0), this.rotationAngle)
      this.animate()
    });
  }
}
