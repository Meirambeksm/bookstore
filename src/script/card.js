import cart from "./cart";

class Card {
  constructor() {
    this.cards = document.querySelector(".cards");
    this.key = "AIzaSyCXUDV1ibZFH-hMDIJj96IArJdfOmcfqx8";
    this.genre = "Architecture";
    this.startIndex = 0;
    this.loadBtn = document.querySelector(".load-btn");
    this.sidebarButtons = document.querySelectorAll(".sidebar-item");
  }

  cardEventListeners() {
    this.loadBtn.addEventListener("click", () => this.addCard());
    this.sidebarButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        this.sidebarButtons.forEach((button) =>
          button.classList.remove("active")
        );
        button.classList.add("active");

        this.genre = button.textContent;
        this.startIndex = 0;
        this.cards.innerHTML = "";

        const data = await this.fetchBooks();
        data.forEach((book) => this.createCard(book));
      });
    });
  }

  async renderPage() {
    const data = await this.fetchBooks();
    data.forEach((book) => {
      this.createCard(book);
      cart.shoppingLabel.textContent = cart.purchasedBooks.length;
      cart.updateCart(cart.shoppingLabel.textContent);
    });
  }

  async addCard() {
    this.startIndex += 6;
    const data = await this.fetchBooks();
    data.forEach((book) => this.createCard(book));
  }

  async fetchBooks() {
    const url = `https://www.googleapis.com/books/v1/volumes?q="subject:${this.genre}"&key=${this.key}&printType=books&startIndex=${this.startIndex}&maxResults=6&langRestrict=en`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      return await data.items;
    } catch {
      console.log("There was an error loading data...");
    }
  }

  createCard(item) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const poster = document.createElement("div");
    poster.setAttribute("class", "card-poster");
    const image = document.createElement("img");
    image.setAttribute("class", "card-poster-img");
    image.setAttribute("src", `${item?.volumeInfo?.imageLinks?.thumbnail}`);
    image.setAttribute("alt", "poster");
    const cardInfo = document.createElement("div");
    cardInfo.setAttribute("class", "card-info");
    const author = document.createElement("span");
    author.setAttribute("class", "card-author");
    author.textContent =
      item?.volumeInfo?.authors?.length === 1
        ? item?.volumeInfo?.authors[0]
        : item?.volumeInfo?.authors?.join(", ");
    const name = document.createElement("span");
    name.setAttribute("class", "card-name");
    name.textContent = item.volumeInfo.title;
    const rating = document.createElement("div");
    rating.innerHTML = `${
      item?.volumeInfo?.averageRating
        ? this.handleRating(item?.volumeInfo?.averageRating)
        : ""
    }`;
    const review = document.createElement("span");
    review.setAttribute("class", "card-review");
    review.textContent = item?.volumeInfo?.ratingCount
      ? item?.volumeInfo?.ratingCount
      : "";
    const description = document.createElement("p");
    description.setAttribute("class", "card-description");
    description.textContent = item.volumeInfo.description;
    const price = document.createElement("span");
    price.setAttribute("class", "card-price");
    price.textContent = item.saleInfo.retailPrice
      ? `${item.saleInfo?.retailPrice?.amount} ${item.saleInfo?.retailPrice?.currencyCode}`
      : "";
    const button = document.createElement("button");
    button.setAttribute("class", "card-btn");
    button.textContent = "buy now";
    button.addEventListener("click", () => cart.addPurchasedBooks(button));

    poster.appendChild(image);
    cardInfo.appendChild(author);
    cardInfo.appendChild(name);
    cardInfo.appendChild(rating);
    cardInfo.appendChild(description);
    cardInfo.appendChild(price);
    cardInfo.appendChild(button);
    card.appendChild(poster);
    card.appendChild(cardInfo);
    this.cards.appendChild(card);
  }

  handleRating(rating) {
    let stars = "";
    const starFull = '<img src="./assets/star-full.svg" alt="star">';
    const starEmpty = '<img src="./assets/star-empty.svg" alt="star">';

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars += starFull;
      } else {
        stars += starEmpty;
      }
    }
    return stars;
  }
}

const card = new Card();
export default card;
