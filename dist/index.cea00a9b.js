document.addEventListener("DOMContentLoaded", function() {
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
        const moveInterval = setInterval(function() {
            element.style.top = generateYPosJs(100);
            console.log("odpalam interval");
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
    // NAVI - Currently not working
    /////////////////////////////////////////////////////////////////////
    const naviContainer = document.querySelector(".main-comment__navi");
    const prevButton = naviContainer.querySelector(".navi__button--prev");
    const nextButton = naviContainer.querySelector(".navi__button--next");
    prevButton.addEventListener("click", function(e) {
        console.log("This is a prev button");
    });
    nextButton.addEventListener("click", function() {
        console.log("This is a next button");
    });
    //////////////////////////////////////////////////////////////////////
    // Enable clicking on headshots
    /////////////////////////////////////////////////////////////////////
    let allHeadshots;
    const getHeadshots = function() {
        allHeadshots = document.querySelectorAll(".headshot");
    };
    getHeadshots();
    allHeadshots.forEach(function(element, i) {
        element.addEventListener("click", clickBluured);
    });
    // Below ads movement to first main comment when becomes blurred headshot
    const firstMain = document.querySelector(".main-comment__image");
    function firstMainMovement(firstMain) {
        randomPosInterval(firstMain);
    }
    let firstMainMoved = false;
    // console.log(firstMain);
    // firstMain.addEventListener("click", firstMainMovement);
    //////////////////////////////////////////////////////////////////////
    // Click function declaration
    /////////////////////////////////////////////////////////////////////
    function clickBluured(e) {
        if (firstMainMoved == false) firstMainMovement(firstMain);
        firstMainMoved = true;
        getHeadshots();
        e.currentTarget.style.filter = "blur(0px)";
        const allCommentsContainer = document.querySelector(".about-us__comment-avatars");
        const currentMainParent = allCommentsContainer.querySelector(".main-comment__image-container");
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
        // ???????????????????????????
        // It doesn't remove at all --> Is there a way to remove even...?
        e.currentTarget.removeEventListener("click", clickBluured);
    }
});

//# sourceMappingURL=index.cea00a9b.js.map
