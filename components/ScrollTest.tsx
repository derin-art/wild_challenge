import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

import { useState, useEffect, useLayoutEffect, useRef } from "react";

export default function ScrollTest() {
  const imageAssets = [
    {
      name: (
        <div>
          <div>Everyday</div>
          <div>Flowers</div>
        </div>
      ),
      url: "https://res.cloudinary.com/doaahozax/image/upload/v1713703980/Wild/image05_2x_ceicqy.jpg",
    },
    {
      name: (
        <div>
          <div>Everyday</div>
          <div>Flowers</div>
        </div>
      ),
      url: "https://res.cloudinary.com/doaahozax/image/upload/v1713703959/Wild/image04_2x_w9oprg.jpg",
    },
    {
      name: (
        <div>
          <div>Everyday</div>
          <div>Flowers</div>
        </div>
      ),
      url: "https://res.cloudinary.com/doaahozax/image/upload/v1713703948/Wild/image03_2x_jnx3x5.jpg",
    },
    {
      name: (
        <div>
          <div>Everyday</div>
          <div>Flowers</div>
        </div>
      ),
      url: "https://res.cloudinary.com/doaahozax/image/upload/v1713703935/Wild/image02_2x_fydjxo.jpg",
    },
    {
      name: (
        <div>
          <div>Everyday</div>
          <div>Flowers</div>
        </div>
      ),
      url: "https://res.cloudinary.com/doaahozax/image/upload/v1713703923/Wild/image01_2x_y0jykn.jpg",
    },
  ];

  const [inViewImages, setInViewImages] = useState({
    now: 1,
    prev: 5,
  });
  const [images, setImages] = useState([
    inViewImages.now,
    inViewImages.now + 1,
    inViewImages.now + 2,
  ]);
  const assets = [
    { number: 1, style: "top-[40px] right-[40px]" },
    { number: 2, style: " w-[500px] h-[600px]" },
    { number: 3, style: "bottom-[40px] left-[40px]" },
  ];
  const [scrollDir, setScrollDir] = useState({
    reg: "scrolling down",
    art: "scrolling down",
  });

  const [innerWidth, setInnerWidth] = useState(0);
  const cotainerRef: any = useRef();

  const updateViewPort = (galleryNumber: number) => {
    console.log(inViewImages, "no more living in fear");
    setInViewImages((prev) => {
      if (prev.now === 5 && galleryNumber === 1) {
        setScrollDir((previ) => {
          return { art: "scrolling down", reg: previ.reg };
        });
      }
      if (prev.now === 1 && galleryNumber === 5) {
        setScrollDir((previ) => {
          return { art: "scrolling up", reg: previ.reg };
        });
      }
      return { now: galleryNumber, prev: prev.now };
    });
  };

  useEffect(() => {
    setImages((prev) => [
      inViewImages.now + 1,
      inViewImages.now + 2,
      inViewImages.now + 3,
    ]);
  }, [inViewImages.now]);

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

      setScrollDir(
        scrollY / cotainerRef.current.scrollHeight < 0.3
          ? { art: "scrolling up", reg: "scrolling down" }
          : scrollY > lastScrollY
          ? { art: "scrolling down", reg: "scrolling down" }
          : { art: "scrolling up", reg: "scrolling up" }
      );

      setScrollDir((prev) => {
        if (scrollY / cotainerRef.current.scrollHeight > 8.5) {
          return { art: "scrolling down", reg: "scrolling up" };
        }
        return prev;
      });
      /*       setScrollDir((prev) => {
        if (scrollY / cotainerRef.current.scrollHeight < 0.3) {
          return { art: "scrolling up", reg: "scrolling down" };
        }
        if (scrollY / cotainerRef.current.scrollHeight > 8.7) {
          return { art: "scrolling down", reg: "scrolling up" };
        }
        if (scrollY > lastScrollY) {
          return { art: "scrolling down", reg: "scrolling down" };
        } else {
          return { art: "scrolling up", reg: "scrolling up" };
        }
      }); */
      console.log(
        "it makes no sense",
        scrollY,
        lastScrollY,
        scrollY / cotainerRef.current.scrollHeight
      );
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

    ScrollTrigger.create({
      start: 0.1,
      end: () => {
        return ScrollTrigger.maxScroll(window) - 1;
      },
      refreshPriority: -100, // always update last
      onLeave: (self) => {
        self.scroll(self.start + 1);
        /*    setInViewImages([1]); */

        ScrollTrigger.update();
      },
      onLeaveBack: (self) => {
        self.scroll(self.end - 1);
        /*    setInViewImages([4]); */
        ScrollTrigger.update();
      },
    });

    return () => ctx.revert();
  }, [innerWidth]);

  const exitBoolean = () => {
    console.log("good talk", inViewImages.now, inViewImages.prev, scrollDir);
    /*    if (scrollDir === "scrolling down") {
        return true;
      } */
    let final;
    if (inViewImages.now === 5 && inViewImages.prev === 4) {
      console.log("lets go");
      if (scrollDir.reg === "scrolling up") {
        return false;
      }
      return true;
    } else if (inViewImages.now === 1 && inViewImages.prev === 2) {
      if (scrollDir.reg === "scrolling up") {
        return true;
      }
      return false;
    } else if (scrollDir.reg === "scrolling up") {
      return false;
    } else if (scrollDir.reg === "scrolling down") {
      return true;
    }
  };

  return (
    <div ref={cotainerRef} className="flex w-fit containerr ">
      <div className="w-screen h-screen absolute z-30 flex items-center justify-center ">
        <div className="absolute top-[10px] right-[40px] text-black">
          {scrollDir.reg}
          {scrollDir.art}
        </div>
        <AnimatePresence>
          {images.map((item, index) => {
            return (
              <motion.div
                className={` w-[300px] h-[400px]   z-30 mx-auto ${assets[index].style} absolute overflow-hidden`}
                key={inViewImages.now + `${index}+2`}
              >
                <motion.img
                  src={imageAssets[inViewImages.now - 1].url}
                  key={inViewImages.now + `${index}`}
                  transition={{
                    duration: 0.4 * (index + 1),
                    delay: 0.2 * (index * 1),
                    ease: "easeInOut",
                  }}
                  initial={
                    scrollDir.art === "scrolling down"
                      ? { x: 100, y: -100 }
                      : { x: -100, y: 100 }
                  }
                  animate={{ x: 0, y: 0 }}
                  exit={
                    scrollDir.reg === "scrolling down"
                      ? {
                          x: "-100%",
                          y: "100%",

                          transition: {
                            duration: 0.3 * (index + 2),
                            delay: 0.2 * (index * 1),
                          },
                        }
                      : {
                          x: "100%",
                          y: "-100%",
                          transition: {
                            duration: 0.3 * (index + 2),
                            delay: 0.2 * (index * 1),
                          },
                        }
                  }
                  className={` w-[300px] h-[400px] opacity-[0.3]  z-30 mx-auto ${assets[index].style} absolute`}
                ></motion.img>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {imageAssets.map((item, index) => {
        return (
          <div
            key={index}
            className={`bg-blue-400 border box w-screen h-screen flex items-center justify-center`}
          >
            <motion.div
              key={index}
              onViewportEnter={() => {
                updateViewPort(index + 1);
              }}
              className="w-[10px] h-[400px] bg-red-500"
            ></motion.div>
          </div>
        );
      })}
    </div>
  );
}
