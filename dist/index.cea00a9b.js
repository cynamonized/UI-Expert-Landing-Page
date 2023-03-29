document.addEventListener("DOMContentLoaded", function() {
    const blurredImages = document.querySelectorAll(".about-us__blurred-image");
    const interval = setInterval(function() {
        blurredImages.forEach(function(element) {
            //   console.log(generateYPosJs());
            element.style.transition = "10s";
            element.style.top = generateYPosJs(200);
        });
    }, 4000);
    function generateYPosJs(spread) {
        const randomNumber = Math.random() * 100;
        let randomTop = Math.random() * spread;
        if (randomNumber < 50) {
            randomTop = 250 + randomNumber;
            return randomTop + "px";
        } else {
            randomTop = 450 + randomNumber;
            return randomTop + "px";
        }
    }
});

//# sourceMappingURL=index.cea00a9b.js.map
