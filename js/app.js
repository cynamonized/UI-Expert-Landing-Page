import { commentObjectsArray } from "./comments";
import { Slider } from "./slider";
import { Picker } from "./services";

document.addEventListener("DOMContentLoaded", function () {
  //create new Slider here
  const aboutUsSlider = new Slider("#about-us", commentObjectsArray);

  // create new Picker for OurServices section
  const servicesPicker = new Picker(".services__blocks");
});
