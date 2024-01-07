import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {animate,state,style,transition,trigger} from "@angular/animations";
import { CardData } from '../cardData';
@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
  animations: [
    trigger("cardFlip", [
      state(
        "default",
        style({
          transform: "none"
        })
      ),
      state(
        "flipped",
        style({
          transform: "rotateY(180deg)"
        })
      ),
      state(
        "matched",
        style({
          visibility: "false",
          transform: "scale(0.05)",
          opacity: 0
        })
      ),
      transition("default => flipped", [animate("400ms")]),
      transition("flipped => default", [animate("400ms")]),
      transition("* => matched", [animate("400ms")])
    ])
  ]
})
export class GameCardComponent implements OnInit{
  @Input() data!: CardData;

  @Output() cardClicked = new EventEmitter();
  // data: CardData = {
  //   imageId: "pDGNBK9A0sk",
  //   state: "default"
  // };

  constructor() {}

  ngOnInit():void {}

  // cardClicked() {
  //   if (this.data.state === "default") {
  //     this.data.state = "flipped";
  //   } else {
  //     this.data.state = "default";
  //   }
  // }
}
