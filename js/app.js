document.addEventListener("DOMContentLoaded", function () {
  //////////////////////////////////////////////////////////////////////
  // Set intervals and moving algoritm
  /////////////////////////////////////////////////////////////////////

  // movingBlurredImages() will work smoothly if setInterval works every ${randomDelay *2}s;
  // Because of Transition == randomDelay && TransitionDelay == randomDelay;
  // So that way it doesn't cut animation in half

  function movingBlurredImages() {
    // Dirty way (!!) - TBH not even working now
    // How to get inside the stack of moveIntervals ?????
    // They were declared inside a function but when this function ends,
    // there might not be the way to get back there
    for (i = 0; i < 40; i++) {
      window.clearInterval(i);
      console.log("działa for");
    }

    const blurredImages = document.querySelectorAll(".about-us__blurred-image");

    blurredImages.forEach(function (element) {
      const randomDelay = Math.random() * 3;
      element.style.transition = `${randomDelay} cubic-bezier(0.62, 0.32, 0, 0.9)`;
      element.style.transitionDelay = `${randomDelay}s`;
      element.style.top = generateYPosJs(100);

      const moveInterval = setInterval(function () {
        element.style.top = generateYPosJs(100);
        console.log("odpalam interval");
      }, 6000);
    });
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

  movingBlurredImages();

  //////////////////////////////////////////////////////////////////////
  // NAVI - Currently not working
  /////////////////////////////////////////////////////////////////////

  const naviContainer = document.querySelector(".main-comment__navi");
  const prevButton = naviContainer.querySelector(".navi__button--prev");
  const nextButton = naviContainer.querySelector(".navi__button--next");

  prevButton.addEventListener("click", function (e) {
    console.log("This is a prev button");
  });

  nextButton.addEventListener("click", function () {
    console.log("This is a next button");
  });

  //////////////////////////////////////////////////////////////////////
  // Enable clicking on headshots
  /////////////////////////////////////////////////////////////////////

  let allHeadshots;

  const getHeadshots = function () {
    allHeadshots = document.querySelectorAll(".headshot");
  };

  getHeadshots();

  allHeadshots.forEach(function (element, i) {
    element.addEventListener("click", clickBluured);
  });

  //////////////////////////////////////////////////////////////////////
  // Click function declaration
  /////////////////////////////////////////////////////////////////////

  function clickBluured(e) {
    getHeadshots();
    e.currentTarget.style.filter = "blur(0px)";
    // e.currentTarget.style.transition = `1s cubic-bezier(0.79, 0.01, 0.29, 1.01)`;
    // const mainClassList = "main-comment__image, headshot";

    const allCommentsContainer = document.querySelector(
      ".about-us__comment-avatars"
    );
    const currentMainParent = allCommentsContainer.querySelector(
      ".main-comment__image-container"
    );
    const currentMain = currentMainParent.querySelector(".main-comment__image");

    currentMain.style.filter = "blur(8px)";
    currentMainParent.style.height = "433.99px";

    currentMain.classList.remove(`main-comment__image`);
    allCommentsContainer.insertBefore(currentMain, e.currentTarget);

    //////////////////////////
    currentMainParent.appendChild(e.currentTarget);
    currentMain.classList = e.currentTarget.classList;
    e.currentTarget.classList = "";
    e.currentTarget.classList.add(`main-comment__image`);

    e.currentTarget.removeEventListener("click", clickBluured);
    movingBlurredImages();
  }
});
