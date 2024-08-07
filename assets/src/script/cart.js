import card from "./card";

class Cart {
  constructor() {
    this.shoppingLabel = document.querySelector(".label");
    this.cart = document.querySelector(".cart");
    this.purchasedBooks =
      JSON.parse(localStorage.getItem("purchasedBooks")) || [];
  }

  cartEventListeners() {
    this.cart.addEventListener("click", () => this.reset());
  }

  addPurchasedBooks(button) {
    const element = button.parentNode;
    const purchasedBook = {
      id: button.id,
      author: element.querySelector(".card-author").textContent,
      title: element.querySelector(".card-name").textContent,
      rating: element.querySelector(".card-review")?.textContent,
      description: element.querySelector(".card-description").textContent,
      price: element.querySelector(".card-price").textContent,
    };

    if (button.textContent === "in the cart") {
      button.textContent = "buy now";
      button.classList.remove("card-btn-purchased");
      button.classList.add("card-btn");
      this.purchasedBooks = this.purchasedBooks.filter(
        (book) => book.id !== button.id
      );
    } else {
      button.textContent = "in the cart";
      button.classList.remove("card-btn");
      button.classList.add("card-btn-purchased");
      this.purchasedBooks.push(purchasedBook);
    }

    localStorage.setItem("purchasedBooks", JSON.stringify(this.purchasedBooks));
    this.shoppingLabel.textContent = this.purchasedBooks.length;
    this.updateCart(this.shoppingLabel.textContent);
    console.log(this.purchasedBooks);
  }

  updateCart(books) {
    if (books > 0) {
      this.shoppingLabel.style.display = "flex";
    } else {
      this.shoppingLabel.style.display = "none";
    }
  }

  reset() {
    localStorage.clear("purchasedBooks");
    this.purchasedBooks = [];
    this.shoppingLabel.textContent = 0;
    card.genre = "Architecture";
    card.startIndex = 0;
    card.cards.innerHTML = "";
    card.sidebarButtons.forEach((button) => button.classList.remove("active"));
    card.sidebarButtons[0].classList.add("active");
    card.renderPage();
  }
}

const cart = new Cart();
export default cart;
