document.addEventListener("DOMContentLoaded", function() {
    const blurredImages = document.querySelectorAll(".about-us__blurred-image");
    // Below will work smoothly if setInterval works every ${randomDelay *2}s;
    // Because of Transition == randomDelay && TransitionDelay == randomDelay;
    // So that way it doesn't cut animation in half
    function movingBluuredImages() {}
    blurredImages.forEach(function(element) {
        const randomDelay = Math.random() * 3;
        element.style.transition = `${randomDelay} cubic-bezier(0.62, 0.32, 0, 0.9)`;
        element.style.transitionDelay = `${randomDelay}s`;
        element.style.top = generateYPosJs(100);
        const interval = setInterval(function() {
            blurredImages.forEach(function(element) {
                element.style.top = generateYPosJs(100);
            });
        }, 6000);
    });
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
    // movingBluuredImages();
    /////////////////////////////////////////////////////////////////////
    // NAV
    const naviContainer = document.querySelector(".main-comment__navi");
    const prevButton = naviContainer.querySelector(".navi__button--prev");
    const nextButton = naviContainer.querySelector(".navi__button--next");
    prevButton.addEventListener("click", function(e) {
        console.log("This is a prev button");
        console.log(e);
    });
    nextButton.addEventListener("click", function() {
        console.log("This is a next button");
    });
    /////////////////////////////////////////////////////////////////////
    const allHeadshots = document.querySelectorAll(".headshot");
    // console.log(allHeadshots);
    allHeadshots.forEach(function(element, i) {
        element.addEventListener("click", function(e) {
            element.style.filter = "blur(0px)";
            element.style.transition = `1s cubic-bezier(0.79, 0.01, 0.29, 1.01)`;
            // const mainClassList = "main-comment__image, headshot";
            const allCommentsContainer = document.querySelector(".about-us__comment-avatars");
            const currentMainParent = allCommentsContainer.querySelector(".main-comment__image-container");
            const currentMain = currentMainParent.querySelector(".main-comment__image");
            currentMain.style.filter = "blur(8px)";
            currentMain.style.transition = "2s";
            currentMainParent.style.height = "433.99px";
            currentMain.classList.remove(`main-comment__image`);
            allCommentsContainer.insertBefore(currentMain, allHeadshots[i]);
            currentMain.classList.add(`about-us__blurred-image`, `headshot`, `blurred-image--${i + 1}`);
        });
    });
});

//# sourceMappingURL=index.cea00a9b.js.map
