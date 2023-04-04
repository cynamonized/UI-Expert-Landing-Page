document.addEventListener("DOMContentLoaded", function () {
  const blurredImages = document.querySelectorAll(".about-us__blurred-image");

  blurredImages.forEach(function (element) {
    element.style.transition = "8s";
    element.style.top = generateYPosJs(100);
  });

  const interval = setInterval(function () {
    blurredImages.forEach(function (element) {
      element.style.top = generateYPosJs(100);
    });
  }, 5000);

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

  // NAV
  const naviContainer = document.querySelector(".main-comment__navi");
  const prevButton = naviContainer.querySelector(".navi__button--prev");
  const nextButton = naviContainer.querySelector(".navi__button--next");

  prevButton.addEventListener("click", function (e) {
    console.log("This is a prev button");
    console.log(this.e);
  });

  nextButton.addEventListener("click", function () {
    console.log("This is a next button");
  });

  const allHeadshots = document.querySelectorAll(".headshot");
  // console.log(allHeadshots);
  allHeadshots.forEach(function (element) {
    element.addEventListener("click", function (e) {
      console.log(element);
      console.log(e);
      element.style.filter = "blur(0px)";
      element.style.transition = "1s";
    });
  });
});
