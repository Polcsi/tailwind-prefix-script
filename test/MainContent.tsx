// Import necessary modules and components from libraries
import { ReactNode, Children } from "react";
import { useMultiStepFormContext } from "./contexts/MultiStepFormContext";
import { AnimatePresence } from "framer-motion";

// Define type for the MainContentProps passed to the component
type MainContentProps = {
  children: ReactNode;
};

// MainContent is a functional component that represents a single step in a multi-step form
const MainContent = ({ children }: MainContentProps) => {
  // Retrieve the activeStepIndex from the MultiStepFormContext
  const { activeStepIndex } = useMultiStepFormContext();

  // Return the child element at the activeStepIndex
  return (
    <div className="relative h-full w-full">
      {/* AnimatePresence to handle step transitions */}
      <AnimatePresence initial={false} mode="wait">
        {/* Cloning children and passing onComplete function */}
        {Children.toArray(children)[activeStepIndex]}
      </AnimatePresence>
    </div>
  );
};

// Export the MainContent component to be used in other parts of the application
export default MainContent;
