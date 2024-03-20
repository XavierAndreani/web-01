// TODO #import-router: use ES named imports to import the router
import { Router } from "./app/scripts/router/router";
import { WelcomeComponent } from "./app/components/welcome/welcome.component";
import { GameComponent } from "./app/components/game/game.component";
import { ScoreComponent } from "./app/components/score/score.component";
import { NavbarComponent } from "./app/components/navbar/navbar.component";
customElements.define("my-navbar", NavbarComponent);
import { FooterComponent } from "./app/components/footer/footer.component";
customElements.define("my-footer", FooterComponent);

import "/node_modules/bootstrap/dist/css/bootstrap.css";
import "./app/styles/style.css";


const outlet = document.querySelector("#content-outlet");
const router = new Router(outlet);

// TODO #import-components: use ES named imports to import WelcomeComponent, GameComponent a ScoreComponent
// TODO #import-css: use ES side-effect imports to import styles/style.css
router
    .register("", {
        component: WelcomeComponent,
        // TODO #import-html: remove the templateUrl property.
    })
  .register("welcome", {
    component: WelcomeComponent,
    // TODO #import-html: remove the templateUrl property.
  })
  .register("game", {
    component: GameComponent,
    // TODO #import-html: remove the templateUrl property.
  })
  .register("score", {
    component: ScoreComponent,
    // TODO #import-html: remove the templateUrl property.
  });
