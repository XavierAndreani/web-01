// TODO #import-html: use ES default imports to import game.component.html as template
import template from "./game.component.html";


import { Component } from "../../scripts/component";
import { CardComponent } from "./card/card.component";
import "./game.component.css";


import { parseUrl } from "../../scripts/utils";

// TODO #export-functions: remove the IIFE
  let environment = {
    api: {
      host: "http://localhost:8081",
    },
  };

  // TODO #export-functions: export function GameComponent
  // TODO #class: use the ES6 class keyword
  // TODO #extends: extend Component

  export class GameComponent extends Component{
    constructor() {
      super(template)
      // TODO #extends: call super(template)
      // gather parameters from URL
      let params = parseUrl();

      // TODO #import-html: assign template to this.template
      // save player name & game ize
      this._name = params.name;
      this._size = parseInt(params.size) || 9;
      this._flippedCard = null;
      this._matchedPairs = 0;
    }


  // TODO #export-functions: remove this line
  // put component in global scope, to be runnable right from the HTML.

  // TODO #class: turn function into a method of GameComponent
  /* method GameComponent.init */

  async init() {
    // fetch the cards configuration from the server
        // TODO #arrow-function: use arrow function instead.

          this._config = await this.fetchConfig();
          this._boardElement = document.querySelector(".cards");

          // create cards out of the config
          this._cards = [];
          // TODO #functional-programming: use Array.map() instead.
             this._cards = this._config.ids.map(id => new CardComponent(id));
             this._cards.forEach(card => {
                 this._boardElement.appendChild(card.getElement());
                 card.getElement().addEventListener(
                     "click",
                     () => this._flipCard(card)
                 );
             });
          this.start();
  };

  // TODO #class: turn function into a method of GameComponent

  /* method GameComponent._appendCard */

  // TODO #class: turn function into a method of GameComponent
  /* method GameComponent.start */
  start() {
    this._startTime = Date.now();
    let seconds = 0;
    // TODO #template-literals:  use template literals (backquotes)
    document.querySelector("nav .navbar-title").textContent = `Player: ${this._name}. Elapsed time: ${seconds++}`;

    this._timer = setInterval(
        // TODO #arrow-function: use arrow function instead.
        function () {
          // TODO #template-literals:  use template literals (backquotes)
          document.querySelector("nav .navbar-title").textContent =
              `Player: ${this._name}. Elapsed time: ${seconds++}`;
        }.bind(this),
        1000
    );
  };

  // TODO #class: turn function into a method of GameComponent
  /* method GameComponent.fetchConfig */
  async fetchConfig() {
      const response = await fetch(
          `${environment.api.host}/board?size=${this._size}`
      );
      return response.json();
  };

  // TODO #class: turn function into a method of GameComponent
  /* method GameComponent.goToScore */
  goToScore() {
    let timeElapsedInSeconds = Math.floor(
        (Date.now() - this._startTime) / 1000
    );
    clearInterval(this._timer);

    setTimeout(
        // TODO #arrow-function: use arrow function instead.
         ()=> {
          // TODO #spa: replace with './#score'
          let scorePage = "./#score";
          // TODO #template-literals:  use template literals (backquotes)
          window.location =`${scorePage}?name=${this._name}&size=${this._size}&time=${timeElapsedInSeconds}`;
        },
        750
    );
  };

  // TODO #class: turn function into a method of GameComponent
  /* method GameComponent._flipCard */
 _flipCard(card) {
    if (this._busy) {
      return;
    }

    if (card.flipped) {
      return;
    }

    // flip the card
    card.flip();

    // if flipped first card of the pair
    if (!this._flippedCard) {
      // keep this card flipped and wait for the second card of the pair
      this._flippedCard = card;
    } else {
      // second card of the pair flipped...

      // if cards are the same
      if (card.equals(this._flippedCard)) {
        this._flippedCard.matched = true;
        card.matched = true;
        this._matchedPairs += 1;

        // reset flipped card for the next turn.
        this._flippedCard = null;

        if (this._matchedPairs === this._size) {
          this.goToScore();
        }
      } else {
        this._busy = true;

        // cards did not match
        // wait a short amount of time before hiding both cards
        setTimeout(
            // TODO #arrow-function: use arrow function instead.
             () => {
              // hide the cards
              this._flippedCard.flip();
              card.flip();
              this._busy = false;

              // reset flipped card for the next turn.
              this._flippedCard = null;
            },
            500
        );
      }
    }
  }
}
  ;

  // TODO #card-component: Change images location to /app/components/game/card/assets/***.png
  // TODO #import-assets: use ES default import to import images.



  // TODO #class: use the ES6 class keyword
  // TODO #extends: extends Component
  /* class CardComponent constructor */


