import { commentObjectsArray } from "./comments";

class Slider {
  constructor(container, commentsArray) {
    this.commentIndex = 0;
    this.firstMainMoved = 0;
    this.name = container;
    this.commentObjectsArray = commentsArray;
    this.allHeadshots = [];
    this.sliderContainer = document.querySelector(this.name);

    // All DOM Elements Slider uses
    this.allCommentsContainer;
    this.currentMainParent;
    this.commentRating;
    this.commentName;
    this.commentPosition;
    this.commentText;
    this.commentDOMObjects;
    this.firstMain;
    this.naviContainer;
    this.prevButton;
    this.nextButton;

    this.getDOMElements();
  }

  //////////////////////////////////////////////////////////////////////
  // METHODS DEFINITION
  /////////////////////////////////////////////////////////////////////

  // METHOd that fills above constructor parts (DOM elements)
  getDOMElements() {
    // PICKING UP blurred headshots container (&main comment)
    this.allCommentsContainer = this.sliderContainer.querySelector(
      ".about-us__comment-avatars"
    );

    // PICKING UP blurred headshots
    this.getHeadshots();

    // ADDING movement to blurred headshots
    this.allHeadshots.forEach((element) => {
      this.randomPostInterval(element);
    });

    // PICKING UP main comment container
    this.currentMainParent = this.allCommentsContainer.querySelector(
      ".main-comment__image-container"
    );

    // PICKING UP Main comment DOM elements with texts
    this.commentRating = this.sliderContainer.querySelector(
      ".main-comment__rating"
    );
    this.commentName = this.sliderContainer.querySelector(
      ".main-comment__name"
    );
    this.commentPosition = this.sliderContainer.querySelector(
      ".main-comment__position"
    );
    this.commentText = this.sliderContainer.querySelector(
      ".main-comment__text"
    );

    this.commentDOMObjects = [
      this.commentName,
      this.commentPosition,
      this.commentText,
      this.commentRating,
    ];

    // Initialize 1st main comment
    this.exchangeComment(0);

    // PICKING UP First Main Comment
    this.firstMain = this.sliderContainer.querySelector(".main-comment__image");

    // Picking up <> Navi
    this.naviContainer = this.sliderContainer.querySelector(
      ".main-comment__navi"
    );
    this.prevButton = this.naviContainer.querySelector(".navi__button--prev");
    this.nextButton = this.naviContainer.querySelector(".navi__button--next");

    // Initialize interactivity
    this.addInteractivity();

    // Add moving to the first main, it has movement
    // fr the beginning, it just misses pos: abs to do it effectively
    this.randomPostInterval(this.firstMain);
  }

  // METHOD that picks up every blurred headshot
  getHeadshots = () => {
    this.allHeadshots = document.querySelectorAll(".headshot");
  };

  generateYPosJs = (spread) => {
    const randomNumber = Math.random() * 100;
    let randomTop = Math.random() * spread;

    if (randomNumber < 50) {
      randomTop = 0 + randomNumber;
      return randomTop + "px";
    } else {
      randomTop = 100 + randomNumber;
      return randomTop + "px";
    }
  };

  // METHOD that generates random Y postion for headshots
  randomPostInterval(element) {
    const randomDelay = Math.random() * 3;
    element.style.transition = `${randomDelay} cubic-bezier(0.62, 0.32, 0, 0.9)`;
    element.style.transitionDelay = `${randomDelay}s`;
    element.style.top = this.generateYPosJs(100);

    const moveInterval = setInterval(() => {
      element.style.top = this.generateYPosJs(100);
    }, 6000);
  }

  // METHOD that applies recent comment to the DOM elements
  exchangeComment(commentNumber) {
    const commentAbstractArray = [
      this.commentObjectsArray[commentNumber].name,
      this.commentObjectsArray[commentNumber].jobTitle,
      this.commentObjectsArray[commentNumber].commentText,
      this.commentObjectsArray[commentNumber].rating,
    ];

    this.commentDOMObjects.forEach((element, i) => {
      element.innerText = commentAbstractArray[i];
    });
  }

  // METHOD that moves selected item in an array to the front of the array
  reshuffleCommentsArray = (inputIndex = this.commentIndex) => {
    // Place new main comment in front of the array
    this.commentObjectsArray.unshift(this.commentObjectsArray[inputIndex]);
    inputIndex++;
    this.commentObjectsArray.splice(inputIndex, 1);

    // Place old main comment in the PREVIOUS place of new main comment in the array
    this.commentObjectsArray.splice(inputIndex, 0, this.commentObjectsArray[1]);
    this.commentObjectsArray.splice(1, 1);
  };

  // METHOD that moves chosen blurred headshot to main section in DOM
  // & moves old main headshot to newly chosen headshot
  changingHeadshot = (chosenHeadshot) => {
    chosenHeadshot.style.filter = "blur(0px)";
    const currentMain = this.currentMainParent.querySelector(
      ".main-comment__image"
    );
    currentMain.style.filter = "blur(8px)";
    currentMain.classList.remove(`main-comment__image`);
    this.allCommentsContainer.insertBefore(currentMain, chosenHeadshot);

    this.currentMainParent.appendChild(chosenHeadshot);
    currentMain.classList = chosenHeadshot.classList;
    chosenHeadshot.classList = "";
    chosenHeadshot.classList.add(`main-comment__image`);
    chosenHeadshot.removeEventListener("click", this.clickBluured);
    currentMain.addEventListener("click", this.clickBluured);
    this.getHeadshots();
  };

  firstMainMovement = (firstMain) => {
    this.randomPostInterval(firstMain);
  };

  // METHOD that ads interactivity to headshots
  clickBluured = (e) => {
    // picking up which comment was chosen - based on his class
    const blurredClasses = e.currentTarget.classList;
    let whichComment = Number(
      blurredClasses[blurredClasses.length - 1].slice(-1)
    );
    this.commentIndex = whichComment - 1; // so navi knows which comment is main now

    if (whichComment == 0) {
      whichComment = blurredClasses[blurredClasses.length - 1].slice(-2);
    }

    // apply the comment change
    this.exchangeComment(whichComment);
    this.reshuffleCommentsArray(whichComment);
    this.changingHeadshot(e.currentTarget);
  };

  // METHOD that adds clickability to headshots and <> Navi
  addInteractivity = () => {
    // ADDING CLICKING ON HEADSHOTS
    this.allHeadshots.forEach((element, i) => {
      // SOLVE ADDING IMAGES PATHS FROM AN ARRAY - SEEMS TO BE PARCEL ISSUE
      // element.src = `${commentObjectsArray[i].imagePath}`;
      // element.src = require(`${commentObjectsArray[i].imagePath}`);
      element.addEventListener("click", this.clickBluured);
    });

    // ADDING NAVIGATIONS <>
    this.prevButton.addEventListener("click", (e) => {
      if (this.commentIndex >= 1) {
        this.commentIndex--;
      } else {
        this.commentIndex = 9;
      }

      this.exchangeComment(this.commentIndex + 1);
      this.changingHeadshot(this.allHeadshots[this.commentIndex]);
      this.reshuffleCommentsArray(this.commentIndex + 1);
    });

    this.nextButton.addEventListener("click", (e) => {
      if (this.commentIndex < 10) {
        this.commentIndex++;
      } else {
        this.commentIndex = 1;
      }

      this.exchangeComment(this.commentIndex);
      this.changingHeadshot(this.allHeadshots[this.commentIndex - 1]);
      this.reshuffleCommentsArray();
    });
  };
}

export { Slider };
