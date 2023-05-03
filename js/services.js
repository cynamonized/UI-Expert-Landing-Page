import { setTimeout } from "timers/promises";

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
      element.addEventListener("click", (e) => {
        e.preventDefault();

        let elementHeight = e.currentTarget.offsetHeight;

        // POLISH IT !!!!!!!!!!!
        document.documentElement.style.setProperty(
          "--myHeight",
          elementHeight + "px"
        );

        console.log(elementHeight);

        //////////////////////////////////////////////////////
        // DELETE GOBIG2
        /////////////////////////////////////////////////////

        // COMMENT BELOW 2 LINES FOR goBig2
        element.style.left = `${element.offsetLeft}px`;
        element.style.top = `${element.offsetTop}px`;

        const hiddenClone = element.cloneNode(true);

        // element.style.height = `${elementHeight + 200}px`;
        // console.log(hiddenClone);

        this.blocksWrapper.insertBefore(hiddenClone, element);
        hiddenClone.classList.add("blocks__hidden-clone");

        element.style.position = "absolute";

        element.classList.add("blocks__active-block");

        // GO BIG 2 ONLY
        // const parentWidth = this.blocksWrapper.offsetWidth;
        // const parentHeight = this.blocksWrapper.offsetHeight;

        // element.style.width = `${parentWidth}px`;
        // element.style.height = `${parentHeight}px`;
        /////////////////
      });
    });
  }
}

export { Picker };
