import React from "react";

const Home = () => {
  return (
    <main>
      <h1>ts-Home</h1>
      <section className="cl-h-[46px] cl-w-[46px] cl-rounded-full cl-bg-gray-200 dark:cl-bg-gray-700 focus:invalid:cl-ring-pink-500">
        <p className="cl-h-[2px] cl-bg-[#F3EAEA] after:cl-content-['*'] after:cl-ml-0.5 after:cl-text-red-500">
          Home page content
        </p>
        <button
          type="button"
          className="cl-rounded-full cl-p-2 cl-text-2xl cl-text-main md:cl-text-3xl -cl-inset-1 -cl-skew-y-3"
        >
          Button
        </button>
      </section>
    </main>
  );
};

export default Home;





















