import ImageOneMain from "../public/images/image01@2x.jpg";
import ImageOne from "../public/images/image01.jpg";

import ImageTwoMain from "../public/images/image02@2x.jpg";
import ImageTwo from "../public/images/image02.jpg";

import ImageThreeMain from "../public/images/image03@2x.jpg";
import ImageThree from "../public/images/image03.jpg";

import ImageFourMain from "../public/images/image04@2x.jpg";
import ImageFour from "../public/images/image04.jpg";

import ImageFiveMain from "../public/images/image05@2x.jpg";
import ImageFive from "../public/images/image05.jpg";

export default [
  { left: ImageFive, center: ImageOneMain, right: ImageTwo },
  { left: ImageOne, center: ImageTwoMain, right: ImageThree },
  { left: ImageTwo, center: ImageThreeMain, right: ImageFour },
  { left: ImageThree, center: ImageFourMain, right: ImageFive },
  { left: ImageFour, center: ImageFiveMain, right: ImageOne },
];
