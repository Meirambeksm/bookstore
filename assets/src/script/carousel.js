class Carousel {
  constructor() {
    this.buttons = document.querySelectorAll(".carousel-btn");
    this.image = document.querySelector(".carousel-banner");
    this.index = 1;
  }

  carouselEventListeners() {
    this.buttons.forEach((button, i) =>
      button.addEventListener("click", () => {
        this.image.src = `./assets/banner${i + 1}.png`;
        this.updateButtonColor(i);
        this.index = i + 1;
      })
    );
  }

  changeBanner() {
    setInterval(() => {
      this.image.src = `./assets/banner${this.index}.png`;
      this.updateButtonColor(this.index - 1);
      this.index++;
      if (this.index > 3) this.index = 1;
    }, 5000);
  }

  updateButtonColor(activeIndex) {
    this.buttons.forEach((button, i) => {
      button.style.backgroundColor = i === activeIndex ? "#4c3db2" : "#eeedf5";
    });
  }
}

const carousel = new Carousel();
export default carousel;
