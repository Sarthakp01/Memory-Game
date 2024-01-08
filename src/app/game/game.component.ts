import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardData } from '../cardData';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  title = 'MemoryGame';
  cardImages = ['dog', 'cat', 'sheep'];

  cards: CardData[] = [];
  flippedCards: CardData[] = [];
  matchedCount = 0;

  totalClicks = 0;
  moves = 0;
  misses = 0;

  level = 1;
  rotateTime = 1000; // Initial rotation time in milliseconds

  ngOnInit(): void {
    this.loadGameState();
    this.setupCards();
    this.loadFlippedCards(); // Load flipped cards for continued game
  }

  ngOnDestroy(): void {
    this.saveGameState();
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

  saveGameState(): void {
    localStorage.setItem('gameState', JSON.stringify({
      level: this.level,
      rotateTime: this.rotateTime,
      cards: this.cards,
      totalClicks: this.totalClicks,
      moves: this.moves,
      misses: this.misses,
      matchedCount: this.matchedCount,
      flippedCards: this.flippedCards
    }));
  }

  loadGameState(): void {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      const gameState = JSON.parse(savedState);
      this.level = gameState.level;
      this.rotateTime = gameState.rotateTime;
      this.cards = gameState.cards;
      this.totalClicks = gameState.totalClicks;
      this.moves = gameState.moves;
      this.misses = gameState.misses;
      this.matchedCount = gameState.matchedCount;
      this.flippedCards = gameState.flippedCards || [];
    }
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
