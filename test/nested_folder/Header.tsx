import { HiLightBulb, HiOutlineLightBulb } from "react-icons/hi";
import { motion } from "framer-motion";
import { useGlobalContext } from "./contexts";
import { useHintContext } from "./hints/contexts/HintContext";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  const { isLoading, hints } = useGlobalContext();
  const { toggleHints, setToggleHints, setOpenedHints } = useHintContext();

  return (
    <div className="SingleHeaderContainer grid gap-3">
      <div className="flex justify-between">
        {isLoading ? (
          <div role="status" className="w-full animate-pulse self-center">
            <div className="h-[33px] w-[260px] rounded-lg bg-gray-200 dark:bg-gray-700"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <h1 className="SingleHeaderText self-center text-2xl font-bold text-[#868686] group-hover:text-white">
            {title}
          </h1>
        )}

        {hints ? (
          isLoading ? (
            <div
              role="status"
              className="animate-pulse hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
            >
              <div className="h-[46px] w-[46px] rounded-full bg-gray-200 dark:bg-gray-700 focus:invalid:ring-pink-500"></div>
              <span className="sr-only top-0 md:-top-1">Loading...</span>
            </div>
          ) : (
            <motion.div
              onClick={() => {
                setToggleHints(!toggleHints);
                setOpenedHints(new Array(hints.length).fill(true));
              }}
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{ scale: 0.9 }}
              whileFocus={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
              data-testid="toggle-hints-button"
              className="MultiStepForm-HintButton rounded-full p-2 text-2xl text-main md:text-3xl -inset-1 -skew-y-3"
            >
              {!toggleHints ? (
                <HiLightBulb data-testid="show-hints-icon" />
              ) : (
                <HiOutlineLightBulb data-testid="hide-hints-icon" />
              )}
            </motion.div>
          )
        ) : null}
      </div>
      <hr className="SingleFormElementHorizontalRule h-[2px] bg-[#F3EAEA] after:content-['*'] after:ml-0.5 after:text-red-500" />
    </div>
  );
};

export default Header;
