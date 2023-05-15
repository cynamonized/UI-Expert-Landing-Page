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
    const windowWidth = window.innerWidth;
    console.log(windowWidth);

    if (windowWidth > 870) {
      this.openingDesktop(e);
    } else {
      console.log("I am not working now, sorry");
      this.openingMobile(e);
    }
  };

  openingMobile = (e) => {
    this.blocksArray.forEach((element) => {
      if (element === e.currentTarget) {
        console.log("Displaying this little shit");
        console.log("This is element", element);
        console.log("This is current targt", e.currentTarget);

        // TO BE FINISHED
        // if element = current target,
        // then don't hide it
        // if (element !=== e.currentTarget){
        //   element.display = "none";
        // }
      }
    });
  };

  openingDesktop = (e) => {
    console.log("Opening");
    e.stopImmediatePropagation();
    e.preventDefault();

    const exitButton = e.currentTarget.querySelector(".single-block__exit");
    const readMoreButton = e.currentTarget.querySelector(".btn-single-block");
    readMoreButton.classList.add("btn-single-block--disabled");
    setTimeout(() => {
      readMoreButton.parentElement.classList.add("btn-single-block--removed");
    }, 500);
    exitButton.classList.remove("single-block__exit--disabled");
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

    const longDescription = e.currentTarget.querySelector(".description-long");
    longDescription.style.opacity = "0";
    setTimeout(() => {
      longDescription.classList.remove("description--disabled");
      longDescription.style.opacity = "1";
    }, 500);
  };

  closingPopUp = (e) => {
    this.closingDesktop(e);
  };

  closingDesktop = (e) => {
    console.log("Closing");

    e.currentTarget.parentElement.classList.add("blocks__closing");

    const parent = e.currentTarget.parentElement;
    const child = e.currentTarget;
    const readMoreButton = parent.querySelector(".btn-single-block");
    readMoreButton.parentElement.classList.remove("btn-single-block--removed");

    const longDescription = parent.querySelector(".description-long");
    longDescription.style.opacity = "0";

    child.classList.add("single-block__exit--disabled");
    child.removeEventListener("click", this.closingPopUp);
    setTimeout(() => {
      parent.classList.remove("blocks__active-block");
      readMoreButton.classList.remove("btn-single-block--disabled");

      parent.removeAttribute("style");
      const placeholderClone = this.mainContainer.querySelector(
        ".blocks__hidden-clone"
      );
      placeholderClone.parentElement.removeChild(placeholderClone);
      longDescription.classList.add("description--disabled");
      longDescription.removeAttribute("style");
    }, 1000);

    setTimeout(() => parent.addEventListener("click", this.openingPopUp), 500);
  };
}

export { Picker };
