import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import ImageArray from "./ImageArray";
import AnimateText from "./AnimateText";

gsap.registerPlugin(ScrollTrigger);

import { useState, useEffect, useLayoutEffect, useRef } from "react";

export default function ScrollTest() {
  const [inViewImages, setInViewImages] = useState({
    now: 1,
    prev: 5,
  });

  const [scrollDir, setScrollDir] = useState({
    reg: "scrolling down",
    art: "scrolling down",
  });

  const [innerWidth, setInnerWidth] = useState(0);

  const imageStyling = [
    { number: 1, style: "top-[16px] right-[32px]" },
    { number: 2, style: " " },
    { number: 3, style: "bottom-[16px] left-[16px]" },
  ];

  const cotainerRef: any = useRef();

  const updateViewPort = (galleryNumber: number) => {
    setInViewImages((prev) => {
      /*      if (prev.now === 5 && galleryNumber === 1) {
        setScrollDir((previ) => {
          return { art: "scrolling down", reg: previ.reg };
        });
      }
      if (prev.now === 1 && galleryNumber === 5) {
        setScrollDir((previ) => {
          return { art: "scrolling up", reg: previ.reg };
        });
      } */
      return { now: galleryNumber, prev: prev.now };
    });
  };

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      let finalObject =
        scrollY / cotainerRef.current.scrollHeight < 0.3
          ? { art: "scrolling up", reg: "scrolling down" }
          : scrollY > lastScrollY
          ? { art: "scrolling down", reg: "scrolling down" }
          : { art: "scrolling up", reg: "scrolling up" };

      if (scrollY / cotainerRef.current.scrollHeight > 8.5) {
        finalObject = { art: "scrolling up", reg: "scrolling up" };
      }
      setScrollDir(finalObject);

      /*     setScrollDir((prev) => {
        if (scrollY / cotainerRef.current.scrollHeight > 8.5) {
          console.log("Yess Mann");
          return { art: "scrolling up", reg: "scrolling up" };
        }

        return prev;
      });
 */
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
          markers: true,
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
      className="flex w-fit containerr scrollbar-alt scrollbar"
    >
      <div className="w-screen h-screen backdrop-blur-[40px] z-10"></div>
      {/* Background Blurry Image */}
      <AnimatePresence>
        {ImageArray.map((item, index) => {
          if (index === inViewImages.now) {
            return (
              <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
                key={inViewImages.now + `${index}+bg`}
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
        <div className="z-40">
          <AnimateText
            bottomText={
              <div className="h-[176px]  flex items-center justify-center ">
                {" "}
                <div className=" font-tung text-[220px] z-40 uppercase text-white outline_text tracking-[0.04em]">
                  {ImageArray[inViewImages.now].bottomText}
                </div>
              </div>
            }
            activeImage={inViewImages.now.toString()}
            topText={
              <div className="h-[176px] flex items-center justify-center  ">
                {" "}
                <div className=" font-tung text-[220px] z-20 uppercase outline_text tracking-[0.04em] ">
                  {ImageArray[inViewImages.now].topText}
                </div>
              </div>
            }
          ></AnimateText>
        </div>
      </div>

      {/* Displayed Images in the Gallery */}
      <div className="w-screen z-30  h-screen overflow-y-hidden scrollbar-alt scrollbar absolute z-30 flex items-center justify-center overflow-hidden">
        <div className="absolute top-[10px] right-[40px] text-red-500 z-50">
          {inViewImages.now}
          {scrollDir.reg}
          {scrollDir.art}
        </div>
        <AnimatePresence>
          {imageStyling.map((item, index) => {
            return (
              <motion.div
                className={` ${
                  index === 1 ? "w-[512px] h-[680px] " : "w-[248px] h-[330px] "
                }  z-30 mx-auto ${
                  item.style
                } absolute overflow-hidden rounded-[10px]  flex items-center justify-center`}
                key={inViewImages.now + `${index}+2`}
              >
                <div
                  className={`${
                    index != 1 && "hidden"
                  } absolute z-40 w-screen h-screen flex items-center justify-center`}
                >
                  <AnimateText
                    bottomText={
                      <div className="h-[176px]  flex items-center justify-center w-full ">
                        {" "}
                        <div className=" font-tung text-[220px] z-40 uppercase text-white  tracking-[0.04em]">
                          {ImageArray[inViewImages.now].bottomText}
                        </div>
                      </div>
                    }
                    activeImage={inViewImages.now.toString()}
                    topText={
                      <div className="h-[176px] flex items-center justify-center w-full ">
                        {" "}
                        <div className=" font-tung text-[220px] z-20 uppercase text-white tracking-[0.04em]  ">
                          {ImageArray[inViewImages.now].topText}
                        </div>
                      </div>
                    }
                  ></AnimateText>
                </div>
                <motion.img
                  src={renderCorrectImage(index, inViewImages.now)?.src}
                  key={inViewImages.now + `${index}`}
                  transition={{
                    duration: 0.2 * (4 - index),

                    ease: [0.345, 0.045, 0.355, 1],
                  }}
                  initial={
                    scrollDir.art === "scrolling down"
                      ? { x: 400, y: -400 }
                      : { x: -400, y: 400 }
                  }
                  animate={{ x: 0, y: 0 }}
                  exit={
                    scrollDir.reg === "scrolling down"
                      ? {
                          x: "-100%",
                          y: "50%",

                          transition: {
                            duration: 0.2 * (2 + index),

                            ease: [0.345, 0.045, 0.355, 1],
                          },
                        }
                      : {
                          x: "100%",
                          y: "-50%",
                          transition: {
                            duration: 0.2 * (index + 2),

                            ease: [0.345, 0.045, 0.355, 1],
                          },
                        }
                  }
                  className={` w-fit z-30 mx-auto  absolute `}
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
              className="w-[10px] h-[400px] bg-red-500"
            ></motion.div>
          </div>
        );
      })}
    </div>
  );
}
