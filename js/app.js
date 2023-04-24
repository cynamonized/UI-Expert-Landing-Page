import { commentObjectsArray } from "./comments";

document.addEventListener("DOMContentLoaded", function () {
  // declaring some global variables
  let commentIndex = 0; // It allows to track current comment for navi buttons
  let firstMainMoved = false;
  //////////////////////////////////////////////////////////////////////
  // Adding headshots from "backend"
  // Just for fun, it could be a separate file
  /////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////
  // Set intervals and moving algoritm
  /////////////////////////////////////////////////////////////////////

  // movingBlurredImages() will work smoothly if setInterval works every ${randomDelay *2}s;
  // Because of Transition == randomDelay && TransitionDelay == randomDelay;
  // So that way it doesn't cut animation in half

  let blurredImages = document.querySelectorAll(".about-us__blurred-image"); // implemented

  blurredImages.forEach(randomPosInterval); // implemented

  function randomPosInterval(element) {
    // implemented
    const randomDelay = Math.random() * 3;
    element.style.transition = `${randomDelay} cubic-bezier(0.62, 0.32, 0, 0.9)`;
    element.style.transitionDelay = `${randomDelay}s`;
    element.style.top = generateYPosJs(100);

    const moveInterval = setInterval(function () {
      element.style.top = generateYPosJs(100);
    }, 6000);
  }

  function generateYPosJs(spread) {
    // implemented
    const randomNumber = Math.random() * 100;
    let randomTop = Math.random() * spread;

    if (randomNumber < 50) {
      randomTop = 0 + randomNumber;
      return randomTop + "px";
    } else {
      randomTop = 100 + randomNumber;
      return randomTop + "px";
    }
  }

  //////////////////////////////////////////////////////////////////////
  // Selecting Comments elements and applying 1st main comment
  /////////////////////////////////////////////////////////////////////
  // implemented
  const commentContainer = document.querySelector(".about-us__main-comment");
  const commentRating = document.querySelector(".main-comment__rating");
  const commentName = commentContainer.querySelector(".main-comment__name");
  const commentPosition = commentContainer.querySelector(
    ".main-comment__position"
  );
  const commentText = commentContainer.querySelector(".main-comment__text");

  commentDOMObjects = [
    // implemented
    commentName,
    commentPosition,
    commentText,
    commentRating,
  ];

  function exchangeComment(commentNumber) {
    // implemented
    const commentAbstractArray = [
      commentObjectsArray[commentNumber].name,
      commentObjectsArray[commentNumber].jobTitle,
      commentObjectsArray[commentNumber].commentText,
      commentObjectsArray[commentNumber].rating,
    ];

    commentDOMObjects.forEach(function (element, i) {
      // implemented
      element.innerText = commentAbstractArray[i];
    });
  }

  exchangeComment(0); // implemented

  //////////////////////////////////////////////////////////////////////
  // Selecting DOM containers for all comments and main comment
  /////////////////////////////////////////////////////////////////////

  const allCommentsContainer = document.querySelector(
    ".about-us__comment-avatars" // implemented
  );
  const currentMainParent = allCommentsContainer.querySelector(
    ".main-comment__image-container" // implemented
  );

  //////////////////////////////////////////////////////////////////////
  // Enable clicking on headshots
  /////////////////////////////////////////////////////////////////////
  let allHeadshots; // implemented
  const getHeadshots = function () {
    allHeadshots = document.querySelectorAll(".headshot");
  }; // implemented

  getHeadshots(); // implemented

  allHeadshots.forEach(function (element, i) {
    // implemented
    // SOLVE ADDING IMAGES PATHS FROM AN ARRAY - SEEMS TO BE PARCEL ISSUE
    // element.src = `${commentObjectsArray[i].imagePath}`;
    // element.src = require(`${commentObjectsArray[i].imagePath}`);
    element.addEventListener("click", clickBluured);
  });

  // Below ads movement to first main comment when becomes blurred headshot
  const firstMain = document.querySelector(".main-comment__image"); // implemented
  function firstMainMovement(firstMain) {
    // implemented
    randomPosInterval(firstMain);
  }

  //////////////////////////////////////////////////////////////////////
  // CLICK function declaration -- MAIN CLICK EVENT
  /////////////////////////////////////////////////////////////////////

  function clickBluured(e) {
    // implemented
    // if this is first move, apply movement to the first main
    if (firstMainMoved == false) {
      firstMainMovement(firstMain);
    }
    firstMainMoved = true;

    // picking up which comment was chosen - based on his class
    const blurredClasses = e.currentTarget.classList;
    let whichComment = Number(
      blurredClasses[blurredClasses.length - 1].slice(-1)
    );
    commentIndex = whichComment - 1; // so navi knows which comment is main now

    if (whichComment == 0) {
      whichComment = blurredClasses[blurredClasses.length - 1].slice(-2);
    }

    // apply the comment change
    exchangeComment(whichComment);
    reshuffleCommentsArray(whichComment);
    changingHeadshot(e.currentTarget);
  }

  //////////////////////////////////////////////////////////////////////
  // NAVI
  /////////////////////////////////////////////////////////////////////

  const naviContainer = document.querySelector(".main-comment__navi"); // implemented
  const prevButton = naviContainer.querySelector(".navi__button--prev"); // implemented
  const nextButton = naviContainer.querySelector(".navi__button--next"); // implemented

  prevButton.addEventListener("click", function (e) {
    // implemented
    if (commentIndex >= 1) {
      commentIndex--;
    } else {
      commentIndex = 9;
    }

    exchangeComment(commentIndex + 1);
    changingHeadshot(allHeadshots[commentIndex]);
    reshuffleCommentsArray(commentIndex + 1);
  });

  nextButton.addEventListener("click", function (e) {
    // implemented
    // currenMovementIsNavi = true;
    if (commentIndex < 10) {
      commentIndex++;
    } else {
      commentIndex = 1;
    }

    exchangeComment(commentIndex);
    changingHeadshot(allHeadshots[commentIndex - 1]);
    reshuffleCommentsArray();
  });

  function reshuffleCommentsArray(inputIndex = commentIndex) {
    // implemented
    // Place new main comment in front of the array
    commentObjectsArray.unshift(commentObjectsArray[inputIndex]);
    inputIndex++;
    commentObjectsArray.splice(inputIndex, 1);

    // Place old main comment in the PREVIOUS place of new main comment in the array
    commentObjectsArray.splice(inputIndex, 0, commentObjectsArray[1]);
    commentObjectsArray.splice(1, 1);
  }

  function changingHeadshot(chosenHeadshot) {
    // implemented
    chosenHeadshot.style.filter = "blur(0px)";
    const currentMain = currentMainParent.querySelector(".main-comment__image");
    currentMain.style.filter = "blur(8px)";
    currentMain.classList.remove(`main-comment__image`);
    allCommentsContainer.insertBefore(currentMain, chosenHeadshot);

    currentMainParent.appendChild(chosenHeadshot);
    currentMain.classList = chosenHeadshot.classList;
    chosenHeadshot.classList = "";
    chosenHeadshot.classList.add(`main-comment__image`);
    chosenHeadshot.removeEventListener("click", clickBluured);
    currentMain.addEventListener("click", clickBluured);
    getHeadshots();
  }
});
