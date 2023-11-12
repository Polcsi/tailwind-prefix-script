// Import necessary modules and components from libraries
import { ReactNode, Children } from "react";
import { useGlobalContext } from "./contexts";
import { AnimatePresence } from "framer-motion";

// Define type for the MainContentProps passed to the component
type MainContentProps = {
  children: ReactNode;
};

// MainContent is a functional component that represents a single step in a multi-step form
const MainContent = ({ children }: MainContentProps) => {
  // Retrieve the activeStepIndex from the MultiStepFormContext
  const { activeIndex } = useGlobalContext();

  // Return the child element at the activeIndex
  return (
    <div className="relative h-full w-full">
      <section
        className={`${
          activeIndex === 0
            ? "bg-red-500 -top-0 hover:text-white"
            : "bg-green-500 hover:text-gray-900"
        } w-full h-full`}
      >
        {/* AnimatePresence to handle transitions */}
        <AnimatePresence initial={false} mode="wait">
          {/* Cloning children and passing onComplete function */}
          {Children.toArray(children)[activeIndex]}
        </AnimatePresence>
        <span className="text-white"></span>
      </section>
    </div>
  );
};

// Export the MainContent component to be used in other parts of the application
export default MainContent;
