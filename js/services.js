class Picker {
  constructor(servicesBlock) {
    this.block = servicesBlock;
    this.mainContainer = document.querySelector(this.block);
    this.blocksWrapper;
    this.blocksArray = [];
    this.pickDOMElements();
    this.addInteractions();
  }

  pickDOMElements() {
    this.blocksWrapper = this.mainContainer.querySelector(".blocks__wrapper");
    this.blocksArray = this.blocksWrapper.querySelectorAll(
      ".blocks__single-block"
    );
  }

  addInteractions() {
    this.blocksArray.forEach((element, i) => {
      element.addEventListener("click", this.openingPopUp);
    });
  }

  openingPopUp = (e) => {
    console.log("Opening");
    e.stopImmediatePropagation();
    e.preventDefault();

    e.currentTarget.classList.remove("blocks__closing");

    let elementHeight = e.currentTarget.offsetHeight;

    document.documentElement.style.setProperty(
      "--myHeight",
      elementHeight + "px"
    );

    e.currentTarget.style.left = `${e.currentTarget.offsetLeft}px`;
    e.currentTarget.style.top = `${e.currentTarget.offsetTop}px`;

    const hiddenClone = e.currentTarget.cloneNode(true);

    this.blocksWrapper.insertBefore(hiddenClone, e.currentTarget);
    hiddenClone.classList.add("blocks__hidden-clone");

    e.currentTarget.style.position = "absolute";

    e.currentTarget.classList.add("blocks__active-block");

    const xButton = e.currentTarget.querySelector(".single-block__exit");
    xButton.addEventListener("click", this.closingPopUp);

    e.currentTarget.removeEventListener("click", this.openingPopUp);
  };

  closingPopUp = (e) => {
    console.log(e.currentTarget.parentElement);

    e.currentTarget.parentElement.classList.remove("blocks__active-block");
    e.currentTarget.parentElement.classList.add("blocks__closing");
    e.currentTarget.removeEventListener("click", this.closingPopUp);
    e.currentTarget.parentElement.removeAttribute("style");

    const placeholderClone = this.mainContainer.querySelector(
      ".blocks__hidden-clone"
    );
    placeholderClone.style.backgroundColor = "red";
    placeholderClone.style.zIndex = "50";
    console.log(placeholderClone);
    placeholderClone.parentElement.removeChild(placeholderClone);

    const parent = e.currentTarget.parentElement;

    setTimeout(() => parent.addEventListener("click", this.openingPopUp), 500);
  };
}

export { Picker };
