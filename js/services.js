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
      console.log("Desktop version detected");
      this.openingDesktop(e);
    } else {
      console.log("Mobile version detected");
      this.openingMobile(e);
    }
  };

  openingMobile = (e) => {
    e.stopImmediatePropagation();
    e.preventDefault();

    // BEGINNING IS DIFFERENT SO
    // it will just appear in the method above in ELSE contition
    this.blocksArray.forEach((element) => {
      if (element != e.currentTarget) {
        element.style.display = "none";
      }
      if (element == e.currentTarget) {
        element.style.width = "100%";
        // morphingBlockOpen(e);

        // CHECK WHAT IS REPEATABLE TO PACK IT in morphicBlockOpen(e)
        const exitButton = e.currentTarget.querySelector(".single-block__exit");
        const readMoreButton =
          e.currentTarget.querySelector(".btn-single-block");
        readMoreButton.classList.add("btn-single-block--disabled");
        const timeoutIDreadMore = setTimeout(() => {
          readMoreButton.parentElement.classList.add(
            "btn-single-block--removed"
          );
          clearTimeout(timeoutIDreadMore);
        }, 500);
        exitButton.classList.remove("single-block__exit--disabled");
        const xButton = e.currentTarget.querySelector(".single-block__exit");
        xButton.addEventListener("click", this.closingPopUp);
        e.currentTarget.removeEventListener("click", this.openingPopUp);
        e.currentTarget.classList.remove("blocks__closing");
        // until then it's the same

        // there is a piece that's the same again
        const longDescription =
          e.currentTarget.querySelector(".description-long");
        longDescription.style.opacity = "0";
        const timeoutIDlongdescription = setTimeout(() => {
          longDescription.classList.remove("description--disabled");
          longDescription.style.opacity = "1";
          clearTimeout(timeoutIDlongdescription);
        }, 500);
      }
    });
  };

  openingDesktop = (e) => {
    console.log("Openingg");
    e.stopImmediatePropagation();
    e.preventDefault();

    const exitButton = e.currentTarget.querySelector(".single-block__exit");
    const readMoreButton = e.currentTarget.querySelector(".btn-single-block");
    readMoreButton.classList.add("btn-single-block--disabled");
    const timeoutIDreadMore = setTimeout(() => {
      readMoreButton.parentElement.classList.add("btn-single-block--removed");
      clearTimeout(timeoutIDreadMore);
    }, 500);
    exitButton.classList.remove("single-block__exit--disabled");
    const xButton = e.currentTarget.querySelector(".single-block__exit");
    xButton.addEventListener("click", this.closingPopUp);
    e.currentTarget.removeEventListener("click", this.openingPopUp);

    e.currentTarget.classList.remove("blocks__closing");
    // until then it's the same

    // DESKTOP ONLY BEGINS
    // ADD window.width condition to below code
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
    // DESKTOP ONLY ENDS

    const longDescription = e.currentTarget.querySelector(".description-long");
    longDescription.style.opacity = "0";
    const timeoutIDlongdescription = setTimeout(() => {
      longDescription.classList.remove("description--disabled");
      longDescription.style.opacity = "1";
      clearTimeout(timeoutIDlongdescription);
    }, 500);
  };

  morphingBlockOpen = (e) => {};

  closingPopUp = (e) => {
    // this.closingDesktop(e);

    const windowWidth = window.innerWidth;
    console.log(windowWidth);

    if (windowWidth > 870) {
      console.log("Desktop version detected");
      this.closingDesktop(e);
    } else {
      console.log("Mobile version detected");
      this.closingMobile(e);
    }
  };

  closingDesktop = (e) => {
    console.log("Closing");
    // TO BE CHECK IF IT"S THE SAME TOO
    e.currentTarget.parentElement.classList.add("blocks__closing");

    const parent = e.currentTarget.parentElement;
    const child = e.currentTarget;
    const readMoreButton = parent.querySelector(".btn-single-block");
    readMoreButton.parentElement.classList.remove("btn-single-block--removed");

    const longDescription = parent.querySelector(".description-long");
    longDescription.style.opacity = "0";

    child.classList.add("single-block__exit--disabled");
    child.removeEventListener("click", this.closingPopUp);
    const timeoutIDcloseBlock = setTimeout(() => {
      parent.classList.remove("blocks__active-block");
      readMoreButton.classList.remove("btn-single-block--disabled");

      parent.removeAttribute("style");

      //Desktop only part
      const placeholderClone = this.mainContainer.querySelector(
        ".blocks__hidden-clone"
      );
      placeholderClone.parentElement.removeChild(placeholderClone);
      //

      longDescription.classList.add("description--disabled");
      longDescription.removeAttribute("style");
      clearTimeout(timeoutIDcloseBlock);
    }, 1000);
    const timeoutIDevent = setTimeout(() => {
      parent.addEventListener("click", this.openingPopUp);
      clearTimeout(timeoutIDevent);
    }, 500);
  };

  closingMobile = (e) => {
    e.stopImmediatePropagation();
    e.preventDefault();
    // TO BE CHECK IF IT"S THE SAME TOO

    // e.currentTarget.parentElement.classList.add("blocks__closing");

    // same commet as opening (about forEach part)
    const timeoutIDblocksBack = setTimeout(() => {
      this.blocksArray.forEach((element) => {
        element.removeAttribute("style");
        clearTimeout(timeoutIDblocksBack);
      });
    }, 10);

    // the same content, just different order of the code rows
    const parent = e.currentTarget.parentElement;
    const child = e.currentTarget;
    const readMoreButton = parent.querySelector(".btn-single-block");
    const longDescription = parent.querySelector(".description-long");
    longDescription.style.opacity = "0";

    // Below is here (not in below timeout, because it cause blocks to
    // be very long when hiding this text so it needs to be immediate?)
    // OR SHOW OTHER BLOCKS WHEN EVERYTING IS HIDDEN (LONG DESCR)
    longDescription.classList.add("description--disabled");
    longDescription.removeAttribute("style");
    //

    readMoreButton.parentElement.classList.remove("btn-single-block--removed");

    child.classList.add("single-block__exit--disabled");
    child.removeEventListener("click", this.closingPopUp);
    const timeoutIDcloseBlock = setTimeout(() => {
      parent.classList.remove("blocks__active-block");
      readMoreButton.classList.remove("btn-single-block--disabled");
      parent.removeAttribute("style");
      parent.addEventListener("click", this.openingPopUp);
      clearTimeout(timeoutIDcloseBlock);
    }, 300);

    // why double it in timeout above???
    setTimeout(() => parent.addEventListener("click", this.openingPopUp), 200);
  };

  morphingBlockClosed = (e) => {};
}

export { Picker };
