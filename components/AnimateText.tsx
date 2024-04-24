import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface AnimateTextProps {
  activeImage: string;
  topText: React.ReactNode;
  bottomText: React.ReactNode;
}

export default function AnimateText(props: AnimateTextProps) {
  return (
    <motion.div className="relative">
      <motion.div className=" h-[176px] overflow-hidden">
        <motion.div
          key={props.activeImage + "top"}
          initial={{ y: "-120%" }}
          animate={{ y: "0%" }}
          exit={{ y: "120%", transition: { duration: 0.8 } }}
          transition={{ duration: 1, ease: [0.25, 1, 0.3, 1] }}
          className="h-[176px]"
        >
          {props.topText}
        </motion.div>
      </motion.div>

      <motion.div className="h-[176px] overflow-hidden">
        <motion.div
          key={props.activeImage + "bottom text"}
          initial={{ y: "-120%" }}
          animate={{ y: "0%" }}
          exit={{ y: "120%", transition: { duration: 0.5 } }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.3, 1] }}
          className="h-[176px]"
        >
          {props.bottomText}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
