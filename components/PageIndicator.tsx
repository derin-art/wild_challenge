import { motion, AnimatePresence } from "framer-motion";
interface PageIndicatorProps {
  selectedPage: number;
}

export default function PageIndicator(props: PageIndicatorProps) {
  return (
    <div className="flex items-center h-[8px] text-white gap-x-[24px] font-helv">
      <AnimatePresence key={props.selectedPage.toString()}>
        <motion.div className="text-[10px] tracking-[0.08em] gap-x-[4px] overflow-hidden flex items-center  ">
          {" "}
          <motion.div
            animate={{ y: "0%" }}
            initial={{ y: "100%" }}
            exit={{ y: "-100%" }}
            className="h-[16px] "
            transition={{ duration: 0.7 }}
          >
            {props.selectedPage + 1}
          </motion.div>{" "}
          OF 5
        </motion.div>
      </AnimatePresence>
      <div className=" flex gap-x-[8px]">
        {[0, 1, 2, 3, 4].map((item, index) => {
          return (
            <div
              className={`duration-300 h-[8px] w-[5px] rounded-[2px] border-[1px] overflow-hidden`}
              key={index}
            >
              <motion.div
                initial={{ y: "100%" }}
                transition={{ duration: 0.6 }}
                animate={
                  index === props.selectedPage ? { y: 0 } : { y: "100%" }
                }
                className={` h-full w-full bg-white `}
              ></motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
