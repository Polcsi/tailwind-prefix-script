import { useEffect } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
// Loading Animation
import loadingAnimation from "../../../assets/lotties/data-processing.json";
import { useMultiStepFormContext } from "..";

// Fade animation
const fadeInOut = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const StepLoader = () => {
  const { stepLoaderTextContent } = useMultiStepFormContext();

  function disableScroll(): void {
    document.body.style.overflow = "hidden";
  }

  function enableScroll(): void {
    document.body.style.overflow = "auto";
  }

  useEffect(() => {
    // Disable Scroll after mount
    disableScroll();

    return () => {
      // Enable scroll after unmount
      enableScroll();
    };
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInOut}
      exit={{ opacity: 0 }}
      data-testid="form-loader"
      className="fixed left-0 right-0 top-0 z-50 flex h-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50 dark:bg-opacity-80 md:inset-0 md:h-full"
    >
      <div className="StepLoader relative flex h-auto max-h-[300px] w-[95%] max-w-[300px] flex-col justify-center gap-5 self-center rounded-lg bg-white px-5 py-10 text-base font-normal text-gray-600 shadow dark:bg-gray-700">
        <Lottie
          className="w-[100%] max-w-[500px] self-center"
          animationData={loadingAnimation}
        />
        <span className="self-center">{stepLoaderTextContent}</span>
      </div>
    </motion.div>
  );
};

export default StepLoader;
