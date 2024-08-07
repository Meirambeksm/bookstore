import "../sass/styles.scss";
import carousel from "./carousel.js";
import card from "./card.js";
import cart from "./cart.js";

carousel.carouselEventListeners();
card.cardEventListeners();
cart.cartEventListeners();
carousel.changeBanner();
card.renderPage();
