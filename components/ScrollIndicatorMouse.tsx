import { useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import gsap from "gsap";

interface ScrollIndicatorMouseProps {
  scrollHeight: number;
}

export default function ScrollIndicatorMouse(props: ScrollIndicatorMouseProps) {
  const { scrollY } = useScroll();
  const cursorRef = useRef(null);
  const ctx1: any = useRef(null);
  const cursorSize = 30;
  const mouseMovehandler = (e: any) => {
    const { clientX, clientY } = e;
    ctx1.current.mouseMove(clientX - cursorSize / 2, clientY - cursorSize / 2);
  };

  useEffect(() => {
    ctx1.current = gsap.context((self) => {
      const xTo = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.6,
        ease: "power3",
      });
      const yTo = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.6,
        ease: "power3",
      });
      self.add("mouseMove", (x: any, y: any) => {
        xTo(x - 75);
        yTo(y - 75);
      });
      const scaleTween = gsap
        .to(cursorRef.current, {
          scale: 2,
          duration: 0.05,
          paused: true,
        })
        .reverse();
      self.add("grow", (value: any) => scaleTween.reversed(!value));
    });
    window.addEventListener("mousemove", mouseMovehandler);
    return () => {
      ctx1.current.revert();
      window.removeEventListener("mousemove", mouseMovehandler);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="flex items-center justify-center cursor z-50"
    >
      <div className="w-[4px] h-[4px] rounded-full bg-white absolute"></div>{" "}
      <svg
        id="progress"
        className="relative flex items-center justify-center"
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="21"
          pathLength="1"
          className="indicator fill-none absolute"
          initial={{ pathLength: 0 }}
          transition={{ duration: 0.3 }}
          animate={{ pathLength: scrollY.get() / props.scrollHeight / 9 }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="21"
          pathLength="1"
          className="stroke-white opacity-[0.1] fill-none absolute"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
      </svg>
    </div>
  );
}
