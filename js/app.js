import { commentObjectsArray } from "./comments";

document.addEventListener("DOMContentLoaded", function () {
  // declaring some global variables

  let commentIndex = 0; // It allows to track current comment for navi buttons

  //////////////////////////////////////////////////////////////////////
  // Adding headshots from "backend"
  // Just for fun, it could be a separate file
  /////////////////////////////////////////////////////////////////////

  function updateHeadshots() {}

  //////////////////////////////////////////////////////////////////////
  // Set intervals and moving algoritm
  /////////////////////////////////////////////////////////////////////

  // movingBlurredImages() will work smoothly if setInterval works every ${randomDelay *2}s;
  // Because of Transition == randomDelay && TransitionDelay == randomDelay;
  // So that way it doesn't cut animation in half

  let blurredImages = document.querySelectorAll(".about-us__blurred-image");

  blurredImages.forEach(randomPosInterval);

  function randomPosInterval(element) {
    const randomDelay = Math.random() * 3;
    element.style.transition = `${randomDelay} cubic-bezier(0.62, 0.32, 0, 0.9)`;
    element.style.transitionDelay = `${randomDelay}s`;
    element.style.top = generateYPosJs(100);

    const moveInterval = setInterval(function () {
      element.style.top = generateYPosJs(100);
    }, 6000);
  }

  function generateYPosJs(spread) {
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

  const commentContainer = document.querySelector(".about-us__main-comment");
  const commentRating = document.querySelector(".main-comment__rating");
  const commentText = commentContainer.querySelector(".main-comment__text");
  const commentName = commentContainer.querySelector(".main-comment__name");
  const commentPosition = commentContainer.querySelector(
    ".main-comment__position"
  );

  commentDOMObjects = [
    commentName,
    commentPosition,
    commentText,
    commentRating,
  ];

  function exchangeComment(commentNumber) {
    const commentAbstractArray = [
      commentObjectsArray[commentNumber].name,
      commentObjectsArray[commentNumber].jobTitle,
      commentObjectsArray[commentNumber].commentText,
      commentObjectsArray[commentNumber].rating,
    ];

    commentDOMObjects.forEach(function (element, i) {
      element.innerText = commentAbstractArray[i];
    });
  }

  exchangeComment(0);

  // commentRating.innerText = commentObjectsArray[0].rating;

  //////////////////////////////////////////////////////////////////////
  // Selecting DOM containers for all comments and main comment
  /////////////////////////////////////////////////////////////////////

  const allCommentsContainer = document.querySelector(
    ".about-us__comment-avatars"
  );
  const currentMainParent = allCommentsContainer.querySelector(
    ".main-comment__image-container"
  );

  //////////////////////////////////////////////////////////////////////
  // Enable clicking on headshots
  /////////////////////////////////////////////////////////////////////

  let allHeadshots;

  const getHeadshots = function () {
    allHeadshots = document.querySelectorAll(".headshot");
  };

  getHeadshots();

  allHeadshots.forEach(function (element, i) {
    // SOLVE ADDING IMAGES PATHS FROM AN ARRAY - SEEMS TO BE PARCEL ISSUE
    // element.src = `${commentObjectsArray[i].imagePath}`;
    // element.src = require(`${commentObjectsArray[i].imagePath}`);

    element.addEventListener("click", clickBluured);
  });

  // Below ads movement to first main comment when becomes blurred headshot

  const firstMain = document.querySelector(".main-comment__image");

  function firstMainMovement(firstMain) {
    randomPosInterval(firstMain);
  }

  let firstMainMoved = false;

  //////////////////////////////////////////////////////////////////////
  // Click function declaration -- MAIN CLICK EVENT
  /////////////////////////////////////////////////////////////////////

  function clickBluured(e) {
    if (firstMainMoved == false) {
      firstMainMovement(firstMain);
    }
    firstMainMoved = true;

    const blurredClasses = e.currentTarget.classList;
    let whichComment = blurredClasses[blurredClasses.length - 1].slice(-1);
    commentIndex = whichComment; // so navi knows which comment is main now

    // If user picks last comment, it needs to pick up last 2 characters (not 1)
    if (whichComment == 0) {
      whichComment = blurredClasses[blurredClasses.length - 1].slice(-2);
    }
    //

    //////////////////////////////////////////////////////////////////////
    // Switching comments and managing array with the comments
    /////////////////////////////////////////////////////////////////////

    // Change the comment --> ADD OTHER LABELS THAN JUST COMMENT!!!!
    // commentText.innerText = commentObjectsArray[whichComment].commentText;
    exchangeComment(whichComment);

    // Place new main comment in front of the array
    commentObjectsArray.unshift(commentObjectsArray[whichComment]);
    whichComment++;
    commentObjectsArray.splice(whichComment, 1);

    // Place old main comment in the PREVIOUS place of new main comment in the array
    commentObjectsArray.splice(whichComment, 0, commentObjectsArray[1]);
    commentObjectsArray.splice(1, 1);

    //////////////////////////////////////////////////////////////////////
    // Handling image/DOM object swap
    /////////////////////////////////////////////////////////////////////

    e.currentTarget.style.filter = "blur(0px)";

    const currentMain = currentMainParent.querySelector(".main-comment__image");

    currentMain.style.filter = "blur(8px)";

    currentMain.classList.remove(`main-comment__image`);
    allCommentsContainer.insertBefore(currentMain, e.currentTarget);

    //Finalizing exchange
    currentMainParent.appendChild(e.currentTarget);
    currentMain.classList = e.currentTarget.classList;
    e.currentTarget.classList = "";
    e.currentTarget.classList.add(`main-comment__image`);
    e.currentTarget.removeEventListener("click", clickBluured);
    currentMain.addEventListener("click", clickBluured);
  }

  //////////////////////////////////////////////////////////////////////
  // NAVI - Currently not working
  /////////////////////////////////////////////////////////////////////

  const naviContainer = document.querySelector(".main-comment__navi");
  const prevButton = naviContainer.querySelector(".navi__button--prev");
  const nextButton = naviContainer.querySelector(".navi__button--next");

  prevButton.addEventListener("click", function (e) {
    if (commentIndex > 0) {
      commentIndex--;
    } else {
      commentIndex = 10;
    }
    exchangeComment(commentIndex);
  });

  nextButton.addEventListener("click", function () {
    if (commentIndex < 10) {
      commentIndex++;
    } else {
      commentIndex = 0;
    }
    exchangeComment(commentIndex);
  });
});
