import { commentObjectsArray } from "./comments";
import { Slider } from "./slider";

document.addEventListener("DOMContentLoaded", function () {
  //create new Slider here
  const aboutUsSlider = new Slider("#about-us", commentObjectsArray);
});
