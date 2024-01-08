import { Component } from '@angular/core';
import { CardData } from '../cardData';

@Component({
  selector: 'app-game12',
  templateUrl: './game12.component.html',
  styleUrl: './game12.component.scss'
})
export class Game12Component {
  title = 'MemoryGame';
  cardImages = [
  
    'dog',
    'cat',
    'sheep',
    'fish',
    'snake',
    'monkey'
  ];
  cards: CardData[] = [];
  flippedCards: CardData[] = [];
  matchedCount = 0;

  totalClicks = 0;
  moves = 0;
  misses = 0;

  level = 1;
  rotateTime = 1000;

  ngOnInit(): void {
    this.setupCards();
    this.loadFlippedCards(); 
  }

  setupCards(): void {
    this.cards = [];
    this.cardImages.forEach((image) => {
      const cardData: CardData = {
        imageId: image,
        state: 'default'
      };

      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });
    });

    this.cards = this.shuffleArray(this.cards);
  }

  shuffleArray(cards: CardData[]): CardData[] {
    let currentIndex = cards.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
    }

    return cards;
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length === 2) {
        this.checkForCardMatch();
      }

      this.moves++;
      this.totalClicks++;
    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();
      this.misses++;
    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const [cardOne, cardTwo] = this.flippedCards;
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;
      }
    }, this.rotateTime);
  }

  replay(): void {
    this.level = 1;
    this.matchedCount = 0;
    this.moves = 0;
    this.misses = 0;
    this.totalClicks = 0;
    this.setupCards();
  }

  continue(): void {
    this.level++;
    this.rotateTime = this.rotateTime > 200 ? this.rotateTime - 100 : 200; // Decrease rotation time up to a minimum of 200ms
    this.matchedCount = 0;
    this.moves = 0;
    this.misses = 0;
    this.totalClicks = 0;
    this.setupCards();
  }

  restart(): void {
    this.level = 1;
    this.matchedCount = 0;
    this.moves = 0;
    this.misses = 0;
    this.totalClicks = 0;
    this.setupCards();
  }

  loadFlippedCards(): void {
    this.flippedCards.forEach(({ imageId }) => {
      const cardIndex = this.cards.findIndex(card => card.imageId === imageId);
      if (cardIndex !== -1) {
        this.cards[cardIndex].state = 'flipped';
      }
    });
  }
}
