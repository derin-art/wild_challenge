import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ScrollIndicatorMouse from "./ScrollIndicatorMouse";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import ImageArray from "./ImageArray";
import AnimateText from "./AnimateText";
import PageIndicator from "./PageIndicator";
import ArtistLink from "./ArtistLink";

interface GalleryProps {
  inViewImages: { now: number; prev: number };
  setInViewImages: React.Dispatch<
    React.SetStateAction<{ now: number; prev: number }>
  >;
}

gsap.registerPlugin(ScrollTrigger);

import { useState, useEffect, useLayoutEffect, useRef } from "react";

export default function Gallery(props: GalleryProps) {
  const [scrollDir, setScrollDir] = useState({
    regular: "scrolling down",
    modified: "scrolling down",
  });

  const [innerWidth, setInnerWidth] = useState(0);
  const cotainerRef: any = useRef();

  const displayedImages = [
    { number: 1, style: "top-[16px] right-[16px]" },
    { number: 2, style: " " },
    { number: 3, style: "bottom-[16px] left-[16px]" },
  ];

  const updateViewPort = (galleryNumber: number) => {
    props.setInViewImages((prev) => {
      return { now: galleryNumber, prev: prev.now };
    });
  };

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.scrollY;
    let ticking = false;

    /* updateScrollDir updates the scroll direction and determines the type of animation with which the images exit or enter the gallery based on the scroll direction */

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      /* The max scrollRatioComplete is 9. Determined from the gsap horizontal scroll animation which is set at 900% or 
      ;(9 * container height) to move 
      from the first to the last item in the gallery */

      const scrollRatioComplete = scrollY / cotainerRef.current.scrollHeight;

      /*A modified and regular state for the Scroll direction is necessary because the values of scrollY and lastScrollY
       during the exit and enter animation of the images after completing the scroll length of
       the gallery and returning to the beginning of the gallery are different   */

      let finalObject =
        scrollRatioComplete < 0.3
          ? { modified: "scrolling up", regular: "scrolling down" }
          : scrollY > lastScrollY
          ? { modified: "scrolling down", regular: "scrolling down" }
          : { modified: "scrolling up", regular: "scrolling up" };

      if (scrollRatioComplete > 8.5) {
        finalObject = { modified: "scrolling up", regular: "scrolling up" };
      }

      setScrollDir(finalObject);

      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    cotainerRef.current.addEventListener("resize", () => {});
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".box");

      let maxWidth = 0;

      const getMaxWidth = () => {
        maxWidth = 0;
        sections.forEach((section: any) => {
          maxWidth += section.offsetWidth;
        });
      };
      getMaxWidth();
      window.addEventListener("resize", () => {
        setInnerWidth(window.innerWidth);
      });
      ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

      gsap.to(".box", {
        x: () => -(maxWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: ".containerr",
          pin: true,

          scrub: true,

          end: "+=900%",

          invalidateOnRefresh: true,
        },
      });
    });

    /* Returns Scroll to the top on Scroll finish to simulate infinite Scroll */
    ScrollTrigger.create({
      start: 0.1,
      end: () => {
        return ScrollTrigger.maxScroll(window) - 1;
      },
      refreshPriority: -100,
      onLeave: (self) => {
        self.scroll(self.start + 1);

        ScrollTrigger.update();
      },
      onLeaveBack: (self) => {
        self.scroll(self.end - 1);

        ScrollTrigger.update();
      },
    });

    return () => ctx.revert();
  }, [innerWidth]);

  /* Selects the images to render from the Image Array */
  const renderCorrectImage = (imageIndex: number, pageNumber: number) => {
    if (imageIndex === 0) {
      return ImageArray[pageNumber].right;
    } else if (imageIndex === 1) {
      return ImageArray[pageNumber].center;
    }
    if (imageIndex === 2) {
      return ImageArray[pageNumber].left;
    }
  };

  return (
    <div
      ref={cotainerRef}
      className="flex w-fit containerr scrollbar-alt scrollbar cursor-none"
    >
      <div className="absolute left-[40px] top-[40px] z-50">
        <ScrollIndicatorMouse
          scrollHeight={
            typeof window === "undefined" ? 1000 : window.innerHeight
          }
        ></ScrollIndicatorMouse>
      </div>
      <div className="w-screen h-screen backdrop-blur-[40px] z-10"></div>
      {/* Background Blurry Image */}

      <AnimatePresence>
        {ImageArray.map((item, index) => {
          if (index === props.inViewImages.now) {
            return (
              <motion.div
                initial={{ scale: 2 }}
                animate={{ scale: 1 }}
                exit={{ scale: 2 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                key={props.inViewImages.now + `${index}+bg`}
                className="w-screen h-screen absolute z-0  overflow-hidden flex items-center justify-center "
              >
                <motion.img
                  className="w-full  "
                  src={item.center.src}
                ></motion.img>
              </motion.div>
            );
          }
        })}
      </AnimatePresence>

      {/* Outlined Image Title */}
      <div className="absolute flex items-center justify-center w-screen h-screen ">
        <div className="z-40 mb-[16px]">
          <AnimateText
            bottomText={
              <div className="h-[176px]  flex items-center justify-center ">
                {" "}
                <div className=" font-tung text-[220px] z-40 uppercase text-white outline_text tracking-[0.04em]">
                  {ImageArray[props.inViewImages.now].bottomText}
                </div>
              </div>
            }
            activeImage={props.inViewImages.now.toString()}
            topText={
              <div className="h-[176px] flex items-center justify-center  ">
                {" "}
                <div className=" font-tung text-[220px] z-20 uppercase outline_text tracking-[0.04em] ">
                  {ImageArray[props.inViewImages.now].topText}
                </div>
              </div>
            }
          ></AnimateText>
        </div>
      </div>

      {/* Displayed Images in the Gallery */}
      <div className="w-screen z-30  h-screen overflow-y-hidden scrollbar-alt scrollbar absolute z-30 flex items-center justify-center overflow-hidden">
        <AnimatePresence>
          {displayedImages.map((item, index) => {
            return (
              <motion.div
                className={` ${
                  index === 1 ? "w-[512px] h-[680px] " : "w-[248px] h-[330px] "
                }  z-30 mx-auto ${
                  item.style
                } absolute overflow-hidden rounded-[10px]  flex flex-col items-center justify-center`}
                key={props.inViewImages.now + `${index}+2`}
              >
                <div
                  className={`${
                    index != 1 && "hidden"
                  } absolute z-40 w-screen h-screen flex flex-col items-center justify-center`}
                >
                  <div className="">
                    <AnimateText
                      bottomText={
                        <div className="h-[176px]  flex items-center justify-center w-full ">
                          {" "}
                          <div className=" font-tung text-[220px] z-40 uppercase text-white  tracking-[0.04em]">
                            {ImageArray[props.inViewImages.now].bottomText}
                          </div>
                        </div>
                      }
                      activeImage={props.inViewImages.now.toString()}
                      topText={
                        <div className="h-[176px] flex items-center justify-center w-full ">
                          {" "}
                          <div className=" font-tung text-[220px] z-20 uppercase text-white tracking-[0.04em]  ">
                            {ImageArray[props.inViewImages.now].topText}
                          </div>
                        </div>
                      }
                    ></AnimateText>
                  </div>

                  {/* Page Indicator */}
                  <div className="mt-[8px]">
                    {" "}
                    <PageIndicator
                      selectedPage={props.inViewImages.now}
                    ></PageIndicator>
                  </div>
                </div>

                <motion.img
                  src={renderCorrectImage(index, props.inViewImages.now)?.src}
                  key={props.inViewImages.now + `${index}`}
                  transition={{
                    duration: 0.4 * (4 - 0.3 * index),

                    ease: [0.5, 1, 0.3, 1],
                  }}
                  initial={
                    scrollDir.modified === "scrolling down"
                      ? { x: 400, y: -400 }
                      : {
                          x: index === 1 ? -500 : -400,
                          y: index === 1 ? 500 : 400,
                        }
                  }
                  animate={{ x: 0, y: 0 }}
                  exit={
                    scrollDir.regular === "scrolling down"
                      ? {
                          x: "-120%",
                          y: "50%",

                          transition: {
                            duration: 0.42 * (1.5 + index),

                            ease: [0.5, 1, 0.3, 1],
                          },
                        }
                      : {
                          x: "120%",
                          y: "-50%",
                          transition: {
                            duration: 0.42 * (index + 1.5),

                            ease: [0.5, 1, 0.3, 1],
                          },
                        }
                  }
                  className={` w-fit z-30 mx-auto  absolute rounded-[10px] border border-black`}
                ></motion.img>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/*Scroll Markers to trigger animation */}
      {[0, 1, 2, 3, 4, 5].map((item, index) => {
        return (
          <div
            key={index}
            className={`  box w-screen hideScroll h-screen flex items-center justify-center`}
          >
            <motion.div
              key={index}
              onViewportEnter={() => {
                updateViewPort(index);
              }}
              className="w-[1px] h-[400px] bg-transparent"
            ></motion.div>
          </div>
        );
      })}
    </div>
  );
}
