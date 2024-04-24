import { motion, AnimatePresence } from "framer-motion";
import ImageArray from "./ImageArray";

interface ArtistLinkProps {
  inViewImage: number;
}

export default function ArtistLink(props: ArtistLinkProps) {
  return (
    <AnimatePresence key={props.inViewImage.toString() + "Link"}>
      <div className=" w-[109px]  flex flex-col gap-y-[16px] text-white text-[10px]  uppercase font-helv cursor-none">
        <div className="text-left tracking-[0.08em] flex flex-wrap">
          Johanna Hobel{" "}
          <span className=" overflow-hidden flex gap-x-1">
            for{"  "}
            <motion.div
              animate={{ y: 0, x: 0 }}
              initial={{ y: "100%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className=" tracking-[0.08em] h-[12px] "
            >
              {ImageArray[props.inViewImage].client}
            </motion.div>
          </span>
        </div>
        <div className=" overflow-hidden ">
          {" "}
          <motion.div
            animate={{ y: 0, x: 0 }}
            initial={{ y: "100%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            className="text-right tracking-[0.08em] h-[12px] "
          >
            {ImageArray[props.inViewImage].date}
          </motion.div>
        </div>
        <button
          className="group text-[#202020] tracking-[0.08em] bg-white  w-full py-[8px] rounded-full font-helvBold text-center cursor-none uppercase hover:text-white duration-300 hover:bg-transparent
"
        >
          <div className="my-auto"> Have a Look</div>
        </button>
      </div>
    </AnimatePresence>
  );
}
